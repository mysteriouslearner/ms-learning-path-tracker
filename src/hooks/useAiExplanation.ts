import { useState, useEffect, useRef, useCallback } from 'react';
import type { Certification, DomainInfo, AiExplanationResult } from '../types';
import { fetchAiExplanation } from '../services/aiService';

export function useAiExplanation(
  targetCert: Certification | null,
  completedCertIds: string[],
  domain: DomainInfo,
  apiKey?: string
) {
  const [explanationResult, setExplanationResult] = useState<AiExplanationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Cache to prevent duplicate queries for same cert + completed certs combination
  const cacheRef = useRef<Map<string, AiExplanationResult>>(new Map());

  const getCacheKey = useCallback(
    (certId: string, completed: string[]) => {
      return `${domain.id}:${certId}:${[...completed].sort().join(',')}:${apiKey ? 'custom' : 'default'}`;
    },
    [domain.id, apiKey]
  );

  const fetchExplanation = useCallback(
    async (forceRefresh = false) => {
      if (!targetCert) {
        setExplanationResult(null);
        setIsLoading(false);
        return;
      }

      const cacheKey = getCacheKey(targetCert.id, completedCertIds);
      if (!forceRefresh && cacheRef.current.has(cacheKey)) {
        setExplanationResult(cacheRef.current.get(cacheKey)!);
        return;
      }

      setIsLoading(true);
      try {
        const result = await fetchAiExplanation(targetCert, completedCertIds, domain, apiKey);
        cacheRef.current.set(cacheKey, result);
        setExplanationResult(result);
      } catch (err) {
        console.error('Error in useAiExplanation hook', err);
      } finally {
        setIsLoading(false);
      }
    },
    [targetCert, completedCertIds, domain, apiKey, getCacheKey]
  );

  // Automatically trigger when targetCert or completed certs changes
  useEffect(() => {
    fetchExplanation();
  }, [fetchExplanation]);

  return {
    explanationResult,
    isLoading,
    refreshExplanation: () => fetchExplanation(true),
  };
}
