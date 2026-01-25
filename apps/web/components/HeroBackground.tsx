'use client';

type HeroVariant = 'home' | 'vision' | 'problem' | 'journey' | 'about';

interface HeroBackgroundProps {
  variant?: HeroVariant;
  showLightRays?: boolean;
  showParticles?: boolean;
  showShimmer?: boolean;
  className?: string;
}

// White marble base with gold accents - unified clean look
const variantStyles: Record<HeroVariant, {
  gradient: string;
  primaryOrb: string;
  secondaryOrb: string;
  tertiaryOrb: string;
  accentOrb: string;
}> = {
  home: {
    gradient: 'from-white via-[#FDFCFA] to-[#FAF8F5]',
    primaryOrb: 'bg-[#B8960C]/12',
    secondaryOrb: 'bg-[#D4B85A]/10',
    tertiaryOrb: 'bg-[#B8960C]/6',
    accentOrb: 'bg-[#C9A820]/4',
  },
  vision: {
    gradient: 'from-white via-[#FDFCFB] to-[#FAF9F7]',
    primaryOrb: 'bg-[#B8960C]/10',
    secondaryOrb: 'bg-[#C9A820]/8',
    tertiaryOrb: 'bg-[#D4B85A]/5',
    accentOrb: 'bg-[#B8960C]/3',
  },
  problem: {
    gradient: 'from-white via-[#FCFCFC] to-[#F8F8F6]',
    primaryOrb: 'bg-[#B8960C]/8',
    secondaryOrb: 'bg-[#C9A820]/6',
    tertiaryOrb: 'bg-[#D4B85A]/4',
    accentOrb: 'bg-[#B8960C]/3',
  },
  journey: {
    gradient: 'from-white via-[#FDFCF9] to-[#FAF8F4]',
    primaryOrb: 'bg-[#B8960C]/11',
    secondaryOrb: 'bg-[#D4B85A]/9',
    tertiaryOrb: 'bg-[#C9A820]/6',
    accentOrb: 'bg-[#B8960C]/4',
  },
  about: {
    gradient: 'from-white via-[#FDFDFB] to-[#FAF9F6]',
    primaryOrb: 'bg-[#B8960C]/9',
    secondaryOrb: 'bg-[#C9A820]/7',
    tertiaryOrb: 'bg-[#D4B85A]/5',
    accentOrb: 'bg-[#B8960C]/3',
  },
};

