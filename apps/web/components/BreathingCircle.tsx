'use client';

import { motion } from 'framer-motion';

interface BreathingCircleProps {
  className?: string;
}

export default function BreathingCircle({ className = '' }: BreathingCircleProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer breathing ring */}
      <motion.div
        className="absolute w-32 h-32 rounded-full border border-[#B8960C]/20"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Middle breathing ring */}
      <motion.div
        className="absolute w-24 h-24 rounded-full border border-[#B8960C]/30"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.2,
        }}
      />

      {/* Inner breathing circle */}
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B8960C]/10 to-[#B8960C]/5"
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.4,
        }}
      />

      {/* Center dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-[#B8960C]/60"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Breathe text */}
      <motion.p
        className="absolute -bottom-10 text-xs text-[#B8960C]/60 tracking-widest uppercase"
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Breathe
      </motion.p>
    </div>
  );
}
