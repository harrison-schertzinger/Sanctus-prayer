'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { Wind, BookOpen, Sparkles } from 'lucide-react';

const phases = [
  {
    icon: Wind,
    title: 'Recollection',
    subtitle: 'Breathwork',
    description: 'Settle the body. Quiet the mind. Breath-paced prayer at the resonance frequency prepares you for stillness.',
    duration: '~5 minutes',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: BookOpen,
    title: 'Contemplation',
    subtitle: 'Scripture Meditation',
    description: 'Rest in a passage of Scripture with resonance breathing. Prayer phrases synced to breath. Let the Word read you.',
    duration: '~5 minutes',
    iconBg: 'bg-amber-50',
    iconColor: 'text-[#B8960C]',
  },
  {
    icon: Sparkles,
    title: 'Praise & Petition',
    subtitle: 'Response & Vision',
    description: 'Gratitude for what is. Intercession for others. Visualization of what could be. Surrender of what must be released.',
    duration: '~5 minutes',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
];

export default function SacredCenterDiagram() {
  return (
    <div className="relative">
      <div className="grid md:grid-cols-3 gap-6">
        {phases.map((phase, index) => (
          <AnimatedSection key={phase.title} delay={index * 0.2}>
            <motion.div
              whileHover={{ y: -4 }}
              className="relative bg-white rounded-2xl p-8 border border-[#E8DFC4] shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all flex flex-col h-full"
            >
              {/* Phase badge */}
              <div className="absolute -top-3 left-6 bg-[#B8960C] text-white text-xs font-medium px-3 py-1 rounded-full">
                Phase {index + 1}
              </div>

              {/* Icon with colored background */}
              <div className={`w-14 h-14 rounded-2xl ${phase.iconBg} flex items-center justify-center mb-5`}>
                <phase.icon className={`w-7 h-7 ${phase.iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-serif text-[#1A1A1A] mb-1">{phase.title}</h3>
              <p className="text-sm text-[#B8960C] mb-4 font-medium">{phase.subtitle}</p>
              <p className="text-[#6B6B6B] leading-relaxed flex-grow">{phase.description}</p>

              {/* Duration */}
              <div className="text-xs text-[#6B6B6B] pt-4 mt-4 border-t border-[#E8DFC4]">
                {phase.duration}
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>

      {/* Visualization callout */}
      <AnimatedSection delay={0.6} className="mt-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#E8DFC4] max-w-2xl mx-auto">
          <p className="text-center text-[#6B6B6B] leading-relaxed">
            <span className="text-[#B8960C] font-serif text-lg">&ldquo;Pray as if you have already received.&rdquo;</span>
            <br />
            <span className="text-sm mt-2 block">— Mark 11:24</span>
          </p>
          <p className="text-center text-[#6B6B6B] text-sm mt-4">
            Visualization activates the same neural pathways as physical practice.
            In Phase 3, you see the completion of your dreams as if already achieved.
          </p>
        </div>
      </AnimatedSection>

      {/* Total time */}
      <AnimatedSection delay={0.8} className="mt-8 text-center">
        <p className="text-[#6B6B6B]">
          <span className="text-[#B8960C] font-medium">15 minutes</span> that can reshape your day — and eventually, your life.
        </p>
      </AnimatedSection>
    </div>
  );
}
