'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, Instagram, Twitter, Linkedin } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ScriptureAnchor from '@/components/ScriptureAnchor';
import ReadingTime from '@/components/ReadingTime';
import HeroBackground from '@/components/HeroBackground';

export default function AboutPage() {
  return (
    <main className="page-transition">
      {/* Hero with living depth background */}
      <section className="relative min-h-[40vh] flex items-center pt-24 overflow-hidden">
        <HeroBackground variant="about" showParticles={true} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
          <AnimatedSection>
            <div className="mb-6">
              <ReadingTime minutes={4} />
            </div>
            <p className="text-[#B8960C] text-sm tracking-widest uppercase mb-4">MEET THE FOUNDER</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] mb-6 leading-tight">
              Harrison Schertzinger
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Photo and Bio - New layout */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <AnimatedSection direction="left">
              <div className="relative max-w-md mx-auto">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/images/founder/founder.jpg"
                    alt="Harrison Schertzinger, Founder of Sanctus"
                    fill
                    className="object-cover"
                    quality={85}
                  />
                </div>
                {/* Subtle gold border accent */}
                <div className="absolute -inset-2 border border-[#B8960C]/20 rounded-2xl -z-10" />
              </div>
            </AnimatedSection>

            {/* Bio */}
            <AnimatedSection delay={0.2}>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#6B6B6B] leading-relaxed mb-6">
                  My journey to Sanctus began in the depths of anxiety and spiritual stagnation.
                </p>
                <p className="text-[#6B6B6B] leading-relaxed mb-6">
                  Despite my faith, I found myself fragmented — successful on the outside, struggling
                  within. I knew all the right answers. I could quote the verses about peace and
                  presence. But my mind was a battleground of worry, distraction, and restlessness.
                </p>
                <p className="text-[#6B6B6B] leading-relaxed mb-6">
                  Then I discovered contemplative prayer.
                </p>
                <p className="text-[#6B6B6B] leading-relaxed mb-6">
                  Not the empty-your-mind meditation of Eastern traditions, but the ancient practices
                  of the Desert Fathers, the hesychasts, the great Christian mystics. These men and
                  women had discovered something — a way of being present to God that transformed
                  everything.
                </p>
                <p className="text-[#1A1A1A] leading-relaxed font-medium">
                  What I found changed me. And I can&apos;t keep it to myself.
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
                  God has given breadcrumbs to a beggar. Sanctus is my response — an invitation to
                  feast at a table that has been set for two thousand years.
                </p>
                <p className="mt-6 text-[#B8960C]">— Harrison Schertzinger</p>
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
                This is not about building a company. It&apos;s about equipping the saints.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                I believe there are millions of Christians who feel the same fragmentation I felt.
                They love God. They want more. But they don&apos;t know how to train their minds
                for the transformation Scripture promises.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">
                Sanctus is my attempt to bridge the gap — to take the ancient wisdom of the Church
                and make it accessible for modern life. To provide not just content, but a system.
                Not just information, but formation.
              </p>
              <p className="text-[#1A1A1A] leading-relaxed font-medium">
                The renewal of your mind is not a metaphor. It&apos;s a possibility. And I want to
                help you experience it.
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

              <div className="flex items-center justify-center gap-6 mb-8">
                <a href="#" className="text-[#6B6B6B] hover:text-[#B8960C] transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-[#6B6B6B] hover:text-[#B8960C] transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-[#6B6B6B] hover:text-[#B8960C] transition-colors">
                  <Linkedin size={24} />
                </a>
              </div>

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
              Ready to follow along?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Join the founding members and be part of building something meaningful.
            </p>
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 bg-[#B8960C] text-white font-medium px-8 py-4 rounded-lg hover:bg-[#A3850B] transition-colors"
            >
              Join the Journey
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
