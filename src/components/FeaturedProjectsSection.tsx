import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FolderGit2, Github, ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';

interface FeaturedProject {
  title: string;
  repo: string;
  description: string;
  tags: string[];
  githubUrl: string;
  stars?: number;
  highlight: string;
}

const FEATURED: FeaturedProject[] = [
  {
    title: 'Interface patterns',
    repo: 'interface-patterns',
    description: 'Small patterns for building clear, responsive interfaces with React and TypeScript.',
    tags: ['React', 'TypeScript', 'UI'],
    githubUrl: '/projects',
    highlight: 'Simple components with clear boundaries',
  },
  {
    title: 'Reliable APIs',
    repo: 'reliable-apis',
    description: 'Notes and examples for designing predictable, observable backend services.',
    tags: ['C#', '.NET', 'REST API'],
    githubUrl: '/projects',
    highlight: 'Explicit contracts and useful diagnostics',
  },
  {
    title: 'Data workflows',
    repo: 'data-workflows',
    description: 'Practical approaches to persistence, caching, and background processing.',
    tags: ['SQL', 'Caching', 'Workers'],
    githubUrl: '/projects',
    highlight: 'Durable work over clever abstractions',
  },
  {
    title: 'Architecture notes',
    repo: 'architecture-notes',
    description: 'Compact explanations of boundaries, composition, and maintainable system design.',
    tags: ['Architecture', 'CQRS', 'Systems'],
    githubUrl: '/projects',
    highlight: 'Boundaries that make change cheaper',
  },
];

export default function FeaturedProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (typeof window === 'undefined' || !container || !gridRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            '.featured-card',
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power2.out', clearProps: 'opacity,transform' }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="featured-projects" id="featured-projects" ref={containerRef}>
      <div className="section-header">
        <div className="section-badge">
          <FolderGit2 size={14} aria-hidden />
          <span>Selected Work</span>
        </div>
        <h2 className="section-title">
          Featured Full-Stack <span className="text-highlight">Projects</span>
        </h2>
        <p className="section-subtitle">
          Open-source software, developer tools, and full-stack solutions built with modern .NET and React.
        </p>
      </div>

      <div className="featured-grid" ref={gridRef}>
        {FEATURED.map((proj) => (
          <div key={proj.repo} className="featured-card">
            <div className="featured-card__top">
              <div className="featured-card__icon-box">
                <FolderGit2 size={20} aria-hidden />
              </div>
              <div className="featured-card__links">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-card__action"
                  aria-label={`View ${proj.title} on GitHub`}
                >
                  <Github size={18} />
                </a>
              </div>
            </div>

            <h3 className="featured-card__title">
              <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer">
                {proj.title}
              </a>
            </h3>

            <p className="featured-card__desc">{proj.description}</p>

            <div className="featured-card__highlight">
              <Sparkles size={13} aria-hidden />
              <span>{proj.highlight}</span>
            </div>

            <div className="featured-card__tags">
              {proj.tags.map((tag) => (
                <span key={tag} className="tag tag--sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="section-footer">
        <Link to="/projects" className="btn btn--secondary">
          <span>View All Repositories &amp; GitHub Projects</span>
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
