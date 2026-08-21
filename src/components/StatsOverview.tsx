import React from 'react';
import { 
  CheckCircle2, 
  Unlock, 
  Lock, 
  Clock, 
  Search
} from 'lucide-react';
import type { DomainInfo } from '../types';

interface StatsOverviewProps {
  domain: DomainInfo;
  stats: {
    total: number;
    completed: number;
    available: number;
    locked: number;
    percentage: number;
    totalEstimatedHours: number;
    completedHours: number;
  };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  levelFilter: string;
  setLevelFilter: (level: string) => void;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  domain,
  stats,
  searchQuery,
  setSearchQuery,
  levelFilter,
  setLevelFilter,
}) => {
  const levels = ['all', 'Fundamentals', 'Associate', 'Expert'];

  return (
    <div className="mb-8 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Active Learning Track
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {domain.targetRoles.join(' • ')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            {domain.name}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
            {domain.description}
          </p>
        </div>

        {/* Big Progress Circle / Metric */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/60 self-start md:self-center shrink-0">
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              {stats.percentage}%
            </div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Path Completed
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center relative">
            <div
              className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent transition-all duration-500"
              style={{ transform: `rotate(${(stats.percentage / 100) * 360}deg)` }}
            />
            <CheckCircle2 className={`w-5 h-5 ${stats.percentage === 100 ? 'text-emerald-500' : 'text-blue-500'}`} />
          </div>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        
        {/* Completed */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {stats.completed} <span className="text-xs font-normal text-slate-400">/ {stats.total}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Completed</div>
          </div>
        </div>

        {/* Available */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Unlock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {stats.available}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Available (Current)</div>
          </div>
        </div>

        {/* Locked */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {stats.locked}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Locked (Prereqs)</div>
          </div>
        </div>

        {/* Estimated Hours */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {stats.completedHours}h <span className="text-xs font-normal text-slate-400">/ {stats.totalEstimatedHours}h</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Hours Finished</div>
          </div>
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search cert code (e.g. AZ-900), skill (e.g. Python, SQL, KQL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-medium text-slate-400 hidden sm:inline mr-1">
            Level:
          </span>
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors capitalize shrink-0 ${
                levelFilter === lvl
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lvl === 'all' ? 'All Levels' : lvl}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
};
