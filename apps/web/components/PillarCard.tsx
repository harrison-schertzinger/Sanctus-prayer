'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export default function PillarCard({ icon: Icon, title, description, delay = 0 }: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4 }}
      className="card p-8"
    >
      <div className="w-12 h-12 rounded-xl bg-[#B8960C]/10 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-[#B8960C]" />
      </div>
      <h3 className="text-xl font-serif text-[#1A1A1A] mb-3">{title}</h3>
      <p className="text-[#6B6B6B] leading-relaxed">{description}</p>
    </motion.div>
  );
}
