'use client';

import Image from 'next/image';
import { ArrowRight, Mail } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ScriptureAnchor from '@/components/ScriptureAnchor';
import HeroBackground from '@/components/HeroBackground';

export default function AboutPage() {
  return (
    <main className="page-transition">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center pt-24 overflow-hidden">
        <HeroBackground variant="about" showParticles={true} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">MEET THE FOUNDER</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] mb-6 leading-tight">
              Harrison Schertzinger
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Photo and Bio */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <AnimatedSection direction="left">
              <div className="relative max-w-md mx-auto">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/images/founder/founder.jpg"
                    alt="Harrison Schertzinger, Founder of Sanctus Health & Performance"
                    fill
                    className="object-cover"
                    quality={85}
                  />
                </div>
                <div className="absolute -inset-2 border border-[#B8960C]/20 rounded-2xl -z-10" />
              </div>
            </AnimatedSection>

            {/* Bio */}
            <AnimatedSection delay={0.2}>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#6B6B6B] leading-relaxed mb-6">
                  Author of <em>The Angel in the Marble</em>. Co-host of The Infinite Game Podcast. Multi-company founder in health and performance.
                </p>
                <p className="text-[#6B6B6B] leading-relaxed mb-6">
                  Harrison built Sanctus because the thing he needed most didn&apos;t exist &mdash; a wearable that treated prayer with the same seriousness the performance world gives to sleep, nutrition, and training. Not a content app. Not another notification. A wearable you never take off that actively restores the interior life.
                </p>
                <p className="text-[#6B6B6B] leading-relaxed mb-6">
                  He discovered contemplative prayer through the ancient practices of the Desert Fathers, the hesychasts, and the great Christian mystics. These men and women practiced a form of daily structured prayer that transformed everything &mdash; and the modern West had almost entirely abandoned it.
                </p>
                <p className="text-[#1A1A1A] leading-relaxed font-medium">
                  Sanctus is his response: restore contemplative prayer to daily life through technology that makes the ancient practice tangible, measurable, and undeniable.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center">
              <blockquote className="relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl text-[#B8960C]/20 font-serif leading-none">
                  &ldquo;
                </div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-[#1A1A1A] leading-relaxed pt-8 max-w-3xl mx-auto">
                  Sanctus is a wellness wearable company restoring contemplative prayer as a restorative practice. That&apos;s it. Everything we build serves that mission.
                </p>
                <p className="mt-6 text-[#B8960C]">&mdash; Harrison Schertzinger</p>
              </blockquote>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why This Exists */}
      <section className="py-24 bg-[#F5F3EF]">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-8">
              Why Sanctus Exists
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="prose prose-lg max-w-none">
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                The wearable industry tracks everything external &mdash; heart rate, sleep stages, step counts, blood oxygen &mdash; while ignoring the interior life entirely. Meanwhile, millions of Christians feel the gap between their faith and their daily practice widening.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                Sanctus bridges that gap with hardware. A band on your wrist that doesn&apos;t just measure your body but actively intervenes &mdash; guiding you back to prayer, connecting your physiology to your practice, and establishing contemplative prayer as a daily restorative discipline.
              </p>
              <p className="text-[#1A1A1A] leading-relaxed font-medium">
                The team is building at the intersection of ancient tradition and modern technology. The mission: restore contemplative prayer to daily life in the modern West &mdash; through a wearable you never take off.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Scripture */}
      <ScriptureAnchor
        verse="And we all, with unveiled face, beholding the glory of the Lord, are being transformed into the same image from one degree of glory to another."
        reference="2 Corinthians 3:18"
      />

      {/* Contact */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-8 text-center">
              Get in Touch
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-[#F5F3EF] rounded-2xl p-8 md:p-12 text-center">
              <a
                href="mailto:harrison@sanctusprayer.com"
                className="inline-flex items-center gap-3 text-lg text-[#1A1A1A] hover:text-[#B8960C] transition-colors mb-8"
              >
                <Mail size={20} />
                harrison@sanctusprayer.com
              </a>

              <div className="gold-line w-24 mx-auto" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
              Experience Sanctus
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Our founding cohort is wearing the band through Lent. Join the waitlist to be next.
            </p>
            <a
              href="/#join"
              className="inline-flex items-center gap-2 bg-[#B8960C] text-white font-medium px-8 py-4 rounded-lg hover:bg-[#A3850B] transition-colors"
            >
              Join the Waitlist
              <ArrowRight size={18} />
            </a>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
