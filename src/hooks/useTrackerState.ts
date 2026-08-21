import { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import type { DomainId, UserProgressData, TrackedCertState } from '../types';
import { DOMAINS_DATA } from '../data/certsData';
import { 
  computeDomainCertStates, 
  getDomainProgressStats, 
  getOverallProgressStats,
  getNextRecommendedAvailableCert
} from '../services/prerequisiteEngine';
import { getStoredApiKey, setStoredApiKey } from '../services/aiService';

const STORAGE_KEY = 'ms_learning_path_tracker_state_v1';

export function useTrackerState() {
  const [activeDomainId, setActiveDomainId] = useState<DomainId>('cloud');
  const [completedCerts, setCompletedCerts] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: UserProgressData = JSON.parse(saved);
        return parsed.completedCerts || {};
      }
    } catch (e) {
      console.error('Failed to load saved tracker state', e);
    }
    return {};
  });

  const [apiKey, setApiKey] = useState<string>(() => getStoredApiKey());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('ms_tracker_theme') === 'dark' || 
      (!localStorage.getItem('ms_tracker_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ms_tracker_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ms_tracker_theme', 'light');
    }
  }, [darkMode]);

  // Persist completed certs to localStorage
  useEffect(() => {
    try {
      const payload: UserProgressData = {
        completedCerts,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to persist tracker state', e);
    }
  }, [completedCerts]);

  const activeDomain = useMemo(() => DOMAINS_DATA[activeDomainId], [activeDomainId]);

  // Current domain tracked certs with computed states (completed, available, locked)
  const currentDomainCerts: TrackedCertState[] = useMemo(() => {
    return computeDomainCertStates(activeDomainId, completedCerts);
  }, [activeDomainId, completedCerts]);

  // Filtered certs based on search and level filter
  const filteredCerts = useMemo(() => {
    return currentDomainCerts.filter((cert) => {
      const matchesSearch = 
        cert.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLevel = levelFilter === 'all' || cert.level.toLowerCase() === levelFilter.toLowerCase();

      return matchesSearch && matchesLevel;
    });
  }, [currentDomainCerts, searchQuery, levelFilter]);

  // Domain progress stats
  const domainStats = useMemo(() => {
    return getDomainProgressStats(activeDomainId, completedCerts);
  }, [activeDomainId, completedCerts]);

  // Global multi-domain stats
  const overallStats = useMemo(() => {
    return getOverallProgressStats(completedCerts);
  }, [completedCerts]);

  // Current active candidate cert for AI explanation
  const currentAvailableCert = useMemo(() => {
    return getNextRecommendedAvailableCert(activeDomainId, completedCerts);
  }, [activeDomainId, completedCerts]);

  const toggleCertCompletion = useCallback((certId: string) => {
    setCompletedCerts((prev) => {
      const isCurrentlyCompleted = !!prev[certId];
      const next = { ...prev };

      if (isCurrentlyCompleted) {
        // Unmark
        delete next[certId];
      } else {
        // Mark completed
        next[certId] = true;

        // Check if all certs in this domain are now completed -> Trigger celebration
        const domain = DOMAINS_DATA[activeDomainId];
        const allCompletedNow = domain.certIds.every((id) => id === certId || !!next[id]);
        if (allCompletedNow) {
          try {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#0078D4', '#107C41', '#FFB900', '#5C2D91', '#00B7C3'],
            });
          } catch {
            // Ignore if confetti fails in headless env
          }
        }
      }

      return next;
    });
  }, [activeDomainId]);

  const resetDomainProgress = useCallback((domainId: DomainId) => {
    const domain = DOMAINS_DATA[domainId];
    if (!domain) return;
    setCompletedCerts((prev) => {
      const next = { ...prev };
      domain.certIds.forEach((id) => {
        delete next[id];
      });
      return next;
    });
  }, []);

  const markAllInDomain = useCallback((domainId: DomainId) => {
    const domain = DOMAINS_DATA[domainId];
    if (!domain) return;
    setCompletedCerts((prev) => {
      const next = { ...prev };
      domain.certIds.forEach((id) => {
        next[id] = true;
      });
      return next;
    });
  }, []);

  const resetAllProgress = useCallback(() => {
    setCompletedCerts({});
  }, []);

  const updateApiKey = useCallback((newKey: string) => {
    setApiKey(newKey);
    setStoredApiKey(newKey);
  }, []);

  return {
    activeDomainId,
    setActiveDomainId,
    activeDomain,
    completedCerts,
    currentDomainCerts,
    filteredCerts,
    domainStats,
    overallStats,
    currentAvailableCert,
    searchQuery,
    setSearchQuery,
    levelFilter,
    setLevelFilter,
    darkMode,
    setDarkMode,
    apiKey,
    updateApiKey,
    toggleCertCompletion,
    resetDomainProgress,
    markAllInDomain,
    resetAllProgress,
  };
}