export default function HeroBackground({
  variant = 'home',
  showLightRays = false,
  showParticles = true,
  showShimmer = true,
  className = '',
}: HeroBackgroundProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Clean white marble base */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient}`} />

      {/* Marble veining effect - very subtle white streaks */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 25% 25%, rgba(255, 255, 255, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 75%, rgba(255, 255, 255, 0.3) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 10%, rgba(255, 255, 255, 0.35) 0%, transparent 40%)
          `
        }}
      />

      {/* Tertiary orb - largest, background layer */}
      <div
        className={`
          absolute w-[1000px] h-[1000px] rounded-full blur-3xl
          ${styles.tertiaryOrb}
          breathing-tertiary
        `}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Accent orb - drifting gold accent */}
      <div
        className={`
          absolute w-[500px] h-[500px] rounded-full blur-2xl
          ${styles.accentOrb}
          breathing-accent
        `}
        style={{ top: '30%', left: '70%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Secondary orb - medium, offset */}
      <div
        className={`
          absolute w-[700px] h-[700px] rounded-full blur-2xl
          ${styles.secondaryOrb}
          breathing-secondary
        `}
        style={{ top: '45%', left: '40%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Primary orb - most visible gold glow */}
      <div
        className={`
          absolute w-[500px] h-[500px] rounded-full blur-xl
          ${styles.primaryOrb}
          breathing-primary
        `}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Gold shimmer spots */}
      {showShimmer && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-2 h-2 rounded-full bg-[#B8960C]/30 shimmer"
            style={{ top: '20%', left: '25%' }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-[#D4B85A]/40 shimmer"
            style={{ top: '35%', left: '70%', animationDelay: '1s' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-[#B8960C]/35 shimmer"
            style={{ top: '60%', left: '15%', animationDelay: '2s' }}
          />
          <div
            className="absolute w-2 h-2 rounded-full bg-[#C9A820]/25 shimmer"
            style={{ top: '75%', left: '80%', animationDelay: '0.5s' }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-[#B8960C]/30 shimmer"
            style={{ top: '45%', left: '85%', animationDelay: '1.5s' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-[#D4B85A]/35 shimmer"
            style={{ top: '15%', left: '60%', animationDelay: '2.5s' }}
          />
        </div>
      )}

      {/* Light rays - rotating divine light */}
      {showLightRays && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[900px] h-[900px] light-ray opacity-[0.04]">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <div
                key={angle}
                className="absolute top-1/2 left-1/2 w-[3px] h-[450px] bg-gradient-to-b from-[#B8960C] via-[#D4B85A]/50 to-transparent"
                style={{
                  transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                  transformOrigin: 'bottom center'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Floating gold particles */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Row 1 - top area */}
          <div
            className="absolute w-1 h-1 rounded-full bg-[#B8960C]/50 particle"
            style={{ left: '10%', top: '25%' }}
          />
          <div
            className="absolute w-0.5 h-0.5 rounded-full bg-[#D4B85A]/45 particle particle-delayed-2"
            style={{ left: '25%', top: '20%' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-[#C9A820]/40 particle particle-delayed-4"
            style={{ left: '55%', top: '15%' }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-[#B8960C]/35 particle particle-delayed-1"
            style={{ left: '80%', top: '22%' }}
          />
          {/* Row 2 - upper middle */}
          <div
            className="absolute w-0.5 h-0.5 rounded-full bg-[#D4B85A]/50 particle particle-delayed-3"
            style={{ left: '18%', top: '40%' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-[#B8960C]/45 particle"
            style={{ left: '42%', top: '35%' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-[#C9A820]/40 particle particle-delayed-2"
            style={{ left: '68%', top: '38%' }}
          />
          <div
            className="absolute w-0.5 h-0.5 rounded-full bg-[#B8960C]/50 particle particle-delayed-4"
            style={{ left: '92%', top: '42%' }}
          />
          {/* Row 3 - middle */}
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-[#D4B85A]/35 particle particle-delayed-1"
            style={{ left: '8%', top: '55%' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-[#B8960C]/45 particle particle-delayed-3"
            style={{ left: '35%', top: '52%' }}
          />
          <div
            className="absolute w-0.5 h-0.5 rounded-full bg-[#C9A820]/50 particle"
            style={{ left: '58%', top: '58%' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-[#B8960C]/40 particle particle-delayed-2"
            style={{ left: '78%', top: '55%' }}
          />
          {/* Row 4 - lower middle */}
          <div
            className="absolute w-1 h-1 rounded-full bg-[#B8960C]/50 particle"
            style={{ left: '15%', top: '68%' }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-[#D4B85A]/45 particle particle-delayed-1"
            style={{ left: '30%', top: '72%' }}
          />
          <div
            className="absolute w-0.5 h-0.5 rounded-full bg-[#B8960C]/55 particle particle-delayed-4"
            style={{ left: '50%', top: '70%' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-[#C9A820]/40 particle particle-delayed-3"
            style={{ left: '72%', top: '65%' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-[#B8960C]/45 particle particle-delayed-2"
            style={{ left: '88%', top: '70%' }}
          />
          {/* Row 5 - bottom area */}
          <div
            className="absolute w-0.5 h-0.5 rounded-full bg-[#D4B85A]/50 particle particle-delayed-2"
            style={{ left: '12%', top: '85%' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-[#B8960C]/40 particle particle-delayed-4"
            style={{ left: '38%', top: '88%' }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-[#C9A820]/35 particle particle-delayed-1"
            style={{ left: '62%', top: '82%' }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-[#B8960C]/50 particle particle-delayed-3"
            style={{ left: '85%', top: '85%' }}
          />
        </div>
      )}

      {/* Subtle marble texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
