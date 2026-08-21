import React from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Sun, 
  Moon, 
  RotateCcw, 
  CheckCheck,
  Compass
} from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenSettings: () => void;
  onOpenInterviewGuide: () => void;
  onResetAll: () => void;
  onMarkAllDomain: () => void;
  overallPercentage: number;
  completedCertsCount: number;
  totalCerts: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onOpenSettings,
  onOpenInterviewGuide,
  onResetAll,
  onMarkAllDomain,
  overallPercentage,
  completedCertsCount,
  totalCerts,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight">
                PathFinder
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
                Microsoft Learn
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              AI-Powered Certification & Prerequisite Roadmap Tracker
            </p>
          </div>
        </div>

        {/* Global Stats Mini-Bar */}
        <div className="hidden md:flex items-center gap-3 bg-slate-100 dark:bg-slate-800/60 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700/60">
          <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
            Overall: <span className="font-bold text-blue-600 dark:text-blue-400">{completedCertsCount}/{totalCerts}</span> ({overallPercentage}%)
          </div>
          <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Quick Actions (Demo Tools) */}
          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={onMarkAllDomain}
              title="Quick Demo: Mark current domain complete"
              className="p-2 text-xs font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
            >
              <CheckCheck className="w-4 h-4 text-emerald-500" />
              <span>Complete Path</span>
            </button>
            <button
              onClick={onResetAll}
              title="Reset all progress"
              className="p-2 text-xs font-medium text-slate-600 hover:text-red-600 dark:text-slate-300 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Interview & Architecture Guide */}
          <button
            onClick={onOpenInterviewGuide}
            className="px-3 py-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
          >
            <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">Interview Architecture Guide</span>
            <span className="sm:hidden">Guide</span>
          </button>

          {/* AI Settings Modal Trigger */}
          <button
            onClick={onOpenSettings}
            title="Configure Gemini AI API Key"
            className="p-2 text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
          >
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
        </div>

      </div>
    </header>
  );
};
