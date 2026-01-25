'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Crosshair, Heart, Brain } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import SacredCenterDiagram from '@/components/SacredCenterDiagram';
import PillarCard from '@/components/PillarCard';
import ScriptureAnchor from '@/components/ScriptureAnchor';
import ReadingTime from '@/components/ReadingTime';
import HeroBackground from '@/components/HeroBackground';

const pillars = [
  {
    icon: Crosshair,
    title: 'Retrain Focus',
    description:
      'Break free from distraction. Quiet the Default Mode Network through contemplative stillness. Train your attention to remain present to God and to the moment.',
  },
  {
    icon: Heart,
    title: 'Restore Peace',
    description:
      'Shift from chronic stress to parasympathetic calm. Practice breath-paced prayer at the resonance frequency discovered by ancient tradition and confirmed by modern science.',
  },
  {
    icon: Brain,
    title: 'Renew the Mind',
    description:
      'Be transformed by the renewal of your mind. Through consistent practice, rewire neural pathways and become who God created you to be.',
  },
];

export default function VisionPage() {
  return (
    <main className="page-transition">
      {/* Hero with living depth background */}
      <section className="relative min-h-[50vh] flex items-center pt-24 overflow-hidden">
        <HeroBackground variant="vision" showParticles={true} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
          <AnimatedSection>
            <div className="mb-6">
              <ReadingTime minutes={5} />
            </div>
            <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">THE VISION</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] mb-6 leading-tight">
              A New Way to Pray an Old Prayer
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed max-w-2xl">
              Ancient contemplative wisdom meets modern understanding of transformation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Sacred Center */}
      <section className="py-24 bg-[#F5F3EF]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#B8960C] text-sm tracking-wider uppercase mb-4">The Practice</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-4">
              Sacred Center
            </h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">
              Our signature contemplative practice. A three-phase structure that guides you into
              deep stillness before God.
            </p>
          </AnimatedSection>

          <SacredCenterDiagram />
        </div>
      </section>

      {/* Divine Rhythm */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-wider uppercase mb-4">Throughout the Day</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-8">
              Divine Rhythm
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="prose prose-lg max-w-none">
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                Transformation doesn&apos;t happen in 15 minutes a day. It happens through
                consistent reorientation to God&apos;s presence throughout the day.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                Brother Lawrence practiced the presence of God in his monastery kitchen.
                Sanctus helps you practice it in your modern life — through gentle reminders,
                micro-practices, and evening reflection.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed">
                Morning practice. Midday reorientation. Evening examen. A rhythm that shapes
                the day, and over time, shapes you.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Wearable Teaser Section */}
      <section className="py-20 bg-[#0A1628] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">THE FUTURE</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                Technology in Service of the Sacred
              </h2>
              <p className="text-white/70 mb-6 leading-relaxed">
                A wearable device that guides your breath through gentle haptic pulses,
                tracks your heart rate variability, and helps you build a consistent
                practice — without ever looking at a screen.
              </p>
              <p className="text-[#B8960C] italic">Coming after prototype validation.</p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <div className="relative">
                <Image
                  src="/images/app-mockups/Sanctus.v1.PNG"
                  alt="Sanctus wearable device"
                  width={500}
                  height={400}
                  className="mx-auto"
                  quality={90}
                />
                {/* Subtle glow effect behind device */}
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-[#B8960C]/10 blur-3xl" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Science */}
      <section className="py-24 bg-[#F5F3EF]">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#B8960C] text-sm tracking-wider uppercase mb-4">The Evidence</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-4">
              Ancient Wisdom, Modern Confirmation
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#E8DFC4]">
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                We are not anti-science. We believe that modern neuroscience confirms what the
                Church Fathers discovered through prayer and practice two thousand years ago.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4">
                  <p className="text-2xl font-serif text-[#B8960C] mb-2">HRV</p>
                  <p className="text-sm text-[#6B6B6B]">Heart Rate Variability as a marker of nervous system health</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-2xl font-serif text-[#B8960C] mb-2">DMN</p>
                  <p className="text-sm text-[#6B6B6B]">Default Mode Network quieting through contemplative practice</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-2xl font-serif text-[#B8960C] mb-2">Neuroplasticity</p>
                  <p className="text-sm text-[#6B6B6B]">The brain&apos;s ability to rewire through consistent training</p>
                </div>
              </div>
              <p className="text-[#1A1A1A] leading-relaxed font-medium text-center">
                The full biometric integration comes later. First, we prove the practice transforms.
              </p>
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
              Three Pillars of Transformation
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} {...pillar} delay={index * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* Transition CTA */}
      <section className="py-24 bg-[#F5F3EF]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
              Follow along as we build this.
            </h2>
            <p className="text-[#6B6B6B] text-lg mb-8 max-w-xl mx-auto">
              Sanctus is being built in public. Here&apos;s where we are and where we&apos;re headed.
            </p>
            <Link href="/journey" className="btn-primary inline-flex items-center gap-2">
              See the Journey
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
