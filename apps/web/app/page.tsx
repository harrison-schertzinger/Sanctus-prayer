'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import HeroBackground from '@/components/HeroBackground';
import EmailCapture from '@/components/EmailCapture';
import Image from 'next/image';

const problemCards = [
  {
    number: '01',
    title: 'Optimized Body, Neglected Soul',
    description:
      'The health and performance world tracks every biomarker, optimizes every macronutrient, and quantifies every rep. Your wearable tracks your heart rate but not your inner life. That\'s an incomplete picture of human performance.',
  },
  {
    number: '02',
    title: 'Reactive, Not Restorative',
    description:
      'Most people only pray in crisis. A death. A diagnosis. A breaking point. Prayer was never designed to be an emergency response — it\'s a daily restorative practice. We lost the discipline and kept the desperation.',
  },
  {
    number: '03',
    title: 'Borrowed Practice, Stripped Theology',
    description:
      'Secular wellness took contemplative prayer, removed Christ, and repackaged it as mindfulness. The breathing techniques, the silence, the centering — all originated in the Christian monastic tradition. We\'re restoring the source.',
  },
  {
    number: '04',
    title: 'Passive Tracking, No Intervention',
    description:
      'Existing wearables are passive monitors. They measure but don\'t intervene. Sanctus is the first wearable designed for active restoration — establishing daily contemplative prayer as a restorative practice woven through your entire life.',
  },
];

const touchpoints = [
  {
    time: 'Morning',
    title: 'Morning Reading',
    description:
      'Start the day with Scripture and intention. A brief reading through the companion app to orient your mind before the world demands your attention.',
    icon: '☀',
  },
  {
    time: 'Midday',
    title: 'Sacred Center',
    description:
      'A guided centering prayer session. The band monitors your stress response while the companion app guides you back to stillness. A contemplative intervention in the middle of your day.',
    icon: '◆',
  },
  {
    time: 'Afternoon',
    title: 'Divine Rhythm',
    description:
      'The band pulses gently throughout the day — a tactile call to return to prayer. Structured practice rooted in the ancient rhythms of the Church, deepening across 40 days.',
    icon: '◐',
  },
  {
    time: 'Night',
    title: 'Night Prayer',
    description:
      'Close the day in gratitude and examination. Compline — the final prayer of the monastic day — adapted for modern life. Review your biometric trends and your practice in one view.',
    icon: '☽',
  },
];

