import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, BookOpen, Layers, Sparkles, Terminal } from 'lucide-react';
import gsap from 'gsap';
import DevTerminal from './DevTerminal';
import ConnectedTechNetwork from './ConnectedTechNetwork';
import { profile } from '../content/profile';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const terminalWrapperRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingTagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (typeof window === 'undefined' || !container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Main Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { y: -16, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, delay: 0.05, clearProps: 'opacity,transform' }
      )
        .fromTo(
          headlineRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, clearProps: 'opacity,transform' },
          '-=0.35'
        )
        .fromTo(
          subtitleRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, clearProps: 'opacity,transform' },
          '-=0.45'
        )
        .fromTo(
          actionsRef.current?.children ? Array.from(actionsRef.current.children) : [],
          { y: 12, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.07, clearProps: 'opacity,transform' },
          '-=0.35'
        )
        .fromTo(
          statsRef.current?.children ? Array.from(statsRef.current.children) : [],
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, clearProps: 'opacity,transform' },
          '-=0.3'
        )
        .fromTo(
          terminalWrapperRef.current,
          { y: 35, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.15)', clearProps: 'opacity,transform' },
          '-=0.55'
        );

      // Floating Tech Badges Sine Motion
      if (floatingTagsRef.current?.children) {
        Array.from(floatingTagsRef.current.children).forEach((tag, idx) => {
          gsap.to(tag, {
            y: idx % 2 === 0 ? -5 : 5,
            duration: 2.2 + idx * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }

      // 3D Terminal Mouse Parallax Interaction
      const handleMouseMove = (e: MouseEvent) => {
        if (!terminalWrapperRef.current) return;
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(terminalWrapperRef.current, {
          rotationY: x * 8,
          rotationX: -y * 8,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power1.out',
        });
      };

      const handleMouseLeave = () => {
        if (!terminalWrapperRef.current) return;
        gsap.to(terminalWrapperRef.current, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      };

      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave, { passive: true });

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={containerRef}>
      {/* Connected Tech Network Background Canvas */}
      <ConnectedTechNetwork />

      <div className="hero__content">
        <div className="hero__badge" ref={badgeRef}>
          <span className="hero__status-pulse" />
          <span className="hero__badge-text">
            Full-Stack Software Engineer &middot; Irving, Texas
          </span>
        </div>

        <h1 className="hero__title" ref={headlineRef}>
          Crafting resilient architectures &amp; <span className="hero__title-accent">high-performance web apps</span>.
        </h1>

        <p className="hero__subtitle" ref={subtitleRef}>
          Hi, I&apos;m <strong>{profile.name}</strong>. With 6+ years architecting C# .NET Core backends, distributed microservices, and reactive TypeScript/React interfaces, I build software engineered for speed, scale, and longevity.
        </p>

        {/* Floating tech pills */}
        <div className="hero__floating-tags" ref={floatingTagsRef}>
          <span className="hero-tag-pill hero-tag-pill--csharp">
            <Sparkles size={12} /> .NET 9 &amp; DDD Core
          </span>
          <span className="hero-tag-pill hero-tag-pill--react">
            <Code2 size={12} /> React 19 &amp; TanStack Query
          </span>
          <span className="hero-tag-pill hero-tag-pill--arch">
            <Layers size={12} /> CQRS &amp; MediatR
          </span>
          <span className="hero-tag-pill hero-tag-pill--cloud">
            <Terminal size={12} /> EF Core 9 &amp; Outbox
          </span>
        </div>

        <div className="hero__actions" ref={actionsRef}>
          <a href="#architecture" className="btn btn--primary">
            <Layers size={17} aria-hidden />
            <span>Explore Architecture</span>
            <ArrowRight size={16} aria-hidden />
          </a>
          <Link to="/blog" className="btn btn--secondary">
            <BookOpen size={17} aria-hidden />
            <span>Engineering Blog</span>
          </Link>
          <Link to="/projects" className="btn btn--outline">
            <Code2 size={17} aria-hidden />
            <span>Projects</span>
          </Link>
        </div>

        <div className="hero__stats" ref={statsRef}>
          <div className="hero__stat-card">
            <span className="hero__stat-value">6+</span>
            <span className="hero__stat-label">Years Experience</span>
          </div>
          <div className="hero__stat-card">
            <span className="hero__stat-value">.NET 9</span>
            <span className="hero__stat-label">Clean Arch &amp; CQRS</span>
          </div>
          <div className="hero__stat-card">
            <span className="hero__stat-value">React 19</span>
            <span className="hero__stat-label">TypeScript &amp; SPA</span>
          </div>
          <div className="hero__stat-card">
            <span className="hero__stat-value">14+</span>
            <span className="hero__stat-label">Tech Bulletins</span>
          </div>
        </div>
      </div>

      <div className="hero__terminal-wrapper" ref={terminalWrapperRef}>
        <div className="hero__terminal-glow" aria-hidden="true" />
        <DevTerminal />
      </div>
    </section>
  );
}
