'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { Wind, BookOpen, Heart } from 'lucide-react';

const phases = [
  {
    icon: Wind,
    title: 'Recollection',
    subtitle: 'Breathwork',
    description: 'Settle the body. Quiet the mind. Breath-paced prayer at the resonance frequency prepares you for stillness.',
    duration: '~5 minutes',
  },
  {
    icon: BookOpen,
    title: 'Contemplation',
    subtitle: 'Scripture Meditation',
    description: 'Rest in a passage of Scripture. Not study, but dwelling. Let the Word read you as much as you read it.',
    duration: '~7 minutes',
  },
  {
    icon: Heart,
    title: 'Praise & Petition',
    subtitle: 'Response',
    description: 'Gratitude for what is. Vision for what could be. Surrender of what must be released.',
    duration: '~3 minutes',
  },
];

export default function SacredCenterDiagram() {
  return (
    <div className="relative">
      {/* Central connecting element */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#E8DFC4] to-transparent hidden md:block" />

      <div className="grid md:grid-cols-3 gap-8">
        {phases.map((phase, index) => (
          <AnimatedSection key={phase.title} delay={index * 0.2}>
            <motion.div
              whileHover={{ y: -4 }}
              className="relative bg-white rounded-2xl p-8 border border-[#E8DFC4] shadow-sm hover:shadow-md transition-all"
            >
              {/* Phase number */}
              <div className="absolute -top-4 left-8 bg-[#B8960C] text-white text-xs font-medium px-3 py-1 rounded-full">
                Phase {index + 1}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#F5F3EF] flex items-center justify-center mb-6">
                <phase.icon className="w-7 h-7 text-[#B8960C]" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-serif text-[#1A1A1A] mb-1">{phase.title}</h3>
              <p className="text-sm text-[#B8960C] mb-4">{phase.subtitle}</p>
              <p className="text-[#6B6B6B] mb-4 leading-relaxed">{phase.description}</p>

              {/* Duration */}
              <div className="text-xs text-[#6B6B6B] pt-4 border-t border-[#E8DFC4]">
                {phase.duration}
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>

      {/* Total time */}
      <AnimatedSection delay={0.6} className="mt-8 text-center">
        <p className="text-[#6B6B6B]">
          <span className="text-[#B8960C] font-medium">15 minutes</span> that can reshape your day — and eventually, your life.
        </p>
      </AnimatedSection>
    </div>
  );
}
