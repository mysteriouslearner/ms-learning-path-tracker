import React from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Bot, 
  CheckCircle2
} from 'lucide-react';
import type { Certification, DomainInfo, AiExplanationResult } from '../types';

interface AiExplanationBoxProps {
  currentAvailableCert: Certification | null;
  domain: DomainInfo;
  explanationResult: AiExplanationResult | null;
  isLoading: boolean;
  onRefresh: () => void;
  isDomainCompleted: boolean;
}

export const AiExplanationBox: React.FC<AiExplanationBoxProps> = ({
  currentAvailableCert,
  domain,
  explanationResult,
  isLoading,
  onRefresh,
  isDomainCompleted,
}) => {
  if (isDomainCompleted) {
    return (
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 dark:border-emerald-500/20 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Milestone Achieved 🎉
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Domain Mastered: {domain.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              Congratulations! You have completed all prerequisite levels and certifications in the{' '}
              <strong className="text-emerald-600 dark:text-emerald-400">{domain.name}</strong> learning track.
              You are now fully prepared for roles such as{' '}
              <strong>{domain.targetRoles.join(', ')}</strong>!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentAvailableCert) {
    return null;
  }

  return (
    <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-purple-900/10 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-purple-950/40 border border-blue-200/80 dark:border-blue-900/50 p-5 sm:p-6 backdrop-blur-sm transition-all shadow-sm">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-200/50 dark:border-blue-800/40 pb-4 mb-4">
        
        {/* Header Title & Target Step */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                AI Next Step Guidance
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 font-medium">
                Prerequisite-Decided
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 flex-wrap">
              <span>Next Recommended Step:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-slate-700 shadow-xs font-mono text-sm font-semibold">
                {currentAvailableCert.code}
              </span>
              <span className="text-sm font-normal text-slate-600 dark:text-slate-300">
                — {currentAvailableCert.name}
              </span>
            </h3>
          </div>
        </div>

        {/* Source Badge & Refresh Trigger */}
        <div className="flex items-center gap-2 self-start md:self-center">
          {explanationResult && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                explanationResult.source === 'gemini-api'
                  ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                  : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              {explanationResult.source === 'gemini-api' ? 'Gemini 1.5 Flash' : 'Smart Offline Engine'}
            </span>
          )}

          <button
            onClick={onRefresh}
            disabled={isLoading}
            title="Refresh AI explanation"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-white/80 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-500' : ''}`} />
          </button>
        </div>

      </div>

      {/* Body: AI Generated Explanation or Loading skeleton */}
      <div className="min-h-[52px] flex items-center">
        {isLoading ? (
          <div className="w-full space-y-2 py-1">
            <div className="flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Analyzing your completed certifications and career prerequisites...</span>
            </div>
            <div className="h-3.5 bg-blue-200/60 dark:bg-slate-700/60 rounded-md w-11/12 animate-pulse" />
            <div className="h-3.5 bg-blue-200/40 dark:bg-slate-700/40 rounded-md w-3/4 animate-pulse" />
          </div>
        ) : (
          <div className="relative pl-3.5 border-l-2 border-amber-400 dark:border-amber-500">
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-medium italic leading-relaxed">
              "{explanationResult?.explanation || currentAvailableCert.defaultAiExplanation}"
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-1.5 not-italic font-normal">
              💡 <em>Why this cert?</em> Our prerequisite engine validated that all prior requirements are satisfied. The AI contextualizes why this unlocks your next career phase.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
