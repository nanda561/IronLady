import React from 'react';
import { ChevronRight, Target, Sparkles, BookOpen, UserCheck, Building } from 'lucide-react';

interface QuickRepliesProps {
  onSelect: (text: string) => void;
}

const QUICK_REPLY_OPTIONS = [
  { text: "View Programs", icon: <BookOpen className="w-4 h-4" /> },
  { text: "Career Promotion", icon: <Target className="w-4 h-4" /> },
  { text: "Get Recommendation", icon: <Sparkles className="w-4 h-4" /> },
  { text: "1 Crore+ Club", icon: <CrownIcon /> },
  { text: "Success Stories", icon: <UserCheck className="w-4 h-4" /> },
  { text: "Corporate/HR", icon: <Building className="w-4 h-4" /> }
];

function CrownIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
    </svg>
  );
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ onSelect }) => {
  return (
    <div className="px-6 md:px-12 py-6">
      <div className="flex items-center gap-3 mb-5 overflow-hidden">
        <div className="h-px bg-slate-200 w-8"></div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] whitespace-nowrap">Suggested Explorations</p>
        <div className="h-px bg-slate-200 flex-1"></div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide no-scrollbar -mx-6 px-6 md:-mx-0 md:px-0">
        {QUICK_REPLY_OPTIONS.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option.text)}
            className="flex-shrink-0 inline-flex items-center gap-3 px-5 py-3 text-[11px] font-bold bg-white text-slate-600 rounded-2xl border border-slate-100 hover:border-purple-300 hover:text-purple-700 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 group hover:-translate-y-1"
          >
            <span className="text-slate-400 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-300">{option.icon}</span>
            {option.text}
            <ChevronRight className="w-3.5 h-3.5 text-slate-200 group-hover:text-purple-300 group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickReplies;