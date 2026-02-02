import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Trash2, ArrowDownCircle, Sparkles } from 'lucide-react';
import MessageBubble from './MessageBubble';
import QuickReplies from './QuickReplies';
import TypingIndicator from './TypingIndicator';
import { Message, ChatHistoryItem } from '../types';
import { getGeminiResponse } from '../services/geminiService';
import { PROGRAMS } from '../constants';

const STORAGE_KEY = 'iron-lady-chat-history';

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Welcome to your career transformation journey. ✨\n\nI'm the Iron Lady Career Navigator. We've helped thousands of ambitious women ascend to executive roles and board positions since 2011.\n\nTo help you effectively, could you share a bit about your current role and your primary goal for the next 12 months?"
};

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setMessages([WELCOME_MESSAGE]);
        }
      } catch (e) {
        setMessages([WELCOME_MESSAGE]);
      }
    } else {
      setMessages([WELCOME_MESSAGE]);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, isHydrated]);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    setShowScrollBottom(scrollHeight - scrollTop - clientHeight > 300);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const history: ChatHistoryItem[] = messages.slice(1).map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const result = await getGeminiResponse(text, history);

    const assistantMessage: Message = { 
      role: "assistant", 
      content: result.text 
    };

    if (result.recommendedProgramId) {
      const program = PROGRAMS.find(p => p.id === result.recommendedProgramId);
      if (program) {
        assistantMessage.isProgramCard = true;
        assistantMessage.programData = program;
      }
    }

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const resetChat = () => {
    if (confirm("Would you like to start a fresh advisory session?")) {
      setMessages([WELCOME_MESSAGE]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  if (!isHydrated) return null;

  return (
    <div className="flex flex-col h-full w-full bg-[#fcfaff] relative overflow-hidden">
      {/* Scroll Bottom Button */}
      {showScrollBottom && (
        <button 
          onClick={() => scrollToBottom()}
          className="absolute bottom-40 right-10 z-20 bg-[#2d1b4e] text-white p-3.5 rounded-2xl shadow-2xl hover:bg-[#3d226a] transition-all hover:scale-110 active:scale-95 animate-bounce"
        >
          <ArrowDownCircle className="w-6 h-6" />
        </button>
      )}

      {/* Messages Area */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-6 md:px-12 py-12 space-y-8 scroll-smooth"
      >
        <div className="flex flex-col items-center gap-4 mb-16 opacity-60">
           <div className="h-px bg-slate-200 w-24"></div>
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Secure Session Initiated</span>
        </div>
        
        <div className="max-w-4xl mx-auto w-full space-y-10">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="w-full bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-6 md:py-10">
        <div className="max-w-4xl mx-auto">
          {!isLoading && messages.length <= 6 && (
            <QuickReplies onSelect={sendMessage} />
          )}

          <div className="relative group">
            <form onSubmit={handleSubmit} className="flex items-center gap-4">
              <button 
                type="button"
                onClick={resetChat}
                className="p-4 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all border border-transparent hover:border-rose-100 active:scale-95"
                title="Reset Session"
              >
                <Trash2 className="w-6 h-6" />
              </button>
              
              <div className="flex-1 flex items-center gap-3 bg-slate-50 border border-slate-200 focus-within:border-purple-400 focus-within:bg-white focus-within:shadow-[0_10px_40px_rgba(45,27,78,0.06)] rounded-[2rem] p-2 pr-4 transition-all duration-500">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about visibility, promotions, or our programs..."
                  className="flex-1 bg-transparent px-6 py-4 outline-none text-slate-700 font-medium placeholder-slate-400 text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={`p-4 rounded-full transition-all duration-500 flex items-center justify-center ${
                    input.trim() && !isLoading
                      ? 'bg-[#2d1b4e] text-white shadow-xl shadow-purple-900/10 hover:bg-[#3d226a] hover:scale-105 active:scale-95'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Curating Your Path to Leadership Excellence</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;