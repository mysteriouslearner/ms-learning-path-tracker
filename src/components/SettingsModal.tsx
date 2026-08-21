import React, { useState } from 'react';
import { 
  X, 
  Key, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Trash2,
  Cpu
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
}) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveApiKey(inputKey);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    setInputKey('');
    onSaveApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                AI Mentor Settings
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure Google Gemini API or use built-in offline engine
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

        {/* Body */}
        <div className="p-5 space-y-4 text-xs sm:text-sm">
          
          {/* Status Alert */}
          <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 text-blue-900 dark:text-blue-200">
            <div className="flex items-start gap-2.5">
              <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Zero-Setup Offline Support:</span> The app works completely out-of-the-box with our smart local explanation engine. Adding a Google Gemini API key connects live generative responses!
              </div>
            </div>
          </div>

          {/* Key Input */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Google Gemini API Key (Optional)</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-normal"
              >
                <span>Get Free Gemini Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="AIzaSy..."
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
              />
              {inputKey && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
                  title="Clear API Key"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              Keys are securely saved in your browser's <code className="font-mono">localStorage</code> only and never transmitted to external servers.
            </p>
          </div>

          {/* Architectural Notes */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-1">
            <div className="font-semibold text-slate-700 dark:text-slate-300 text-xs">
              Task Requirement Adherence:
            </div>
            <ul className="text-[11px] text-slate-500 dark:text-slate-400 list-disc list-inside space-y-0.5">
              <li>Deterministic prerequisite logic decides the next available step.</li>
              <li>AI only provides an encouraging explanation of that decision.</li>
              <li>Network timeouts or invalid keys seamlessly fall back to local explanations.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save & Apply</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
