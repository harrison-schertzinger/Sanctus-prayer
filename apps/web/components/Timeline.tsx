'use client';

import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { Check, Circle, ArrowRight } from 'lucide-react';

const phases = [
  {
    number: 1,
    title: 'Concept & Design',
    description: 'Research, theological foundation, product architecture',
    status: 'complete',
  },
  {
    number: 2,
    title: 'Companion App + Prototype Band',
    description: 'Proving the practice with founding test cohort wearing the prototype',
    status: 'current',
  },
  {
    number: 3,
    title: 'Wearable Production',
    description: 'Manufacturing partnership, production-ready band design',
    status: 'upcoming',
  },
  {
    number: 4,
    title: 'Biometric Integration',
    description: 'Full HRV tracking, touch therapy, real-time feedback loops',
    status: 'upcoming',
  },
  {
    number: 5,
    title: 'Public Launch',
    description: 'Full release — band + companion app ecosystem',
    status: 'upcoming',
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      {phases.map((phase, index) => (
        <AnimatedSection key={phase.number} delay={index * 0.1}>
          <div className="flex gap-6 mb-8 last:mb-0">
            {/* Timeline indicator */}
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  phase.status === 'complete'
                    ? 'bg-[#B8960C] border-[#B8960C] text-white'
                    : phase.status === 'current'
                    ? 'bg-white border-[#B8960C] text-[#B8960C]'
                    : 'bg-white border-[#E8DFC4] text-[#6B6B6B]'
                }`}
              >
                {phase.status === 'complete' ? (
                  <Check size={20} />
                ) : phase.status === 'current' ? (
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8960C] opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#B8960C]"></span>
                  </span>
                ) : (
                  <Circle size={12} />
                )}
              </motion.div>

              {/* Connecting line */}
              {index < phases.length - 1 && (
                <div
                  className={`w-[2px] flex-grow my-2 ${
                    phase.status === 'complete' ? 'bg-[#B8960C]' : 'bg-[#E8DFC4]'
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div className={`flex-grow pb-8 ${phase.status === 'current' ? '' : ''}`}>
              <div
                className={`p-6 rounded-xl transition-all ${
                  phase.status === 'current'
                    ? 'bg-[#F5F3EF] border border-[#B8960C]/30'
                    : 'bg-transparent'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-[#B8960C] font-medium tracking-wider uppercase">
                    Phase {phase.number}
                  </span>
                  {phase.status === 'current' && (
                    <span className="text-xs bg-[#B8960C]/10 text-[#B8960C] px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">{phase.title}</h3>
                <p className="text-[#6B6B6B]">{phase.description}</p>

                {phase.status === 'current' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 pt-4 border-t border-[#E8DFC4]"
                  >
                    <p className="text-sm text-[#6B6B6B] flex items-center gap-2">
                      <ArrowRight size={14} className="text-[#B8960C]" />
                      Founding 10 wearing prototype band through 40 days of Lent
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
