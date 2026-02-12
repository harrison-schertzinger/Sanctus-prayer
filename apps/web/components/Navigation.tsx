'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/#problem', label: 'The Problem' },
  { href: '/#vision', label: 'Vision' },
  { href: '/#journey', label: 'The Journey' },
  { href: '/#about', label: 'About' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we're on the homepage and the link is a hash link, scroll smoothly
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAFAF8]/80 backdrop-blur-lg shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group flex items-center gap-3">
            <Image
              src="/images/logo-gold.png"
              alt="Sanctus"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div className="flex flex-col">
              <span className="text-xl font-serif tracking-[0.2em] text-[#0A1628] leading-tight">
                SANCTUS
              </span>
              <span className="text-[10px] tracking-[0.15em] text-[#6B6B6B] uppercase">
                Health & Performance
              </span>
            </div>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B8960C] transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative group"
              >
                <span className="text-sm tracking-wide transition-colors duration-300 text-[#6B6B6B] hover:text-[#1A1A1A]">
                  {link.label}
                </span>
                <span className="absolute -bottom-1 left-0 h-[1px] bg-[#B8960C] transition-all duration-300 w-0 group-hover:w-full" />
              </a>
            ))}
            <a
              href="/#join"
              onClick={(e) => handleNavClick(e, '/#join')}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Join the Waitlist
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#1A1A1A]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-[#1A1A1A]/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-[#FAFAF8] shadow-2xl"
            >
              <div className="pt-8 px-8">
                {/* Mobile logo */}
                <Link href="/" className="flex items-center gap-3 mb-10">
                  <Image
                    src="/images/logo-gold.png"
                    alt="Sanctus"
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                  <div className="flex flex-col">
                    <span className="font-serif tracking-[0.15em] text-[#0A1628] leading-tight">SANCTUS</span>
                    <span className="text-[9px] tracking-[0.12em] text-[#6B6B6B] uppercase">
                      Health & Performance
                    </span>
                  </div>
                </Link>
                <div className="flex flex-col gap-6">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-xl font-serif text-[#1A1A1A]"
                      >
                        {link.label}
                      </a>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    <a
                      href="/#join"
                      onClick={(e) => handleNavClick(e, '/#join')}
                      className="btn-primary inline-block text-center"
                    >
                      Join the Waitlist
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
