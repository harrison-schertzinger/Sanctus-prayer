'use client';

import { useEffect, useState } from 'react';

export default function BreathingOrb() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Main breathing orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full breathing"
        style={{
          background: 'radial-gradient(circle, rgba(184, 150, 12, 0.08) 0%, rgba(184, 150, 12, 0.02) 50%, transparent 70%)',
        }}
      />

      {/* Secondary subtle orb */}
      <div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full breathing"
        style={{
          background: 'radial-gradient(circle, rgba(184, 150, 12, 0.04) 0%, transparent 60%)',
          animationDelay: '2s',
        }}
      />

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#B8960C]/20 floating" style={{ animationDelay: '0s' }} />
      <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#B8960C]/15 floating" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-[#B8960C]/10 floating" style={{ animationDelay: '4s' }} />
    </div>
  );
}
