import React from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Unlock 
} from 'lucide-react';
import type { TrackedCertState, DomainInfo } from '../types';
import { CertCard } from './CertCard';

interface RoadmapViewProps {
  certs: TrackedCertState[];
  domain: DomainInfo;
  onToggleComplete: (certId: string) => void;
  onSelectPrereq?: (prereqId: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  certs,
  onToggleComplete,
  onSelectPrereq,
}) => {
  if (certs.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400">No certifications match your filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      
      {/* Timeline Node Flow */}
      <div className="space-y-6 sm:space-y-8 relative">
        {certs.map((cert, index) => {
          const isCompleted = cert.status === 'completed';
          const isAvailable = cert.status === 'available';
          const isLast = index === certs.length - 1;

          return (
            <div key={cert.id} className="relative flex flex-col md:flex-row gap-4 sm:gap-6 items-start">
              
              {/* Left Column: Visual Roadmap Node Indicator & Vertical Connector */}
              <div className="hidden md:flex flex-col items-center shrink-0 w-16 pt-6">
                
                {/* Visual Node */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-md ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-emerald-500/25 ring-4 ring-emerald-500/20'
                      : isAvailable
                      ? 'bg-blue-600 text-white shadow-blue-500/30 ring-4 ring-blue-500/30 animate-pulse-slow'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 ring-2 ring-slate-300 dark:ring-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : isAvailable ? (
                    <Unlock className="w-6 h-6" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </div>

                {/* Step Level Label */}
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-wider text-center">
                  Step {index + 1}
                </span>

                {/* Vertical Connector Line */}
                {!isLast && (
                  <div className="w-0.5 h-32 sm:h-36 my-2 bg-slate-200 dark:bg-slate-800 relative">
                    <div
                      className={`w-full transition-all duration-500 ${
                        isCompleted ? 'bg-emerald-500 h-full' : 'bg-transparent h-0'
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* Right Column: Full Interactive Card */}
              <div className="flex-1 w-full">
                <CertCard
                  cert={cert}
                  index={index}
                  onToggleComplete={onToggleComplete}
                  onSelectPrereq={onSelectPrereq}
                />
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
