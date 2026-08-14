import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TechLogoItem {
  id: string;
  name: string;
  src: string;
  color: string;
  glow: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  size: number; // px
  floatRange: number;
  duration: number;
}

export default function FloatingTechLogos() {
  const containerRef = useRef<HTMLDivElement>(null);

  const techLogos: TechLogoItem[] = [
    {
      id: 'dotnet',
      name: '.NET 9',
      src: '/logos/dotnet.svg',
      color: '#512bd4',
      glow: 'rgba(81, 43, 212, 0.25)',
      x: 8,
      y: 16,
      size: 48,
      floatRange: 18,
      duration: 5.5,
    },
    {
      id: 'csharp',
      name: 'C#',
      src: '/logos/csharp.svg',
      color: '#239120',
      glow: 'rgba(35, 145, 32, 0.25)',
      x: 88,
      y: 12,
      size: 44,
      floatRange: 20,
      duration: 6.2,
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      src: '/logos/azure.svg',
      color: '#0078d4',
      glow: 'rgba(0, 120, 212, 0.25)',
      x: 86,
      y: 72,
      size: 50,
      floatRange: 22,
      duration: 6.8,
    },
    {
      id: 'react',
      name: 'React 19',
      src: '/logos/react.svg',
      color: '#61dafb',
      glow: 'rgba(97, 218, 251, 0.28)',
      x: 6,
      y: 75,
      size: 48,
      floatRange: 16,
      duration: 5.8,
    },
    {
      id: 'tanstack',
      name: 'TanStack Query',
      src: '/logos/tanstack.svg',
      color: '#ff4154',
      glow: 'rgba(255, 65, 84, 0.25)',
      x: 91,
      y: 44,
      size: 44,
      floatRange: 17,
      duration: 7.2,
    },
    {
      id: 'efcore',
      name: 'Entity Framework Core',
      src: '/logos/efcore.svg',
      color: '#6c2bd9',
      glow: 'rgba(108, 43, 217, 0.25)',
      x: 4,
      y: 45,
      size: 44,
      floatRange: 15,
      duration: 6.4,
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      src: '/logos/typescript.svg',
      color: '#3178c6',
      glow: 'rgba(49, 120, 198, 0.25)',
      x: 52,
      y: 6,
      size: 40,
      floatRange: 14,
      duration: 5.9,
    },
    {
      id: 'docker',
      name: 'Docker',
      src: '/logos/docker.svg',
      color: '#2496ed',
      glow: 'rgba(36, 150, 237, 0.25)',
      x: 76,
      y: 28,
      size: 42,
      floatRange: 18,
      duration: 6.6,
    },
    {
      id: 'redis',
      name: 'Redis Distributed Cache',
      src: '/logos/redis.svg',
      color: '#dc382d',
      glow: 'rgba(220, 56, 45, 0.25)',
      x: 20,
      y: 84,
      size: 40,
      floatRange: 16,
      duration: 6.1,
    },
  ];

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Floating animation for each logo
      techLogos.forEach((logo) => {
        const el = document.getElementById(`tech-logo-${logo.id}`);
        if (!el) return;

        gsap.to(el, {
          y: `-=${logo.floatRange}`,
          x: `+=${logo.floatRange * 0.35}`,
          rotation: logo.id === 'react' ? 360 : (Math.random() > 0.5 ? 6 : -6),
          duration: logo.duration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 1.5,
        });
      });

      // Mouse Parallax movement
      const handleMouseMove = (e: MouseEvent) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (e.clientX - centerX) / 40;
        const moveY = (e.clientY - centerY) / 40;

        gsap.to('.floating-tech-logo', {
          xPercent: moveX,
          yPercent: moveY,
          duration: 1.2,
          ease: 'power1.out',
          stagger: 0.015,
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="floating-tech-logos-container" ref={containerRef} aria-hidden="true">
      {techLogos.map((logo) => (
        <div
          key={logo.id}
          id={`tech-logo-${logo.id}`}
          className="floating-tech-logo"
          style={{
            left: `${logo.x}%`,
            top: `${logo.y}%`,
            width: `${logo.size}px`,
            height: `${logo.size}px`,
            filter: `drop-shadow(0 4px 20px ${logo.glow})`,
          }}
          title={logo.name}
        >
          <div className="floating-tech-logo__inner">
            <img
              src={logo.src}
              alt={`${logo.name} logo`}
              className="floating-tech-logo__img"
              width={logo.size}
              height={logo.size}
              loading="lazy"
            />
          </div>
          <span className="floating-tech-logo__tooltip">{logo.name}</span>
        </div>
      ))}
    </div>
  );
}
