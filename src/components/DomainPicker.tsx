import React from 'react';
import { 
  Cloud, 
  BrainCircuit, 
  ShieldCheck, 
  Zap, 
  Laptop, 
  GitBranch, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';
import type { DomainId } from '../types';
import { DOMAINS_DATA } from '../data/certsData';
import { getDomainProgressStats } from '../services/prerequisiteEngine';

interface DomainPickerProps {
  activeDomainId: DomainId;
  onSelectDomain: (domainId: DomainId) => void;
  completedCerts: Record<string, boolean>;
}

export const DomainPicker: React.FC<DomainPickerProps> = ({
  activeDomainId,
  onSelectDomain,
  completedCerts,
}) => {
  const domains = Object.values(DOMAINS_DATA);

  const getDomainIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Cloud':
        return <Cloud className={className} />;
      case 'BrainCircuit':
        return <BrainCircuit className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Laptop':
        return <Laptop className={className} />;
      case 'GitBranch':
        return <GitBranch className={className} />;
      default:
        return <Cloud className={className} />;
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Select Your Learning Domain
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Choose your target career track to visualize certification prerequisites and track progress.
          </p>
        </div>
      </div>

      {/* Grid of Domain Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map((domain) => {
          const isSelected = domain.id === activeDomainId;
          const stats = getDomainProgressStats(domain.id, completedCerts);

          return (
            <button
              key={domain.id}
              onClick={() => onSelectDomain(domain.id)}
              className={`text-left relative p-5 rounded-2xl transition-all duration-200 group border flex flex-col justify-between ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-blue-500 dark:border-blue-500 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/20'
                  : 'bg-white/70 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              {/* Top Row: Icon & Status Badge */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${domain.gradient} flex items-center justify-center text-white shadow-md shadow-black/5 group-hover:scale-105 transition-transform`}
                  >
                    {getDomainIcon(domain.icon, 'w-5 h-5')}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {stats.isFullyCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    ) : (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          isSelected
                            ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {stats.completed}/{stats.total} Certs ({stats.percentage}%)
                      </span>
                    )}
                  </div>
                </div>

                {/* Domain Title & Tagline */}
                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                  <span>{domain.name}</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? 'text-blue-500 translate-x-1'
                        : 'text-slate-400 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {domain.tagline}
                </p>
              </div>

              {/* Bottom: Progress Bar & Target Role */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      stats.isFullyCompleted
                        ? 'bg-emerald-500'
                        : isSelected
                        ? 'bg-blue-600'
                        : 'bg-slate-400 dark:bg-slate-600'
                    }`}
                    style={{ width: `${stats.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                  <span className="truncate max-w-[170px]">🎯 {domain.targetRoles[0]}</span>
                  <span>{stats.completedHours}/{stats.totalEstimatedHours} hrs</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
