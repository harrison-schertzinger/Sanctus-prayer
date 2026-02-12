'use client';

import Link from 'next/link';
import Image from 'next/image';
import EmailCapture from '@/components/EmailCapture';

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white">
      {/* Gold gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#B8960C]/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Email capture */}
        <div className="max-w-xl mx-auto mb-16">
          <p className="text-center font-serif text-2xl text-white mb-3">
            Join the Waitlist
          </p>
          <p className="text-center text-white/50 text-sm mb-6">
            Be the first to know when Sanctus is available.
          </p>
          <EmailCapture buttonText="Join the Waitlist" variant="dark" />
        </div>

        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10">
          {/* Logo & tagline */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo-gold.png"
              alt="Sanctus"
              width={48}
              height={48}
              className="opacity-80"
            />
            <div>
              <p className="font-serif text-xl tracking-[0.15em]">SANCTUS</p>
              <p className="text-white/40 text-sm">Wellness Wearable for Health &amp; Performance</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-8 text-sm text-white/60">
            <a href="/#problem" className="hover:text-[#B8960C] transition-colors duration-300">
              The Problem
            </a>
            <a href="/#vision" className="hover:text-[#B8960C] transition-colors duration-300">
              Vision
            </a>
            <a href="/#journey" className="hover:text-[#B8960C] transition-colors duration-300">
              Journey
            </a>
            <a href="/#about" className="hover:text-[#B8960C] transition-colors duration-300">
              About
            </a>
            <Link href="/privacy" className="hover:text-[#B8960C] transition-colors duration-300">
              Privacy
            </Link>
            <Link href="/support" className="hover:text-[#B8960C] transition-colors duration-300">
              Support
            </Link>
          </nav>

          {/* Contact & copyright */}
          <div className="text-sm text-white/40 text-center md:text-right">
            <a
              href="mailto:harrison@sanctusprayer.com"
              className="hover:text-[#B8960C] transition-colors duration-300"
            >
              harrison@sanctusprayer.com
            </a>
            <p className="mt-1">&copy; 2026 Sanctus Health & Performance</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
