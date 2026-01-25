'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Crosshair, Heart, Brain, Sun, Activity, Moon, Zap, Watch } from 'lucide-react';
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

const evidenceCards = [
  {
    image: '/images/hrv.png',
    title: 'HRV',
    description: 'Heart Rate Variability as a marker of nervous system health and resilience. Contemplative practice measurably improves HRV.',
  },
  {
    image: '/images/dmn.png',
    title: 'DMN',
    description: 'The Default Mode Network — the brain\'s wandering mind. Contemplative practice quiets the DMN, reducing anxiety and rumination.',
  },
  {
    image: '/images/neuroplasticity.png',
    title: 'Neuroplasticity',
    description: 'The brain\'s ability to rewire through consistent training. You become what you repeatedly practice.',
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

      {/* Divine Rhythm - Timeline Infographic */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-wider uppercase mb-4 text-center">Throughout the Day</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-6 text-center">
              Divine Rhythm
            </h2>
            <p className="text-[#6B6B6B] text-center max-w-2xl mx-auto mb-16">
              Transformation doesn&apos;t happen in 15 minutes a day. It happens through
              consistent reorientation to God&apos;s presence throughout the day.
            </p>
          </AnimatedSection>

          {/* Timeline Infographic */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              {/* Connection line - desktop */}
              <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-[#B8960C] via-[#0A5C8F] to-[#0A1628]" />

              {/* Timeline nodes */}
              <div className="grid md:grid-cols-3 gap-8 md:gap-4">
                {/* Morning Node */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#B8960C] to-[#D4AF37] flex items-center justify-center mb-6 shadow-lg shadow-[#B8960C]/20">
                    <Sun className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">Morning</h3>
                  <p className="text-[#B8960C] font-medium mb-2">Sacred Center</p>
                  <p className="text-sm text-[#6B6B6B]">15 minutes</p>
                </div>

                {/* Throughout Day Node */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0A5C8F] to-[#1E88E5] flex items-center justify-center mb-6 shadow-lg shadow-[#0A5C8F]/20">
                    <Activity className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">Throughout Day</h3>
                  <p className="text-[#0A5C8F] font-medium mb-2">Divine Rhythm</p>
                  <p className="text-sm text-[#6B6B6B]">60-90 sec each</p>
                </div>

                {/* Evening Node */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0A1628] to-[#1A2744] flex items-center justify-center mb-6 shadow-lg shadow-[#0A1628]/20">
                    <Moon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">Evening</h3>
                  <p className="text-[#0A1628] font-medium mb-2">Night Prayer</p>
                  <p className="text-sm text-[#6B6B6B]">5 minutes</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Explanation Cards */}
          <AnimatedSection delay={0.4} className="mt-16">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Refire & Rewire Card */}
              <div className="bg-white rounded-2xl p-8 border border-[#E8DFC4] shadow-lg shadow-black/5">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-5">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-3">Refire & Rewire</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Each micro-practice strengthens neural pathways of presence and peace.
                  Over time, returning to God becomes your default mode.
                </p>
              </div>

              {/* Wearable Vision Card */}
              <div className="bg-white rounded-2xl p-8 border border-[#E8DFC4] shadow-lg shadow-black/5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <Watch className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-3">The Wearable Vision</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Our prototype wearable pulses every 1:30 — a gentle haptic reminder to
                  reorient, realign, and reconnect with the present moment.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Wearable/Technology Section */}
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
              <div className="relative flex items-center justify-center">
                <Image
                  src="/images/wearable-clean.png"
                  alt="Sanctus wearable device"
                  width={400}
                  height={400}
                  className="object-contain"
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

      {/* The Evidence - Image Cards */}
      <section className="py-24 bg-[#F5F3EF]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#B8960C] text-sm tracking-wider uppercase mb-4">The Evidence</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-4">
              Ancient Wisdom, Modern Confirmation
            </h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">
              We are not anti-science. We believe that modern neuroscience confirms what the
              Church Fathers discovered through prayer and practice two thousand years ago.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {evidenceCards.map((card, index) => (
              <AnimatedSection key={card.title} delay={index * 0.15}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-[#E8DFC4]">
                  <div className="h-48 relative bg-[#F5F3EF]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      quality={90}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif text-[#B8960C] mb-3">{card.title}</h3>
                    <p className="text-[#6B6B6B] leading-relaxed text-sm">{card.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.5} className="mt-12 text-center">
            <p className="text-[#1A1A1A] leading-relaxed font-medium">
              The full biometric integration comes later. First, we prove the practice transforms.
            </p>
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
