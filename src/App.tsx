import { useState } from 'react';
import { useTrackerState } from './hooks/useTrackerState';
import { useAiExplanation } from './hooks/useAiExplanation';
import { Navbar } from './components/Navbar';
import { DomainPicker } from './components/DomainPicker';
import { StatsOverview } from './components/StatsOverview';
import { AiExplanationBox } from './components/AiExplanationBox';
import { RoadmapView } from './components/RoadmapView';
import { SettingsModal } from './components/SettingsModal';
import { InterviewGuideModal } from './components/InterviewGuideModal';
import { CERTIFICATIONS_DATA } from './data/certsData';
import { 
  ExternalLink, 
  HelpCircle, 
  RotateCcw 
} from 'lucide-react';

export function App() {
  const {
    activeDomainId,
    setActiveDomainId,
    activeDomain,
    completedCerts,
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
  } = useTrackerState();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInterviewGuideOpen, setIsInterviewGuideOpen] = useState(false);

  // Selected completed cert IDs in current domain
  const completedInCurrentDomain = activeDomain.certIds.filter((id) => !!completedCerts[id]);

  // AI Explanation Hook
  const {
    explanationResult,
    isLoading: isAiLoading,
    refreshExplanation,
  } = useAiExplanation(
    currentAvailableCert,
    completedInCurrentDomain,
    activeDomain,
    apiKey
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenInterviewGuide={() => setIsInterviewGuideOpen(true)}
        onResetAll={resetAllProgress}
        onMarkAllDomain={() => markAllInDomain(activeDomainId)}
        overallPercentage={overallStats.overallPercentage}
        completedCertsCount={overallStats.completedCertsCount}
        totalCerts={overallStats.totalCerts}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Domain Picker Section */}
        <DomainPicker
          activeDomainId={activeDomainId}
          onSelectDomain={setActiveDomainId}
          completedCerts={completedCerts}
        />

        {/* Stats, Filters & Search Overview */}
        <StatsOverview
          domain={activeDomain}
          stats={domainStats}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          levelFilter={levelFilter}
          setLevelFilter={setLevelFilter}
        />

        {/* AI Next Step Guidance Box */}
        <AiExplanationBox
          currentAvailableCert={currentAvailableCert}
          domain={activeDomain}
          explanationResult={explanationResult}
          isLoading={isAiLoading}
          onRefresh={refreshExplanation}
          isDomainCompleted={domainStats.isFullyCompleted}
        />

        {/* Visual Roadmap & Cert Cards Path View */}
        <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60 dark:border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Certification Roadmap & Prerequisites
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Complete available certifications in prerequisite order to unlock advanced certifications.
              </p>
            </div>

            <button
              onClick={() => resetDomainProgress(activeDomainId)}
              className="text-xs font-semibold text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
              title="Reset progress for this domain"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Track</span>
            </button>
          </div>

          <RoadmapView
            certs={filteredCerts}
            domain={activeDomain}
            onToggleComplete={toggleCertCompletion}
            onSelectPrereq={(prereqId) => {
              const prereqCert = CERTIFICATIONS_DATA[prereqId];
              if (prereqCert && prereqCert.domainId !== activeDomainId) {
                setActiveDomainId(prereqCert.domainId);
              }
            }}
          />
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 py-6 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              M
            </div>
            <span>
              <strong>Microsoft Learning Path Tracker</strong> — Stage 2 MIC Recruitment Project
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsInterviewGuideOpen(true)}
              className="hover:text-purple-600 dark:hover:text-purple-400 font-semibold flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Interview Guide</span>
            </button>
            <a
              href="https://learn.microsoft.com/en-us/credentials/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 font-semibold"
            >
              <span>Microsoft Learn Credentials</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={updateApiKey}
      />

      <InterviewGuideModal
        isOpen={isInterviewGuideOpen}
        onClose={() => setIsInterviewGuideOpen(false)}
      />

    </div>
  );
}

export default App;
