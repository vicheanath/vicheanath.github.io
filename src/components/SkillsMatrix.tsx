import { useState, useRef, useEffect } from 'react';
import { Code, Terminal, Database, Cloud, Layers } from 'lucide-react';
import gsap from 'gsap';

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'cloud' | 'data' | 'arch';
  level: number; // 0 - 100
  experience: string;
  highlight: string;
}

const SKILLS_DATA: Skill[] = [
  // Backend & .NET
  { name: 'C# / .NET 9 & 8', category: 'backend', level: 96, experience: '6+ yrs', highlight: 'ASP.NET Core, Minimal APIs, Async/Await, Memory Optimization' },
  { name: 'Domain-Driven Design (DDD)', category: 'arch', level: 95, experience: '5+ yrs', highlight: 'Aggregate Roots, Value Objects, Domain Events, Invariant Enforcement' },
  { name: 'CQRS & MediatR Pipeline', category: 'arch', level: 95, experience: '5+ yrs', highlight: 'Command/Query Handlers, Pipeline Behaviors, Railway-Oriented Result' },
  { name: 'EF Core 9 & Outbox Pattern', category: 'data', level: 94, experience: '6+ yrs', highlight: 'Complex types, Value converters, SaveChangesInterceptor, Outbox table' },
  { name: 'Microsoft SQL Server & PostgreSQL', category: 'data', level: 92, experience: '6+ yrs', highlight: 'Indexing, Query optimization, ACID transactions, Execution plans' },
  { name: 'REST & gRPC APIs', category: 'backend', level: 92, experience: '6+ yrs', highlight: 'Contract-first, RFC 7807 ProblemDetails, Rate limiting, OpenAPI' },
  { name: 'Redis Distributed Cache', category: 'data', level: 88, experience: '4+ yrs', highlight: 'Cache-aside pattern, Pub/Sub, Distributed locks, SWR caching' },

  // Frontend & UI
  { name: 'React 19 & Next.js', category: 'frontend', level: 94, experience: '5+ yrs', highlight: 'Server Components, Custom Hooks, State Machines, SSR' },
  { name: 'TanStack React Query v5', category: 'frontend', level: 94, experience: '4+ yrs', highlight: 'Query Key Factory, Optimistic Mutations, Cache Invalidation, Rollbacks' },
  { name: 'TypeScript', category: 'frontend', level: 95, experience: '5+ yrs', highlight: 'Strict typing, Generics, Utility types, DTO contracts' },
  { name: 'Modern Web Performance', category: 'frontend', level: 92, experience: '5+ yrs', highlight: 'Core Web Vitals, Optimistic UI, Bundle Splitting, SPA' },
  { name: 'Angular', category: 'frontend', level: 85, experience: '3+ yrs', highlight: 'RxJS, NgRx, Enterprise Component Architecture' },
  { name: 'CSS3 / Modern Styling', category: 'frontend', level: 92, experience: '6+ yrs', highlight: 'Flexbox, CSS Grid, Fluid Typography, Vanilla CSS & Tailwind' },

  // Cloud & DevOps
  { name: 'Microsoft Azure', category: 'cloud', level: 88, experience: '4+ yrs', highlight: 'App Services, Azure Functions, Azure SQL, Key Vault, Service Bus' },
  { name: 'Docker & Containerization', category: 'cloud', level: 86, experience: '4+ yrs', highlight: 'Multi-stage builds, Docker Compose, Microservices' },
  { name: 'CI/CD & GitHub Actions', category: 'cloud', level: 88, experience: '5+ yrs', highlight: 'Automated test suites, Deployment pipelines, Linting' },
  { name: 'Microservices & Event-Driven', category: 'arch', level: 90, experience: '4+ yrs', highlight: 'Transactional Outbox, Eventual consistency, Azure Service Bus' },
];

export default function SkillsMatrix() {
  const [filter, setFilter] = useState<'all' | 'backend' | 'frontend' | 'cloud' | 'data' | 'arch'>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredSkills = filter === 'all' ? SKILLS_DATA : SKILLS_DATA.filter((s) => s.category === filter);

  // Scroll-triggered section reveal
  useEffect(() => {
    const container = containerRef.current;
    if (typeof window === 'undefined' || !container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            container.querySelectorAll('.section-header, .skills-filter-tabs'),
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', clearProps: 'opacity,transform' }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !gridRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-card',
        { scale: 0.96, opacity: 0, y: 12 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: 'power2.out', clearProps: 'opacity,transform' }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [filter]);

  return (
    <section className="skills-section" id="skills" ref={containerRef}>
      <div className="section-header">
        <div className="section-badge">
          <Layers size={14} aria-hidden />
          <span>Technical Expertise</span>
        </div>
        <h2 className="section-title">
          Full-Stack &amp; Engineering <span className="text-highlight">Capabilities</span>
        </h2>
        <p className="section-subtitle">
          Over 6 years mastering backend systems, cloud architectures, and modern responsive frontend web applications.
        </p>
      </div>

      <div className="skills-filter-tabs" role="tablist" aria-label="Filter skills by domain">
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'all'}
          className={`skills-pill ${filter === 'all' ? 'skills-pill--active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Stack ({SKILLS_DATA.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'backend'}
          className={`skills-pill ${filter === 'backend' ? 'skills-pill--active' : ''}`}
          onClick={() => setFilter('backend')}
        >
          <Terminal size={14} aria-hidden />
          <span>.NET &amp; C# Backend</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'frontend'}
          className={`skills-pill ${filter === 'frontend' ? 'skills-pill--active' : ''}`}
          onClick={() => setFilter('frontend')}
        >
          <Code size={14} aria-hidden />
          <span>Frontend &amp; UI</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'data'}
          className={`skills-pill ${filter === 'data' ? 'skills-pill--active' : ''}`}
          onClick={() => setFilter('data')}
        >
          <Database size={14} aria-hidden />
          <span>Databases &amp; Cache</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={filter === 'cloud'}
          className={`skills-pill ${filter === 'cloud' ? 'skills-pill--active' : ''}`}
          onClick={() => setFilter('cloud')}
        >
          <Cloud size={14} aria-hidden />
          <span>Cloud &amp; DevOps</span>
        </button>
      </div>

      <div className="skills-grid" ref={gridRef}>
        {filteredSkills.map((skill) => (
          <div key={skill.name} className="skill-card">
            <div className="skill-card__header">
              <span className="skill-card__name">{skill.name}</span>
              <span className="skill-card__exp">{skill.experience}</span>
            </div>
            <div className="skill-card__progress-track" aria-hidden="true">
              <div
                className="skill-card__progress-fill"
                style={{ width: `${skill.level}%` }}
              />
            </div>
            <p className="skill-card__highlight">{skill.highlight}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
