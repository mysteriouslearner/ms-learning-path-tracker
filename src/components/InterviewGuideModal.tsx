import React from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  Code2, 
  ShieldCheck, 
  Lightbulb
} from 'lucide-react';

interface InterviewGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InterviewGuideModal: React.FC<InterviewGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                Stage 2 Submission & Interview Walkthrough Guide
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Key architecture decisions, algorithms, and talking points for your recruitment interview
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          
          {/* Section 1: Core Architecture */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <Code2 className="w-4 h-4 text-blue-500" />
              <span>1. Technical Architecture & Stack</span>
            </div>
            <p className="leading-relaxed">
              This application was built using <strong>React 18 + TypeScript + Vite + Tailwind CSS</strong> with strict type safety, zero external UI component bloat, and modular services.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <div className="font-semibold text-slate-900 dark:text-white mb-1">State & Prerequisite Engine</div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Runs pure, deterministic DAG evaluation in <code className="font-mono text-blue-600 dark:text-blue-400">prerequisiteEngine.ts</code> to calculate <span className="font-semibold text-emerald-600">Completed</span>, <span className="font-semibold text-blue-600">Available</span>, and <span className="font-semibold text-slate-500">Locked</span> states.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <div className="font-semibold text-slate-900 dark:text-white mb-1">AI Mentor Integration</div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct Google Gemini API client with strict separation of concerns (code chooses next step, AI explains why) + 8s timeout with instant fallback.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Requirement Highlights */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>2. How Brief Requirements Were Met</span>
            </div>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Domain Picker:</strong> 6 distinct Microsoft domains (Cloud, AI/Data, Security, Power Platform, Modern Work, DevOps) with multi-domain tracking.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Visual Prerequisite States:</strong> Real-time dependency evaluation where foundational certs unlock associate certs, which in turn unlock expert certs.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Strict Prerequisite Engine Rule:</strong> The LLM is <em>never</em> tasked with calculating prerequisites to eliminate hallucinations and race conditions. Code does 100% of the graph traversal.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Resilience & Fallback:</strong> Visual skeleton loading indicator + smart deterministic fallback engine ensures the app <em>never</em> crashes or displays a blank screen.
                </div>
              </li>
            </ul>
          </div>

          {/* Section 3: Interview Q&A Cheatsheet */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>3. Top Interview Questions & Model Answers</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="font-semibold text-amber-900 dark:text-amber-200 mb-1">
                  Q: Why shouldn't the AI decide which certification comes next?
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>A:</strong> LLMs are probabilistic models prone to hallucinations and may suggest incorrect or non-existent prerequisite sequences. Determining prerequisites is a deterministic graph dependency problem (DAG) best solved in code. The AI's strength lies in natural language explanation, so we delegate the reasoning/encouragement to the AI while keeping business rules deterministic.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                  Q: How did you handle network latency and API failure for the AI feature?
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>A:</strong> We implemented an <code className="font-mono">AbortController</code> with an 8-second timeout, a caching layer in <code className="font-mono">useAiExplanation.ts</code> to prevent redundant API calls, and a built-in domain-aware fallback generator in <code className="font-mono">aiService.ts</code>. If the request fails, times out, or has no key, the user instantly receives a high-quality explanation with no UI interruption.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <p className="font-semibold text-purple-900 dark:text-purple-200 mb-1">
                  Q: How is state persisted?
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>A:</strong> User progress is stored in <code className="font-mono">localStorage</code> under <code className="font-mono">ms_learning_path_tracker_state_v1</code>. When the user reloads or switches domains, the state is hydrated seamlessly.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-all shadow-md shadow-purple-500/20"
          >
            Got it, ready for interview!
          </button>
        </div>

      </div>
    </div>
  );
};
