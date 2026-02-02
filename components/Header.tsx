import React from 'react';
import { Crown, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#1a0b2e] border-b border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-950/50 via-[#2d1b4e] to-indigo-950/50 opacity-90"></div>
      {/* Decorative light ray */}
      <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-purple-500/10 to-transparent skew-x-12 blur-3xl pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 to-yellow-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white/5 p-2.5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-inner">
              <Crown className="w-7 h-7 text-amber-300" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              IRON LADY
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </h1>
            <p className="text-[10px] text-purple-300 font-bold uppercase tracking-[0.3em]">Executive Navigator</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-purple-200/60 uppercase tracking-widest">Global Network</span>
            <span className="text-sm font-semibold text-white/90">78,000+ Leaders</span>
          </div>
          <div className="h-8 w-px bg-white/10"></div>
          <div className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <div className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-xs font-bold text-white/80 tracking-wide uppercase">AI Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;