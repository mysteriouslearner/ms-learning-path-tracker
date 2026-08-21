import React from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Clock, 
  BookOpen, 
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import type { TrackedCertState } from '../types';
import { CERTIFICATIONS_DATA } from '../data/certsData';

interface CertCardProps {
  cert: TrackedCertState;
  index: number;
  onToggleComplete: (certId: string) => void;
  onSelectPrereq?: (prereqId: string) => void;
}

export const CertCard: React.FC<CertCardProps> = ({
  cert,
  index,
  onToggleComplete,
  onSelectPrereq,
}) => {
  const isCompleted = cert.status === 'completed';
  const isAvailable = cert.status === 'available';
  const isLocked = cert.status === 'locked';

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Fundamentals':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      case 'Associate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Expert':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'Specialty':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div
      className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 border ${
        isCompleted
          ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 shadow-sm'
          : isAvailable
          ? 'bg-white dark:bg-slate-900 border-blue-500/80 dark:border-blue-500 shadow-md ring-2 ring-blue-500/20 glow-available'
          : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/80 opacity-85'
      }`}
    >
      
      {/* Header: Sequence Number, Level, Status Badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Step Sequence Badge */}
          <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>

          {/* Level Badge */}
          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getLevelColor(
              cert.level
            )}`}
          >
            {cert.level}
          </span>

          {/* Practice Test Availability */}
          {cert.isFreeExamPractice && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hidden sm:inline-block">
              Free Practice Assessment
            </span>
          )}
        </div>

        {/* Visual State Status Badge */}
        <div>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Completed
            </span>
          )}
          {isAvailable && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-2.5 py-1 rounded-full border border-blue-300 dark:border-blue-700 animate-pulse">
              <Unlock className="w-3.5 h-3.5" />
              Available Now
            </span>
          )}
          {isLocked && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-200/70 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-300/80 dark:border-slate-700">
              <Lock className="w-3.5 h-3.5" />
              Locked
            </span>
          )}
        </div>
      </div>

      {/* Main Info: Code & Title */}
      <div className="mb-3">
        <div className="flex items-line gap-2 flex-wrap">
          <span className="font-mono text-lg font-extrabold text-blue-600 dark:text-blue-400">
            {cert.code}
          </span>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
            {cert.name}
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
          {cert.tagline}
        </p>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
        {cert.description}
      </p>

      {/* Skills Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
          Key Skills & Topics Covered:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {cert.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Prerequisite Requirements (if any) */}
      {cert.prerequisites.length > 0 && (
        <div className="mb-4 p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
          <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            {isLocked ? (
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            )}
            <span>Prerequisites:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {cert.prerequisites.map((prereqId) => {
              const prereqCert = CERTIFICATIONS_DATA[prereqId];
              const isPrereqDone = !cert.missingPrerequisites.includes(prereqId);

              return (
                <button
                  key={prereqId}
                  onClick={() => onSelectPrereq && onSelectPrereq(prereqId)}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono font-medium text-[11px] transition-colors border ${
                    isPrereqDone
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                      : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 hover:bg-amber-200'
                  }`}
                  title={prereqCert ? `${prereqCert.name}` : prereqId}
                >
                  {isPrereqDone ? <CheckCircle2 className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                  <span>{prereqId}</span>
                  <span className="font-sans text-[10px] opacity-75">
                    ({isPrereqDone ? 'Done' : 'Required'})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Meta Info: Free Modules & Estimated Time */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800 pt-3 mb-4">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-blue-500" />
          <span>{cert.freeModulesCount} Free Learn Modules</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>~{cert.estimatedHours} Hours</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        
        {/* Outbound Link to Microsoft Learn */}
        <a
          href={cert.learnUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 group/link"
        >
          <span>Free MS Learn Path</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-blue-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </a>

        {/* Primary Action Button (Mark Complete / Completed / Locked) */}
        {isCompleted ? (
          <button
            onClick={() => onToggleComplete(cert.id)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-red-600 text-white transition-all shadow-sm group/btn"
          >
            <CheckCircle2 className="w-4 h-4 group-hover/btn:hidden" />
            <span className="group-hover/btn:hidden">Completed ✓</span>
            <span className="hidden group-hover/btn:inline">Mark Incomplete ✕</span>
          </button>
        ) : isAvailable ? (
          <button
            onClick={() => onToggleComplete(cert.id)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark as Completed</span>
          </button>
        ) : (
          <button
            disabled
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-300/40 dark:border-slate-700/40"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Locked (Prereqs Needed)</span>
          </button>
        )}
      </div>

    </div>
  );
};
