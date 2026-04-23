import { useRef, useEffect, useState } from 'react';
import { profile } from '@/data/profile';

/**
 * Contact Section - Signal
 * 
 * Design Philosophy: Deep Space Techno
 * - Ripple effect emanating from center
 * - Contact information with neon styling
 * - Social links with hover animations
 * - Represents sending signals from the core
 */

interface ContactLink {
  label: string;
  url: string;
  icon: string;
  color: string;
}

const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    url: `mailto:${profile.contact.email}`,
    icon: '✉️',
    color: 'hover:text-cyan-400',
  },
  {
    label: 'GitHub',
    url: profile.contact.github,
    icon: '🐙',
    color: 'hover:text-purple-400',
  },
  {
    label: 'LinkedIn',
    url: profile.contact.linkedin,
    icon: '💼',
    color: 'hover:text-blue-400',
  },
  {
    label: 'iThome',
    url: profile.contact.ithome,
    icon: '📰',
    color: 'hover:text-orange-400',
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInSection =
        e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (isInSection && Math.random() > 0.95) {
        const id = rippleIdRef.current++;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setRipples((prev) => [...prev, { id, x, y }]);

        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-black via-slate-950 to-black py-20 px-4 overflow-hidden"
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full border border-cyan-400/50"
            style={{
              animation: 'ripple 1s ease-out forwards',
            }}
          />
        </div>
      ))}

      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 glow-text" style={{ fontFamily: "'Orbitron', monospace" }}>
            聯絡 | 信號
          </h2>
          <p className="font-mono text-cyan-400 text-lg">
            從地心向外發送訊號
          </p>
        </div>

        {/* Contact message */}
        <div className="text-center max-w-2xl mb-16">
          <p className="font-mono text-indigo-200 text-lg mb-4">
            {profile.contactMessage.line1}
          </p>
          <p className="font-mono text-cyan-300 text-lg">
            {profile.contactMessage.line2}
          </p>
        </div>

        {/* Contact links */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative transition-all duration-300 ${link.color}`}
            >
              {/* Background glow */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />

              {/* Link content */}
              <div className="flex flex-col items-center gap-2 px-6 py-4 border border-cyan-500/30 group-hover:border-cyan-400/60 rounded-lg transition-all duration-300 backdrop-blur-sm">
                <span className="text-3xl">{link.icon}</span>
                <span className="font-mono text-sm font-medium">{link.label}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Footer message */}
        <div className="text-center">
          <p className="font-mono text-sm text-slate-400 mb-4">
            {profile.footer.copyright} · {profile.footer.tagline}
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
      </div>

      {/* CSS for ripple animation */}
      <style>{`
        @keyframes ripple {
          from {
            width: 20px;
            height: 20px;
            opacity: 1;
          }
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
