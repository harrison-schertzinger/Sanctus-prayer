'use client';

import AnimatedSection from './AnimatedSection';

interface ScriptureAnchorProps {
  verse: string;
  reference: string;
  className?: string;
}

export default function ScriptureAnchor({ verse, reference, className = '' }: ScriptureAnchorProps) {
  return (
    <AnimatedSection className={className}>
      <div className="relative py-12">
        {/* Gold thread line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#B8960C]/30 to-transparent" />

        <div className="relative bg-[#FAFAF8] px-6 py-4 max-w-2xl mx-auto text-center">
          <p className="font-serif italic text-xl md:text-2xl text-[#6B6B6B] leading-relaxed">
            &ldquo;{verse}&rdquo;
          </p>
          <p className="mt-3 text-sm text-[#B8960C] tracking-wide">
            — {reference}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
