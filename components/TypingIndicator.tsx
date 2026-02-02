import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-5 animate-fadeIn mb-8">
      <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white text-purple-600 border border-slate-100 flex items-center justify-center shadow-sm">
        <Bot className="w-5 h-5 animate-pulse" />
      </div>
      <div className="bg-white rounded-[1.75rem] rounded-tl-none border border-slate-100 px-6 py-4 shadow-sm flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-purple-500/80 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-1.5 h-1.5 bg-purple-500/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-1.5 h-1.5 bg-purple-500/80 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Analyzing profile...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;