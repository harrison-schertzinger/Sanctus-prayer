'use client';

import Image from 'next/image';
import { ArrowRight, Crosshair, Heart, Brain, Watch, Zap } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import PillarCard from '@/components/PillarCard';
import ScriptureAnchor from '@/components/ScriptureAnchor';
import HeroBackground from '@/components/HeroBackground';

const pillars = [
  {
    icon: Crosshair,
    title: 'Retrain Focus',
    description:
      'The band pulses gently throughout the day — a tactile call to return to presence. Break free from distraction. Train your attention to remain present to God and to the moment.',
  },
  {
    icon: Heart,
    title: 'Restore Peace',
    description:
      'Active touch therapy guides your stress response in real time. Shift from chronic activation to parasympathetic calm through pulse patterns rooted in ancient breath-paced prayer.',
  },
  {
    icon: Brain,
    title: 'Renew the Mind',
    description:
      'The band and companion app work together to rewire neural pathways through consistent contemplative practice. Become who God created you to be — measurably, progressively.',
  },
];

export default function VisionPage() {
  return (
    <main className="page-transition">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center pt-24 overflow-hidden">
        <HeroBackground variant="vision" showParticles={true} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">THE VISION</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] mb-6 leading-tight">
              The First Wearable Built for the Soul
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed max-w-2xl">
              A wellness wearable and companion app that establishes a life of contemplative prayer — connecting your physiology to your practice for the first time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* The Band */}
      <section className="py-24 bg-[#F5F3EF]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">THE BAND</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-6">
                A Wearable That Intervenes, Not Just Monitors
              </h2>
              <p className="text-[#6B6B6B] mb-6 leading-relaxed">
                24/7 bio-monitoring combined with active touch therapy for stress response. Pulse patterns that guide you back to center. The Sanctus band doesn&apos;t just track your heart rate &mdash; it uses pulse patterns for active stress intervention, syncs biometric data with your prayer practice, and delivers restorative protocols in real time.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed">
                Not passive tracking. Active restoration. Your prayer life and your physiology connected for the first time.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <div className="relative flex items-center justify-center py-8">
                <Image
                  src="/images/wearable-clean.png"
                  alt="Sanctus wellness wearable band"
                  width={500}
                  height={500}
                  className="object-contain drop-shadow-2xl"
                  quality={95}
                />
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                  <div className="w-80 h-80 rounded-full bg-[#B8960C]/15 blur-3xl" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Companion App */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#B8960C] text-sm tracking-wider uppercase mb-4">The Companion App</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-4">
              Your Dashboard for Daily Formation
            </h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">
              Daily guided contemplative prayer, Scripture readings, progress tracking, and biometric insights from the band. The companion app makes the band intelligent and personal.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 border border-[#E8DFC4] shadow-lg shadow-black/5">
                <div className="w-12 h-12 rounded-xl bg-[#B8960C]/10 flex items-center justify-center mb-5">
                  <Zap className="w-6 h-6 text-[#B8960C]" />
                </div>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-3">Guided Contemplative Prayer</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  A 40-day progressive formation journey with four daily touchpoints &mdash; Morning Reading, Sacred Center, Divine Rhythm, and Night Prayer. Each session builds on the last. Structured around the Liturgy of the Hours.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-[#E8DFC4] shadow-lg shadow-black/5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <Watch className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-3">Biometric Integration</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  See how your prayer practice affects your physiology. The companion app syncs biometric data from the band &mdash; heart rate variability, stress response, and recovery &mdash; so you can track formation in body and soul.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Scripture */}
      <ScriptureAnchor
        verse="Be transformed by the renewal of your mind, that you may prove what is the good and acceptable and perfect will of God."
        reference="Romans 12:2"
      />

      {/* Three Pillars */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-4">
              Three Pillars of Restoration
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} {...pillar} delay={index * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* Market Position */}
      <section className="py-24 bg-[#F5F3EF]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">The Market</p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-8">
              An Unoccupied Space with Massive Demand
            </h2>
            <p className="text-[#6B6B6B] text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Whoop owns performance. Oura owns sleep. Sanctus owns the soul. The intersection of faith, health, and performance is unoccupied &mdash; and the demand is undeniable. We&apos;re building the brand that fills it.
            </p>
            <a href="/#join" className="btn-primary inline-flex items-center gap-2">
              Join the Waitlist
              <ArrowRight size={18} />
            </a>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
