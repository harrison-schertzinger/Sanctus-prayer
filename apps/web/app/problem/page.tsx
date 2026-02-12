'use client';

import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import CountUpStat from '@/components/CountUpStat';
import ScriptureAnchor from '@/components/ScriptureAnchor';
import HeroBackground from '@/components/HeroBackground';

export default function ProblemPage() {
  return (
    <main className="page-transition">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center pt-24 overflow-hidden">
        <HeroBackground variant="problem" showParticles={true} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 w-full">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">THE CRISIS</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] mb-6 leading-tight">
              Your Wearable Tracks Everything Except What Matters Most
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed max-w-3xl">
              The health and performance world optimizes every biomarker but ignores the soul. That&apos;s an incomplete picture of human performance.
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
            <CountUpStat value="$5.1T" label="global wellness market" />
          </div>
        </div>
      </section>

      {/* The Deeper Problem */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-8">
              The Abandoned Tradition
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="prose prose-lg max-w-none">
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                The West abandoned its contemplative tradition. We pray reactively &mdash; in crisis moments, at breaking points &mdash; not restoratively, as a daily practice. For 2,000 years, the Desert Fathers, monastics, and saints practiced daily structured prayer as the foundation of human flourishing. We lost it.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                Secular wellness noticed the gap. Mindfulness apps borrowed from the contemplative tradition, stripped the theology, and sold it back as a productivity hack. The breathing techniques, the silence, the centering &mdash; all originated in Christian monastic practice.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                Meanwhile, the wearable industry tracked every external metric &mdash; steps, sleep stages, HRV, blood oxygen &mdash; while ignoring the interior life entirely. No wearable has ever asked: what is the state of your soul?
              </p>
              <p className="text-[#1A1A1A] leading-relaxed font-medium">
                You cannot optimize human performance while ignoring the deepest part of the human person. The soul is not a nice-to-have. It is the foundation.
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
                &mdash; Romano Guardini
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
              The Gap in the Market
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="prose prose-lg max-w-none">
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                Whoop owns performance. Oura owns sleep. Apple owns mainstream. But nobody owns the intersection of faith, health, and performance. No wearable exists for the person who takes their body and their soul equally seriously.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-8">
                Existing wearables are passive monitors. They give you data. They measure but never intervene. They can tell you your HRV dropped, but they can&apos;t guide you back to center. They track your sleep, but they don&apos;t restore your soul.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-[#0A1628] text-white p-8 md:p-12 rounded-2xl">
              <p className="text-xl md:text-2xl font-serif leading-relaxed mb-2">
                Other wearables measure.
              </p>
              <p className="text-xl md:text-2xl font-serif leading-relaxed text-[#B8960C]">
                Sanctus intervenes.
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
              A wearable built for active restoration. Ancient contemplative practice made tangible through modern technology.
            </p>
            <a href="/#vision" className="btn-primary inline-flex items-center gap-2">
              See the Vision
              <ArrowRight size={18} />
            </a>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
