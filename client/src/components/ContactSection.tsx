import { ReactNode, useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

interface ContactLink {
  label: string;
  url: string;
  icon: ReactNode;
}

const contactLinks: ContactLink[] = [
  {
    label: "Email",
    url: `mailto:${profile.contact.email}`,
    icon: <Mail className="w-10 h-10 text-cyan-300" />,
  },
  {
    label: "GitHub",
    url: profile.contact.github,
    icon: <Github className="w-10 h-10 text-cyan-300" />,
  },
  {
    label: "LinkedIn",
    url: profile.contact.linkedin,
    icon: <Linkedin className="w-10 h-10 text-cyan-300" />,
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
            className="absolute inset-0 rounded-full border border-cyan-400/45"
            style={{ animation: "ripple 1s ease-out forwards" }}
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
        <div className="text-center mb-10">
          <h2
            className="text-5xl md:text-6xl font-bold mb-4 glow-text"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            聯絡方式 <span className="text-slate-300">Contact</span>
          </h2>
          <p className="font-mono text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {profile.contactMessage.line1}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-14">
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
                className="group relative block transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/18 to-purple-500/18 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />

                <div className="flex flex-col items-center justify-center gap-3 w-full max-w-xs min-w-[12rem] px-6 py-6 border border-cyan-500/20 rounded-3xl bg-slate-950/90 text-slate-100 shadow-sm transition-all duration-300 hover:border-cyan-400/55 hover:bg-slate-900/95 hover:shadow-cyan-500/10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900/70">
                    {link.icon}
                  </div>
                  <span className="font-mono text-sm font-medium tracking-wide">
                    {link.label}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {profile.contactMessage.hashtags.map(tag => (
            <span
              key={tag}
              className="font-mono text-sm text-cyan-300 border border-cyan-500/25 rounded-full px-4 py-2 bg-cyan-500/5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="text-center">
          <p className="font-mono text-sm text-slate-400 mb-4">
            © {new Date().getFullYear()} {profile.name} · {profile.footer.tagline}
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
