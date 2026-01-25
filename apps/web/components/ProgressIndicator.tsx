'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const journeySteps = [
  { path: '/', label: 'Home', number: 1 },
  { path: '/problem', label: 'Problem', number: 2 },
  { path: '/vision', label: 'Vision', number: 3 },
  { path: '/journey', label: 'Journey', number: 4 },
  { path: '/about', label: 'About', number: 5 },
];

export default function ProgressIndicator() {
  const pathname = usePathname();
  const currentIndex = journeySteps.findIndex((step) => step.path === pathname);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#E8DFC4]" />

        {/* Progress fill */}
        <motion.div
          className="absolute left-[7px] top-2 w-[2px] bg-[#B8960C]"
          initial={{ height: 0 }}
          animate={{ height: `${(currentIndex / (journeySteps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ maxHeight: 'calc(100% - 16px)' }}
        />

        {/* Steps */}
        <div className="flex flex-col gap-8">
          {journeySteps.map((step, index) => {
            const isActive = pathname === step.path;
            const isPast = index <= currentIndex;

            return (
              <Link
                key={step.path}
                href={step.path}
                className="group flex items-center gap-3"
              >
                <motion.div
                  className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                    isActive
                      ? 'bg-[#B8960C] border-[#B8960C]'
                      : isPast
                      ? 'bg-[#B8960C]/20 border-[#B8960C]'
                      : 'bg-[#FAFAF8] border-[#E8DFC4] group-hover:border-[#B8960C]'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
                <span
                  className={`text-xs tracking-wide transition-colors duration-300 ${
                    isActive
                      ? 'text-[#B8960C]'
                      : 'text-[#6B6B6B] group-hover:text-[#1A1A1A]'
                  }`}
                >
                  {step.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
