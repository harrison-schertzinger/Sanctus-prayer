'use client';

import { Check, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import Timeline from '@/components/Timeline';
import EmailCapture from '@/components/EmailCapture';
import ScriptureAnchor from '@/components/ScriptureAnchor';
import ReadingTime from '@/components/ReadingTime';
import BreathingCircle from '@/components/BreathingCircle';
import HeroBackground from '@/components/HeroBackground';

const whatYouGet = [
  'Updates on our progress as we build',
  'Early access to the prototype app',
  'Direct input on product development',
  'Founding member status in the Sanctus community',
];

const whatWeAsk = [
  'Your attention as we share the journey',
  'Honest feedback when we ask for it',
  'Your prayers for the mission',
];

export default function JourneyPage() {
  return (
    <main className="page-transition">
      {/* Hero with living depth background */}
      <section className="relative min-h-[50vh] flex items-center pt-24 overflow-hidden">
        <HeroBackground variant="journey" showParticles={true} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
          <AnimatedSection>
            <div className="mb-6">
              <ReadingTime minutes={3} />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] mb-6 leading-tight">
              Follow Along to Launch
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed max-w-3xl">
              Sanctus is being built in public. Here&apos;s where we are and where we&apos;re headed.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-[#F5F3EF]">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="mb-12">
            <p className="text-[#B8960C] text-sm tracking-wider uppercase mb-4">The Roadmap</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A]">
              Where We&apos;re Going
            </h2>
          </AnimatedSection>

          <Timeline />
        </div>
      </section>

      {/* What the Prototype Proves */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-wider uppercase mb-4">The Questions</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-8">
              What the Prototype Proves
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              <div className="p-6 bg-[#F5F3EF] rounded-xl border-l-4 border-[#B8960C]">
                <p className="text-[#1A1A1A] font-medium mb-2">
                  Will Christians consistently engage with structured contemplative prayer?
                </p>
                <p className="text-[#6B6B6B] text-sm">
                  Testing the practice with real users to measure engagement and retention.
                </p>
              </div>
              <div className="p-6 bg-[#F5F3EF] rounded-xl border-l-4 border-[#B8960C]">
                <p className="text-[#1A1A1A] font-medium mb-2">
                  Does Sacred Center produce transformation?
                </p>
                <p className="text-[#6B6B6B] text-sm">
                  Gathering subjective reports on peace, focus, and spiritual growth.
                </p>
              </div>
              <div className="p-6 bg-[#F5F3EF] rounded-xl border-l-4 border-[#B8960C]">
                <p className="text-[#1A1A1A] font-medium mb-2">
                  Is there demand for faith-rooted spiritual training?
                </p>
                <p className="text-[#6B6B6B] text-sm">
                  Understanding the market before scaling.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contemplative Pause - Creative Element */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-[#B8960C]/60 text-sm tracking-widest uppercase mb-8">A Moment</p>
            <div className="flex justify-center mb-8">
              <BreathingCircle />
            </div>
            <p className="font-serif italic text-white/60 text-lg mt-16 max-w-md mx-auto">
              The journey begins with a breath. Take one now.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Scripture */}
      <ScriptureAnchor
        verse="For we walk by faith, not by sight."
        reference="2 Corinthians 5:7"
      />

      {/* The Invitation */}
      <section className="py-24 bg-[#F5F3EF]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-4">
              Be Part of the Founding
            </h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">
              This is not a newsletter signup. This is joining a movement from the beginning.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-2xl p-8 border border-[#E8DFC4] h-full">
                <h3 className="text-2xl font-serif text-[#1A1A1A] mb-6">What You Get</h3>
                <ul className="space-y-4">
                  {whatYouGet.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#B8960C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#B8960C]" />
                      </div>
                      <span className="text-[#6B6B6B]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-2xl p-8 border border-[#E8DFC4] h-full">
                <h3 className="text-2xl font-serif text-[#1A1A1A] mb-6">What We Ask</h3>
                <ul className="space-y-4">
                  {whatWeAsk.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#B8960C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 text-[#B8960C]" />
                      </div>
                      <span className="text-[#6B6B6B]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          {/* Email Capture */}
          <AnimatedSection delay={0.3}>
            <div className="max-w-2xl mx-auto">
              <EmailCapture variant="prominent" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <div className="bg-[#0A1628] text-white rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8960C] opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#B8960C]"></span>
                </span>
                <span className="text-[#B8960C] text-sm tracking-wider uppercase">Live Update</span>
              </div>
              <h3 className="text-2xl font-serif mb-4">Where We Are This Week</h3>
              <p className="text-white/80 leading-relaxed">
                Testing Sacred Center with 15 founding members. Iterating on the Divine Rhythm
                notification system. Gathering feedback on the morning practice flow.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
