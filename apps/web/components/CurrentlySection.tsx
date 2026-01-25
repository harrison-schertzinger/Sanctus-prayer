'use client';

import { motion } from 'framer-motion';

interface CurrentlySectionProps {
  week?: number;
  content: string;
}

export default function CurrentlySection({ week = 4, content }: CurrentlySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-3 bg-[#F5F3EF] border border-[#E8DFC4] rounded-full px-5 py-2.5"
    >
      {/* Pulsing dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8960C] opacity-40"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B8960C]"></span>
      </span>

      <span className="text-sm">
        <span className="text-[#B8960C] font-medium">Week {week}:</span>
        <span className="text-[#6B6B6B] ml-1">{content}</span>
      </span>
    </motion.div>
  );
}
