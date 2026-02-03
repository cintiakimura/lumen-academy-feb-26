import React, { useState } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function VoiceButton({ 
  onTranscript, 
  size = 'lg',
  className,
  disabled 
}) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-7 h-7'
  };

  const handleClick = () => {
    if (disabled || isProcessing) return;
    
    if (!isListening) {
      // Start listening (mock - in real app, use Web Speech API)
      setIsListening(true);
      
      // Mock: stop after 3 seconds and return mock transcript
      setTimeout(() => {
        setIsListening(false);
        setIsProcessing(true);
        
        setTimeout(() => {
          setIsProcessing(false);
          if (onTranscript) {
            onTranscript("I think the brake pads need to be replaced when they're worn down to about 3mm thickness.");
          }
        }, 1000);
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'relative rounded-full flex items-center justify-center transition-all duration-300 shadow-lg',
        sizeClasses[size],
        isListening 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-blue-500 hover:bg-blue-600',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <AnimatePresence mode="wait">
        {isProcessing ? (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <Loader2 className={cn('text-white animate-spin', iconSizes[size])} />
          </motion.div>
        ) : isListening ? (
          <motion.div
            key="listening"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <MicOff className={cn('text-white', iconSizes[size])} />
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <Mic className={cn('text-white', iconSizes[size])} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Pulse animation when listening */}
      {isListening && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full bg-red-500"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.span
            className="absolute inset-0 rounded-full bg-red-500"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          />
        </>
      )}
    </motion.button>
  );
}