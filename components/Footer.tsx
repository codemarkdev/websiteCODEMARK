"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
// import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  // const socialIconsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Solo animamos Y, NO opacity ---
      gsap.from(footerRef.current, {
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
        },
      });

      // ----- ANIMACIÓN DE ICONOS SOCIALES DESACTIVADA -----
      /*
      socialIconsRef.current.forEach((icon, index) => {
        if (!icon) return;

        gsap.from(icon, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".social-links",
            start: "top bottom",
          },
        });

        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.2,
            rotate: 360,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.3,
            ease: "power2.in",
          });
        });
      });
      */
    }, footerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x,
          y: y,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    const footer = footerRef.current;
    footer?.addEventListener("mousemove", handleMouseMove);
    return () => footer?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // SSR/Next.js safe
    if (typeof window === "undefined" || !particlesRef.current) return;

    // Limpiar partículas viejas antes de agregar nuevas
    particlesRef.current.innerHTML = "";

    const particles = Array.from({ length: 30 }).map(() => {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 bg-primary/20 rounded-full";
      return particle;
    });

    particles.forEach((particle) => {
      particlesRef.current?.appendChild(particle);
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * 500,
        scale: Math.random() * 0.5 + 0.5,
      });
      animateParticle(particle);
    });

    function animateParticle(particle: HTMLElement) {
      gsap.to(particle, {
        y: "+=100",
        x: "+=50",
        duration: Math.random() * 2 + 2, // random(2, 4)
        repeat: -1,
        ease: "none",
        yoyo: true,
      });
    }

    // Limpieza
    return () => {
      if (particlesRef.current) {
        particlesRef.current.innerHTML = "";
      }
    };
  }, []);

  // ----- REDES SOCIALES DESACTIVADAS -----
  /*
  const socialLinks = [
    { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { Icon: Github, href: "https://github.com", label: "GitHub" },
  ];
  */

  return (
    <footer
      ref={footerRef}
      className="relative bg-card text-card-foreground py-8 px-6 overflow-hidden isolation-isolate"
    >
      {/* Partículas animadas */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none z-10"
      ></div>

      {/* Glow efecto */}
      <div
        ref={glowRef}
        className="absolute w-[200px] h-[200px] bg-radial-gradient from-primary/10 to-transparent rounded-full pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2"
      ></div>

      <div className="relative max-w-6xl mx-auto z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-primary">CodeMark</h2>
            <p className="text-muted-foreground">
              Transformando ideas en realidad digital
            </p>
          </div>

          {/* REDES SOCIALES DESACTIVADAS
          <div className="social-links flex gap-6 justify-center md:justify-end flex-1 order-2 md:order-3">
            {socialLinks.map(({ Icon, href, label }, index) => (
              <Link
                key={label}
                href={href}
                className="text-foreground hover:text-primary transition-colors duration-300"
                aria-label={label}
                ref={(el) => { socialIconsRef.current[index] = el; }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
          */}

          <div className="text-muted-foreground text-sm text-center flex-1 order-3 md:order-2">
            <p>
              Hecho en El Salvador. Todos los derechos reservados &copy; 2025 CodeMark
            </p>
          </div>
        </div>
      </div>

      {/* Gradient radial global para el glow */}
      <style jsx global>{`
        .bg-radial-gradient {
          background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 70%);
        }
      `}</style>
    </footer>
  );
}
