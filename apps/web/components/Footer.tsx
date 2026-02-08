'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white">
      {/* Gold gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#B8960C]/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Scripture anchor */}
        <div className="text-center mb-12">
          <p className="font-serif italic text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            &ldquo;Do not be conformed to this world, but be transformed by the renewal of your mind.&rdquo;
          </p>
          <p className="text-[#B8960C]/60 text-sm mt-3">— Romans 12:2</p>
        </div>

        {/* Main footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
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
              <p className="text-white/40 text-sm">Train Your Mind. Transform Your Life.</p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-8 text-sm text-white/60">
            <Link href="/vision" className="hover:text-[#B8960C] transition-colors duration-300">
              Vision
            </Link>
            <Link href="/problem" className="hover:text-[#B8960C] transition-colors duration-300">
              Problem
            </Link>
            <Link href="/journey" className="hover:text-[#B8960C] transition-colors duration-300">
              Journey
            </Link>
            <Link href="/about" className="hover:text-[#B8960C] transition-colors duration-300">
              About
            </Link>
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
