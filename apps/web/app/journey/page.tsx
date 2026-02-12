'use client';

import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import EmailCapture from '@/components/EmailCapture';
import ScriptureAnchor from '@/components/ScriptureAnchor';
import BreathingCircle from '@/components/BreathingCircle';
import HeroBackground from '@/components/HeroBackground';

export default function JourneyPage() {
  return (
    <main className="page-transition">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center pt-24 overflow-hidden">
        <HeroBackground variant="journey" showParticles={true} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] mb-6 leading-tight">
              40 Days of Lent. Band on Your Wrist.
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed max-w-3xl">
              The Sanctus band and companion app guide you through a 40-day contemplative prayer journey &mdash; structured around the ancient liturgical rhythms of the Church.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* The 40-Day Experience */}
      <section className="py-24 bg-[#F5F3EF]">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#B8960C] text-sm tracking-wider uppercase mb-4">The Experience</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-4">
              Four Daily Touchpoints
            </h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto">
              Each day is structured around four prayer sessions delivered through the companion app, with the band on your wrist &mdash; monitoring, intervening, connecting your physiology to your practice.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-2xl p-8 border border-[#E8DFC4]">
                <span className="text-2xl mb-3 block">☀</span>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">Morning Reading</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Start the day with Scripture and intention. A brief reading through the companion app to orient your mind before the world demands your attention.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-2xl p-8 border border-[#E8DFC4]">
                <span className="text-2xl mb-3 block">◆</span>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">Sacred Center</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  A guided centering prayer session. The band monitors your stress response while the companion app guides you into deep stillness before God.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-2xl p-8 border border-[#E8DFC4]">
                <span className="text-2xl mb-3 block">◐</span>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">Divine Rhythm</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  The band pulses gently throughout the day &mdash; a tactile call to return to prayer. Structured practice rooted in the ancient rhythms of the Church, deepening across 40 days.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="bg-white rounded-2xl p-8 border border-[#E8DFC4]">
                <span className="text-2xl mb-3 block">☽</span>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">Night Prayer</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Close the day in gratitude and examination. Compline &mdash; the final prayer of the monastic day &mdash; adapted for modern life. Review your biometric trends alongside your practice.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What the Founding Cohort Proves */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-wider uppercase mb-4">The Founding Cohort</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-8">
              What We&apos;re Proving
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              <div className="p-6 bg-[#F5F3EF] rounded-xl border-l-4 border-[#B8960C]">
                <p className="text-[#1A1A1A] font-medium mb-2">
                  Does wearable-guided contemplative prayer produce measurable change?
                </p>
                <p className="text-[#6B6B6B] text-sm">
                  Tracking biometric data alongside subjective reports on peace, focus, and spiritual formation across 40 days.
                </p>
              </div>
              <div className="p-6 bg-[#F5F3EF] rounded-xl border-l-4 border-[#B8960C]">
                <p className="text-[#1A1A1A] font-medium mb-2">
                  Will people wear the band and engage consistently?
                </p>
                <p className="text-[#6B6B6B] text-sm">
                  Testing daily engagement, retention, and adherence to the four-touchpoint structure with the founding 10.
                </p>
              </div>
              <div className="p-6 bg-[#F5F3EF] rounded-xl border-l-4 border-[#B8960C]">
                <p className="text-[#1A1A1A] font-medium mb-2">
                  Is there real demand for faith-rooted wellness wearables?
                </p>
                <p className="text-[#6B6B6B] text-sm">
                  Understanding the market with real user data before scaling production.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contemplative Pause */}
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
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-4">
              Be Next
            </h2>
            <p className="text-[#6B6B6B] max-w-2xl mx-auto mb-10">
              Our founding cohort is wearing the band through Lent. The companion app is live. Join the waitlist to experience Sanctus when the next cohort opens.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="max-w-xl mx-auto">
              <EmailCapture buttonText="Join the Waitlist" variant="prominent" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
