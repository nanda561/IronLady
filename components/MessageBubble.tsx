import React from 'react';
import { User, Bot } from 'lucide-react';
import { Message } from '../types';
import ProgramCard from './ProgramCard';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const formatContent = (content: string) => {
    const parts = content.split(/(₹[0-9,kL+.-]+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('₹')) {
        return (
          <span key={i} className={`font-bold ${isUser ? 'text-amber-200' : 'text-purple-700'}`}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className={`flex items-start gap-5 ${isUser ? 'flex-row-reverse' : 'flex-row'} animate-fadeIn w-full`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 hover:rotate-6 ${
        isUser 
          ? 'bg-[#2d1b4e] text-amber-200 border border-purple-400/20' 
          : 'bg-white text-purple-700 border border-slate-200 shadow-slate-200/30'
      }`}>
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>
      
      <div className={`flex flex-col gap-3 max-w-[85%] sm:max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-6 py-4 shadow-sm transition-all duration-300 ${
          isUser 
            ? 'bg-gradient-to-br from-[#3d226a] to-[#251341] text-slate-50 rounded-[1.75rem] rounded-tr-none border border-white/5' 
            : 'bg-white text-slate-700 rounded-[1.75rem] rounded-tl-none border border-slate-100/80 shadow-slate-200/20'
        }`}>
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed font-medium">
            {formatContent(message.content)}
          </p>
        </div>
        
        {message.isProgramCard && message.programData && (
          <div className="w-full max-w-sm mt-3">
            <ProgramCard program={message.programData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;