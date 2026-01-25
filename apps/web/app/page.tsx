'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Eye, Map } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import CurrentlySection from '@/components/CurrentlySection';
import ScriptureAnchor from '@/components/ScriptureAnchor';
import HeroBackground from '@/components/HeroBackground';

const previewCards = [
  {
    icon: Eye,
    title: 'The Problem',
    description: 'Why the modern mind is under siege — and why secular solutions fall short.',
    href: '/problem',
  },
  {
    icon: BookOpen,
    title: 'The Vision',
    description: 'Ancient contemplative wisdom meets modern understanding of transformation.',
    href: '/vision',
  },
  {
    icon: Map,
    title: 'The Journey',
    description: 'Follow along as we build Sanctus in public. Join the founding members.',
    href: '/journey',
  },
];

export default function Home() {
  return (
    <main className="page-transition">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground variant="home" showLightRays={true} showParticles={true} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#B8960C] font-medium tracking-widest text-sm mb-6"
          >
            A SPIRITUAL TRAINING SYSTEM
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#0A1628] mb-6 tracking-tight"
          >
            Renew Your Mind
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#6B6B6B] mb-10 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Rooted in 2,000 years of Christian contemplative tradition.
            Follow along as we build it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link href="/journey" className="btn-primary flex items-center gap-2">
              Follow the Journey
              <ArrowRight size={18} />
            </Link>
            <Link href="/vision" className="btn-secondary">
              Learn More
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <CurrentlySection week={4} content="Testing with founding members in Cincinnati" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-[#B8960C]/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-[#B8960C]/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Scripture Anchor */}
      <ScriptureAnchor
        verse="Do not be conformed to this world, but be transformed by the renewal of your mind."
        reference="Romans 12:2"
      />

      {/* Preview Cards Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-4">
              The Story
            </h2>
            <p className="text-[#6B6B6B] max-w-xl mx-auto">
              Sanctus exists because there is a crisis, a vision, and a journey. Start anywhere.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {previewCards.map((card, index) => (
              <AnimatedSection key={card.title} delay={index * 0.15}>
                <Link href={card.href} className="block h-full">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="card p-8 h-full flex flex-col"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#B8960C]/10 flex items-center justify-center mb-6">
                      <card.icon className="w-6 h-6 text-[#B8960C]" />
                    </div>
                    <h3 className="text-2xl font-serif text-[#1A1A1A] mb-3">{card.title}</h3>
                    <p className="text-[#6B6B6B] flex-grow">{card.description}</p>
                    <div className="mt-6 flex items-center text-[#B8960C] text-sm font-medium">
                      Read more
                      <ArrowRight size={16} className="ml-2" />
                    </div>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-[#F5F3EF]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-[#B8960C] text-sm tracking-wider uppercase mb-4">Begin Here</p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A] mb-6">
              Ready to follow along?
            </h2>
            <p className="text-[#6B6B6B] text-lg mb-8 max-w-xl mx-auto">
              Join the founding members shaping the future of Christian spiritual training.
            </p>
            <Link href="/journey" className="btn-primary inline-flex items-center gap-2">
              Join the Journey
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
