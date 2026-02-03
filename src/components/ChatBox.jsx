import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceButton from './ui/VoiceButton';
import grokService from './services/grokService';

export default function ChatBox({ 
  lessonContent,
  onMasteryUpdate,
  onComplete,
  className 
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [masteryScore, setMasteryScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: "Great job finishing this lesson! 🎉 I'm here to help you master this material. Let's chat about what you learned — tell me something interesting you picked up, or ask me anything!",
        timestamp: new Date()
      }]);
    }
  }, []);

  const handleSend = async (text = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await grokService.chatWithStudent(
        lessonContent,
        messages.map(m => ({ role: m.role, content: m.content })),
        text.trim()
      );

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update mastery score
      if (response.mastery_score) {
        setMasteryScore(response.mastery_score);
        onMasteryUpdate?.(response.mastery_score);

        // Check if mastery achieved
        if (response.mastery_score >= 85 && !showCelebration) {
          setShowCelebration(true);
          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: (Date.now() + 2).toString(),
              role: 'assistant',
              content: "🌟 Excellent work! You've demonstrated strong understanding of this material. Ready to move on to the next lesson?",
              timestamp: new Date(),
              isSuccess: true
            }]);
          }, 500);
        }
      }

      // Handle frustration
      if (response.is_frustrated) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: (Date.now() + 3).toString(),
            role: 'assistant',
            content: "No rush at all! Learning takes time, and you're doing great. Want to take a break and come back tomorrow fresh? Sometimes that's the best way to let things sink in. 💪",
            timestamp: new Date()
          }]);
        }, 1000);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I had a small hiccup there. Could you try saying that again?",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceTranscript = (transcript) => {
    setInput(transcript);
    handleSend(transcript);
  };

  return (
    <div className={cn('flex flex-col h-full bg-white rounded-xl overflow-hidden border border-[var(--primary)] border-opacity-20', className)}>
      {/* Header */}
      <div className="px-5 py-4 bg-white border-b border-[var(--primary)] border-opacity-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-[var(--primary)] rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--text)]">Grok Tutor</h3>
            <p className="text-xs text-[var(--text)] opacity-60">Powered by xAI</p>
          </div>
          {masteryScore > 0 && (
            <div className="ml-auto">
              <div className={cn(
                'px-3 py-1 rounded-full text-xs font-semibold border',
                'border-[var(--primary)] text-[var(--primary)] bg-[var(--primary)] bg-opacity-10'
              )}>
                {Math.round(masteryScore)}% mastery
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                'flex gap-3',
                message.role === 'user' ? 'flex-row-reverse' : ''
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                message.role === 'user' 
                  ? 'bg-blue-500' 
                  : message.isSuccess 
                    ? 'bg-emerald-500' 
                    : 'bg-slate-200'
              )}>
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className={cn('w-4 h-4', message.isSuccess ? 'text-white' : 'text-slate-600')} />
                )}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'max-w-[80%] rounded-2xl px-4 py-3',
                  message.role === 'user' 
                    ? 'bg-[var(--primary)] text-white rounded-tr-sm' 
                    : message.isSuccess
                      ? 'border border-[var(--accent)] text-[var(--text)] bg-[var(--accent)] bg-opacity-10 rounded-tl-sm'
                      : 'bg-white text-[var(--text)] shadow-md border border-[var(--primary)] border-opacity-20 rounded-tl-sm'
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <Bot className="w-4 h-4 text-slate-600" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3"
          >
            <Button 
              onClick={onComplete}
              className="w-full border-2 border-[var(--accent)] bg-white text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white font-semibold py-3 transition-all"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Continue to Next Lesson
            </Button>
          </motion.div>
        )}
        
        <div className="flex items-center gap-3">
          <VoiceButton 
            onTranscript={handleVoiceTranscript}
            size="md"
            disabled={isLoading}
          />
          
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              disabled={isLoading}
              className="pr-12 py-6 rounded-xl border-slate-200 focus:border-blue-300 focus:ring-blue-200"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg border border-[var(--primary)] bg-white hover:bg-[var(--primary)] text-[var(--primary)] hover:text-white transition-all"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}