export default function Home() {
  return (
    <main className="page-transition">
      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground variant="home" showLightRays={true} showParticles={true} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#B8960C] font-medium tracking-[0.2em] text-sm mb-6 uppercase"
          >
            The Wearable That Establishes a Life of Prayer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#0A1628] mb-6 tracking-tight"
          >
            Pray Through Lent
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#6B6B6B] mb-10 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Sanctus is a wellness wearable and companion app rooted in 2,000 years of contemplative tradition &mdash; designed for the modern pursuit of health and performance. Our founding test cohort is wearing the prototype band through 40 days of Lent. Join the waitlist for what&apos;s next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl mx-auto mb-8"
          >
            <EmailCapture buttonText="Join the Waitlist" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-serif italic text-[#6B6B6B] text-lg"
          >
            Lent begins February 18th. Our founding 10 are already in. Be next.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#problem"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-full border border-[#B8960C]/30 flex items-center justify-center"
          >
            <ArrowDown size={16} className="text-[#B8960C]/50" />
          </motion.a>
        </motion.div>
      </section>

      {/* ==========================================
          THE PROBLEM
          ========================================== */}
      <section id="problem" className="py-24 md:py-32 bg-[#F5F3EF]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">The Problem</p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-6 max-w-3xl">
              The West Abandoned Its Contemplative Tradition
            </h2>
            <p className="text-[#6B6B6B] text-lg max-w-2xl leading-relaxed">
              We optimize everything &mdash; sleep, nutrition, training, recovery &mdash; and neglect the soul. Your wearable tracks every biomarker but ignores the most important one: the state of your interior life.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {problemCards.map((card, index) => (
              <AnimatedSection key={card.number} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-8 border border-[#E8DFC4] h-full shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="text-5xl font-serif text-[#B8960C]/15 block mb-4 leading-none">
                    {card.number}
                  </span>
                  <h3 className="text-xl font-serif text-[#1A1A1A] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          THE VISION
          ========================================== */}
      <section id="vision" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">The Vision</p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-6 max-w-3xl">
              A Wellness Wearable That Restores, Not Just Records
            </h2>
            <p className="text-[#6B6B6B] text-lg max-w-2xl leading-relaxed">
              Sanctus is building a complete wellness ecosystem &mdash; band, companion app, and community &mdash; rooted in the most time-tested restorative practice in human history: contemplative prayer.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* The Band */}
            <AnimatedSection delay={0.1}>
              <div className="bg-[#F5F3EF] rounded-2xl p-8 md:p-10 border border-[#E8DFC4] h-full">
                <p className="text-[#B8960C] text-xs tracking-widest uppercase font-semibold mb-4">
                  The Band
                </p>
                <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4">
                  A Wearable That Intervenes, Not Just Monitors
                </h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  24/7 bio-monitoring combined with active touch therapy for stress response. Pulse patterns that guide you back to center. Your prayer life and your physiology connected for the first time. Other wearables give you data. Sanctus gives you a practice.
                </p>
              </div>
            </AnimatedSection>

            {/* The Companion App */}
            <AnimatedSection delay={0.2}>
              <div className="bg-[#F5F3EF] rounded-2xl p-8 md:p-10 border border-[#E8DFC4] h-full">
                <p className="text-[#B8960C] text-xs tracking-widest uppercase font-semibold mb-4">
                  The Companion App
                </p>
                <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4">
                  Your Dashboard for Daily Formation
                </h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  Daily guided contemplative prayer, Scripture readings, progress tracking, and biometric insights from the band. The companion app makes the band intelligent and personal &mdash; a growing content library and data dashboard that deepens across your 40-day journey.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Positioning Statement */}
          <AnimatedSection delay={0.3} className="mt-16">
            <div className="text-center py-12 border-t border-[#E8DFC4]">
              <p className="text-2xl md:text-3xl font-serif text-[#1A1A1A] max-w-2xl mx-auto leading-relaxed">
                Whoop owns performance. Oura owns sleep.{' '}
                <span className="text-[#B8960C]">Sanctus owns the soul.</span>{' '}
                The intersection of faith, health, and performance is unoccupied. We&apos;re building the wearable that fills it.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==========================================
          THE JOURNEY
          ========================================== */}
      <section id="journey" className="py-24 md:py-32 bg-[#F5F3EF]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">The Journey</p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-6 max-w-3xl">
              40 Days. 4 Daily Touchpoints. Band on Your Wrist.
            </h2>
            <p className="text-[#6B6B6B] text-lg max-w-2xl leading-relaxed">
              The Sanctus band and companion app guide you through a 40-day contemplative prayer journey &mdash; structured around the Liturgy of the Hours that monastics have practiced since the 4th century. The band is on your wrist through all of it &mdash; monitoring, intervening, connecting your physiology to your practice.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {touchpoints.map((tp, index) => (
              <AnimatedSection key={tp.title} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-8 border border-[#E8DFC4] text-center h-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <span className="text-3xl block mb-4" aria-hidden="true">{tp.icon}</span>
                  <p className="text-[#B8960C] text-xs tracking-widest uppercase font-semibold mb-3">
                    {tp.time}
                  </p>
                  <h3 className="text-lg font-serif text-[#1A1A1A] mb-3">{tp.title}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{tp.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Stats */}
          <AnimatedSection delay={0.4} className="mt-16">
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
              <div>
                <p className="text-4xl md:text-5xl font-serif text-[#B8960C] leading-none mb-2">40</p>
                <p className="text-sm text-[#6B6B6B] uppercase tracking-wider font-medium">Days of Formation</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-serif text-[#B8960C] leading-none mb-2">160</p>
                <p className="text-sm text-[#6B6B6B] uppercase tracking-wider font-medium">Guided Sessions</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-serif text-[#B8960C] leading-none mb-2">4</p>
                <p className="text-sm text-[#6B6B6B] uppercase tracking-wider font-medium">Daily Touchpoints</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==========================================
          ABOUT
          ========================================== */}
      <section id="about" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">About</p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
              The Mission Behind Sanctus
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mt-12">
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col md:flex-row gap-10 items-start">
                {/* Founder Photo */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#E8DFC4] mx-auto md:mx-0">
                  <Image
                    src="/images/founder/founder.jpg"
                    alt="Harrison Schertzinger, Founder of Sanctus"
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                    quality={85}
                  />
                </div>

                {/* Bio */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] mb-1 text-center md:text-left">
                    Harrison Schertzinger
                  </h3>
                  <p className="text-[#B8960C] font-medium text-sm mb-6 text-center md:text-left">
                    Founder, Sanctus Health &amp; Performance
                  </p>
                  <p className="text-[#6B6B6B] leading-relaxed mb-4">
                    Author of <em>The Angel in the Marble</em>. Co-host of The Infinite Game Podcast. Multi-company founder in health and performance. Harrison built Sanctus because the thing he needed most didn&apos;t exist &mdash; a wearable that treated prayer with the same seriousness the performance world gives to sleep, nutrition, and training.
                  </p>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    The team is building at the intersection of ancient tradition and modern technology. The mission: restore contemplative prayer to daily life in the modern West &mdash; through a wearable you never take off.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Mission Quote */}
            <AnimatedSection delay={0.2} className="mt-12">
              <div className="bg-[#F5F3EF] rounded-2xl p-8 md:p-12 border border-[#E8DFC4] text-center">
                <p className="text-xl md:text-2xl font-serif italic text-[#1A1A1A] leading-relaxed max-w-2xl mx-auto">
                  &ldquo;Restore contemplative prayer as a daily practice in the modern West. That&apos;s the mission. Everything we build serves it.&rdquo;
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ==========================================
          BOTTOM CTA
          ========================================== */}
      <section id="join" className="py-24 md:py-32 bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">Join Sanctus</p>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
              Lent Begins February 18th
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Our founding cohort is wearing the Sanctus band through 40 days of Lent. The companion app is live. The prototype is on wrists. Join the waitlist to be next.
            </p>
            <div className="max-w-xl mx-auto">
              <EmailCapture buttonText="Join the Waitlist" variant="dark" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
