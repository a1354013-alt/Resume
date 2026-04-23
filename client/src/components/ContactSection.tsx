import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

interface ContactLink {
  label: string;
  url: string;
  icon: string;
  color: string;
}

const contactLinks: ContactLink[] = [
  {
    label: "Email",
    url: `mailto:${profile.contact.email}`,
    icon: "✉️",
    color: "hover:text-cyan-400",
  },
  {
    label: "GitHub",
    url: profile.contact.github,
    icon: "GitHub",
    color: "hover:text-purple-400",
  },
  {
    label: "LinkedIn",
    url: profile.contact.linkedin,
    icon: "in",
    color: "hover:text-blue-400",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const rippleIdRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastMouseEventRef = useRef<MouseEvent | null>(null);
  const timeoutIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const createRipple = (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInSection = e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!isInSection) return;

      // Keep this effect visually subtle; avoid high-frequency React state churn.
      if (Math.random() > 0.95) {
        const id = rippleIdRef.current++;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setRipples(prev => [...prev, { id, x, y }]);

        const timeoutId = window.setTimeout(() => {
          timeoutIdsRef.current.delete(timeoutId);
          setRipples(prev => prev.filter(r => r.id !== id));
        }, 1000);
        timeoutIdsRef.current.add(timeoutId);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMouseEventRef.current = e;
      if (rafIdRef.current != null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const last = lastMouseEventRef.current;
        if (last) createRipple(last);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      timeoutIdsRef.current.forEach(id => window.clearTimeout(id));
      timeoutIdsRef.current.clear();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-black via-slate-950 to-black py-20 px-4 overflow-hidden"
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: "20px",
            height: "20px",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="absolute inset-0 rounded-full border border-cyan-400/50"
            style={{
              animation: "ripple 1s ease-out forwards",
            }}
          />
        </div>
      ))}

      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-5xl md:text-6xl font-bold mb-4 glow-text"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            聯絡 | Contact
          </h2>
          <p className="font-mono text-cyan-400 text-lg">
            讓我們把想法變成可交付的成品。
          </p>
        </div>

        {/* Message */}
        <div className="text-center max-w-2xl mb-16">
          <p className="font-mono text-indigo-200 text-lg mb-4">
            {profile.contactMessage.line1}
          </p>
          <p className="font-mono text-cyan-300 text-lg">
            {profile.contactMessage.line2}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {contactLinks.map(link => {
            const isExternal = /^https?:\/\//i.test(link.url);
            const target = isExternal ? "_blank" : undefined;
            const rel = isExternal ? "noopener noreferrer" : undefined;
            const referrerPolicy = isExternal ? "no-referrer" : undefined;

            return (
              <a
                key={link.label}
                href={link.url}
                target={target}
                rel={rel}
                referrerPolicy={referrerPolicy}
                className={`group relative transition-all duration-300 ${link.color}`}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />

                <div className="flex flex-col items-center gap-2 px-6 py-4 border border-cyan-500/30 group-hover:border-cyan-400/60 rounded-lg transition-all duration-300 backdrop-blur-sm">
                  <span className="text-3xl">{link.icon}</span>
                  <span className="font-mono text-sm font-medium">
                    {link.label}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="font-mono text-sm text-slate-400 mb-4">
            © {new Date().getFullYear()} {profile.name} ·{" "}
            {profile.footer.tagline}
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
            <div
              className="w-1 h-1 rounded-full bg-purple-500 animate-pulse"
              style={{ animationDelay: "0.3s" }}
            />
            <div
              className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse"
              style={{ animationDelay: "0.6s" }}
            />
          </div>
        </div>
      </div>

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
