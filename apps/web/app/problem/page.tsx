'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import CountUpStat from '@/components/CountUpStat';
import ScriptureAnchor from '@/components/ScriptureAnchor';
import ReadingTime from '@/components/ReadingTime';
import HeroBackground from '@/components/HeroBackground';

export default function ProblemPage() {
  return (
    <main className="page-transition">
      {/* Hero with living depth background */}
      <section className="relative min-h-[50vh] flex items-center pt-24 overflow-hidden">
        <HeroBackground variant="problem" showParticles={true} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 w-full">
          <AnimatedSection>
            <div className="mb-6">
              <ReadingTime minutes={4} />
            </div>
            <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">THE CRISIS</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] mb-6 leading-tight">
              The Modern Mind Is Under Siege
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed max-w-3xl">
              We are more connected than ever — and more anxious, distracted, and spiritually adrift.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-[#F5F3EF]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="mb-12 text-center">
            <p className="text-[#B8960C] text-sm tracking-wider uppercase">The Data</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <CountUpStat value="96" label="phone checks per day" />
            <CountUpStat value="47%" label="waking hours mind-wandering" />
            <CountUpStat value="1 in 3" label="adults with chronic anxiety" />
            <CountUpStat value="60%" label="Christians feel 'stuck'" />
          </div>
        </div>
      </section>

      {/* The Deeper Problem */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-8">
              The Deeper Problem
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="prose prose-lg max-w-none">
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                This is not just a psychological crisis. It is a spiritual one.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                We live in an age of unprecedented distraction. Our attention — the most precious
                resource we have — is constantly being harvested. The average person now has an
                attention span shorter than a goldfish. We scroll without thinking, react without
                reflecting, and move through life without ever truly being present.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                The secular world has noticed. Mindfulness apps have exploded. Meditation retreats
                are booked solid. But something is missing. These solutions offer calm, but not
                transformation. Peace, but not purpose. They quiet the mind, but they don&apos;t
                renew it.
              </p>
              <p className="text-[#1A1A1A] leading-relaxed font-medium">
                Your mind was not built for endless distraction. It was built for communion with God.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 bg-[#F5F3EF]">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <blockquote className="text-center">
              <p className="text-2xl md:text-3xl font-serif italic text-[#1A1A1A] leading-relaxed mb-6">
                &ldquo;The human person lives more than ever in anxiety... This is not a mere
                superficial condition, but a deep inner state.&rdquo;
              </p>
              <cite className="text-[#B8960C] text-sm tracking-wide not-italic">
                — Romano Guardini
              </cite>
            </blockquote>
          </AnimatedSection>
        </div>
      </section>

      {/* The Gap */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-8">
              The Gap
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="prose prose-lg max-w-none">
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                Christians know they are called to something more. Peace that passes understanding.
                Presence in the midst of chaos. Purpose that transcends circumstance.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                But most lack the tools to get there. The contemplative traditions of the Church —
                the practices that transformed the Desert Fathers, that sustained the mystics,
                that produced saints — have been largely forgotten.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-8">
                We have been given breadcrumbs when there is a feast.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-[#0A1628] text-white p-8 md:p-12 rounded-2xl">
              <p className="text-xl md:text-2xl font-serif leading-relaxed mb-2">
                You cannot think your way to transformation.
              </p>
              <p className="text-xl md:text-2xl font-serif leading-relaxed text-[#B8960C]">
                You must train.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Scripture */}
      <ScriptureAnchor
        verse="Be still, and know that I am God."
        reference="Psalm 46:10"
      />

      {/* Transition CTA */}
      <section className="py-24 bg-[#F5F3EF]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
              There is another way.
            </h2>
            <p className="text-[#6B6B6B] text-lg mb-8 max-w-xl mx-auto">
              The ancient practices of the Church, rediscovered and made accessible for modern life.
            </p>
            <Link href="/vision" className="btn-primary inline-flex items-center gap-2">
              Discover the Vision
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
