import React from 'react';
import { Calendar, MapPin, Tag, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Program } from '../types';

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <div className="group relative bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(45,27,78,0.08)] hover:shadow-[0_30px_60px_rgba(45,27,78,0.12)] transition-all duration-500 hover:-translate-y-1">
      <div className="bg-[#1a0b2e] p-7 relative overflow-hidden">
        {/* Animated background element */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-700"></div>
        <Sparkles className="absolute right-4 top-4 w-12 h-12 text-amber-400/10" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/90 text-[#1a0b2e] text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.2 rounded-full mb-4 shadow-lg shadow-amber-400/20">
            Selected for You
          </div>
          <h3 className="text-white font-extrabold text-2xl leading-tight tracking-tight group-hover:text-amber-100 transition-colors">{program.name}</h3>
          <p className="text-purple-300 text-[11px] font-bold mt-2 uppercase tracking-widest opacity-80">{program.type}</p>
        </div>
      </div>
      
      <div className="p-8 space-y-7">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 tracking-wide">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-purple-600/70" />
            {program.duration}
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-purple-600/70" />
            {program.format}
          </div>
        </div>

        <div className="p-5 bg-gradient-to-r from-slate-50 to-white border border-slate-100 rounded-3xl flex items-center gap-4 group/investment transition-all hover:border-amber-200/50">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover/investment:bg-amber-100 transition-colors">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Investment</p>
            <p className="text-lg font-extrabold text-[#2d1b4e]">{program.price}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px bg-slate-100 flex-1"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Key Outcomes</p>
            <div className="h-px bg-slate-100 flex-1"></div>
          </div>
          <ul className="space-y-3.5">
            {program.outcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-4 text-[14px] text-slate-600 font-medium leading-snug">
                <div className="mt-1 w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        <button className="w-full relative group/btn overflow-hidden py-4 px-6 bg-[#2d1b4e] text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-[#3d226a] active:scale-[0.98] shadow-xl shadow-purple-900/10">
          <span className="relative z-10 text-xs uppercase tracking-[0.2em]">{program.cta}</span>
          <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover/btn:translate-x-2" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;