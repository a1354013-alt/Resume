'use client';

import { useState, useEffect, useRef } from 'react';
import { aiProjects, type AiProject } from '@/data/aiProjects';
import { Button } from '@/components/ui/button';
import { Copy, Play } from 'lucide-react';

/**
 * AI Demo Console - 模擬 AI prompt 展示
 * 
 * 功能：
 * - 展示 demo prompts
 * - 自動打字動畫
 * - Copy button
 * - 不呼叫任何 API，僅做展示
 */

interface DemoMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AiDemoConsoleProps {
  project?: AiProject;
}

export default function AiDemoConsole({ project }: AiDemoConsoleProps) {
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);

  const selectedProject = project || aiProjects[0];
  const demoPrompts = selectedProject.demoPrompts || [];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Typewriter effect
  useEffect(() => {
    if (!isTyping || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'assistant') return;

    const fullText = lastMessage.content;
    let currentText = '';
    let charIndex = 0;

    const type = () => {
      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];
        charIndex++;

        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            content: currentText
          };
          return newMessages;
        });

        typewriterRef.current = setTimeout(type, 30);
      } else {
        setIsTyping(false);
      }
    };

    typewriterRef.current = setTimeout(type, 30);

    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current);
        typewriterRef.current = null;
      }
    };
  }, [isTyping, messages]);

  const handleRunDemo = (promptIndex: number) => {
    if (promptIndex >= demoPrompts.length || !selectedProject.demoResponses) return;

    const prompt = demoPrompts[promptIndex];
    const response = selectedProject.demoResponses[promptIndex];

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: prompt }]);

    // Add empty assistant message and start typing
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      setIsTyping(true);
      setCurrentPromptIndex(promptIndex + 1);
    }, 300);
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    });
  };

  const handleClear = () => {
    setMessages([]);
    setCurrentPromptIndex(0);
    setIsTyping(false);
  };

  return (
    <section className="relative py-20 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Section title */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-2">AI Demo 演示</h2>
        <p className="text-slate-400">互動式 AI 應用展示</p>
      </div>

      {/* Console */}
      <div className="border border-slate-700 rounded-lg overflow-hidden bg-slate-950/50 backdrop-blur-sm">
        {/* Header */}
        <div className="bg-slate-900/50 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-100">{selectedProject.title}</h3>
            <p className="text-xs text-slate-400 mt-1">AI Demo Console</p>
          </div>
          <button
            onClick={handleClear}
            className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
          >
            清除
          </button>
        </div>

        {/* Messages area */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-950/50 to-slate-900/20">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <p className="text-slate-400 mb-4">選擇一個 Demo Prompt 開始</p>
                <p className="text-xs text-slate-500">點擊下方按鈕執行演示</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-100'
                        : 'bg-slate-800/50 border border-slate-700 text-slate-300'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/50 border border-slate-700 text-slate-300 px-4 py-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Prompts */}
        <div className="bg-slate-900/50 border-t border-slate-700 px-6 py-4">
          <p className="text-xs text-slate-400 mb-3">Demo Prompts：</p>
          <div className="space-y-2">
            {demoPrompts.map((prompt, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors group">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 line-clamp-2">{prompt}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleCopyPrompt(prompt)}
                    className="p-1.5 text-slate-400 hover:text-slate-300 hover:bg-slate-700 rounded transition-colors"
                    title="複製"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={() => handleRunDemo(idx)}
                    disabled={isTyping || !selectedProject.demoResponses}
                    className="p-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-slate-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="執行"
                  >
                    <Play size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-slate-900/30 border border-slate-700 rounded-lg text-xs text-slate-400">
        <p>💡 <strong>提示：</strong>這是一個演示控制台，展示 AI 應用的典型互動流程。所有回應均為預設示例，不涉及實時 API 調用。</p>
      </div>
    </section>
  );
}
