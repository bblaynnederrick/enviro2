import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './Button';

interface ChatInterfaceProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    onGenerate(prompt);
    setPrompt('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [prompt]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden ring-1 ring-black/5">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your interface... (e.g., 'A modern pricing page with 3 tiers')"
              className="w-full p-4 pr-12 text-gray-900 placeholder-gray-400 bg-transparent border-none resize-none focus:ring-0 focus:outline-none min-h-[60px] max-h-[200px]"
              rows={1}
              disabled={isGenerating}
            />
            <div className="absolute right-3 top-3">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className={`rounded-full h-8 w-8 p-0 flex items-center justify-center transition-all ${
                  prompt.trim() ? 'opacity-100 scale-100' : 'opacity-50 scale-90'
                }`}
                disabled={!prompt.trim() || isGenerating}
              >
                 {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-t border-gray-100">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Sparkles className="w-3 h-3 text-purple-500" />
              <span>AI-Powered Design</span>
            </div>
            <div className="text-xs text-gray-400">
              Press Enter to send
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};