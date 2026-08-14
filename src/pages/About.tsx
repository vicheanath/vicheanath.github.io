import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Printer,
  Sparkles,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Code2,
  Database,
  Cloud,
} from 'lucide-react';
import gsap from 'gsap';
import Seo from '../components/Seo';
import LiveDuration, { LiveYearsOfExperience } from '../components/LiveDuration';
import {
  formatDuration,
  formatPeriod,
  getCurrentRole,
  isOngoing,
  profile,
} from '../content/profile';
import { GITHUB_URL, SOURCE_REPO_URL, canonicalUrl } from '../lib/site';

const { experience, education } = profile;
const currentRole = getCurrentRole();

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-hero, .about-section, .about-skill-group, .resume__entry, .about-principle-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <section className="page about-page" ref={containerRef}>
      <Seo
        title={`About ${profile.name} — Senior Full-Stack Engineer`}
        description={`Profile and résumé for ${profile.name}: ${profile.headline}, based in ${profile.location}. Experience, education, and technical competencies.`}
        path="about"
        type="profile"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            name: `About ${profile.name}`,
            url: canonicalUrl('about'),
            description: `Profile and résumé for ${profile.name}.`,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: profile.name,
            jobTitle: currentRole?.title ?? profile.headline,
            description: profile.about,
            knowsAbout: profile.topSkills,
            address: {
              '@type': 'PostalAddress',
              addressLocality: profile.location,
            },
            worksFor: currentRole
              ? { '@type': 'Organization', name: currentRole.company }
              : undefined,
            alumniOf: education.map((item) => ({
              '@type': 'EducationalOrganization',
              name: item.school,
            })),
            sameAs: [profile.linkedInUrl, GITHUB_URL],
            url: canonicalUrl('about'),
          },
        ]}
      />

      {/* Hero Header */}
      <header className="about-hero">
        <div className="section-badge">
          <Sparkles size={13} aria-hidden />
          <span>About Me &amp; Résumé</span>
        </div>
        <h1 className="about-hero__title">{profile.name}</h1>
        <p className="about-hero__headline">{profile.headline}</p>

        <div className="about-hero__meta">
          <span className="about-hero__meta-item">
            <MapPin size={15} aria-hidden />
            <span>{profile.location}</span>
          </span>
          <span className="about-hero__meta-item">
            <Briefcase size={15} aria-hidden />
            <span>
              <LiveYearsOfExperience /> of Experience across {experience.length} roles
            </span>
          </span>
          <span className="about-hero__status-chip">
            <span className="about-hero__status-dot" />
            <span>Shipping @ CED</span>
          </span>
        </div>

        <div className="about-hero__actions">
          <a
            href={profile.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--sm btn--primary"
          >
            <Linkedin size={15} aria-hidden />
            <span>LinkedIn Profile</span>
            <ArrowUpRight size={13} />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--sm btn--outline"
          >
            <Github size={15} aria-hidden />
            <span>GitHub</span>
            <ArrowUpRight size={13} />
          </a>
          <Link to="/contact" className="btn btn--sm btn--outline">
            <Mail size={15} aria-hidden />
            <span>Contact</span>
          </Link>
          <button
            type="button"
            className="btn btn--sm btn--secondary about-hero__print-btn"
            onClick={handlePrint}
            aria-label="Print or Save PDF"
          >
            <Printer size={14} aria-hidden />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </header>

      {/* Summary Narrative */}
      {profile.about && (
        <section className="about-section about-card">
          <h2 className="about-section__title">Executive Summary</h2>
          <p className="about-summary__text">{profile.about}</p>
        </section>
      )}

      {/* Competencies Matrix */}
      <section className="about-section">
        <h2 className="about-section__title">
          <Layers size={18} aria-hidden />
          <span>Core Competencies &amp; Technical Stack</span>
        </h2>
        <div className="about-skills-grid">
          <div className="about-skill-group">
            <div className="about-skill-group__header">
              <Cpu size={16} className="text-accent" />
              <h3>Backend &amp; Architecture</h3>
            </div>
            <ul className="about-skill-group__list">
              <li>C# / .NET 9 &amp; .NET 8</li>
              <li>ASP.NET Core Minimal APIs</li>
              <li>Clean Architecture &amp; CQRS</li>
              <li>MediatR &amp; Domain-Driven Design (DDD)</li>
              <li>Microservices &amp; Event-Driven Architecture</li>
              <li>REST &amp; gRPC Services</li>
            </ul>
          </div>

          <div className="about-skill-group">
            <div className="about-skill-group__header">
              <Code2 size={16} className="text-accent" />
              <h3>Frontend &amp; UI Engineering</h3>
            </div>
            <ul className="about-skill-group__list">
              <li>React 19 &amp; Next.js</li>
              <li>TypeScript (Strict Typing &amp; Generics)</li>
              <li>Angular &amp; RxJS</li>
              <li>Modern Responsive CSS &amp; Tailwind</li>
              <li>Core Web Vitals &amp; Performance</li>
              <li>Optimistic UI &amp; State Management</li>
            </ul>
          </div>

          <div className="about-skill-group">
            <div className="about-skill-group__header">
              <Database size={16} className="text-accent" />
              <h3>Databases &amp; Persistence</h3>
            </div>
            <ul className="about-skill-group__list">
              <li>Microsoft SQL Server (T-SQL, Indexing)</li>
              <li>PostgreSQL</li>
              <li>Entity Framework Core 9</li>
              <li>Dapper (High-Throughput Read Models)</li>
              <li>Redis Distributed Caching</li>
              <li>Database Migrations &amp; Transactions</li>
            </ul>
          </div>

          <div className="about-skill-group">
            <div className="about-skill-group__header">
              <Cloud size={16} className="text-accent" />
              <h3>Cloud, DevOps &amp; Security</h3>
            </div>
            <ul className="about-skill-group__list">
              <li>Microsoft Azure (App Services, Functions, SQL)</li>
              <li>Docker &amp; Multi-Stage Builds</li>
              <li>CI/CD (GitHub Actions, Automated Pipelines)</li>
              <li>OAuth2, OpenID Connect &amp; JWT Security</li>
              <li>OpenTelemetry, Serilog &amp; Distributed Tracing</li>
              <li>Unit &amp; Integration Testing (xUnit, Moq)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      {experience.length > 0 && (
        <section className="about-section">
          <h2 className="about-section__title">
            <Briefcase size={18} aria-hidden />
            <span>Professional Experience</span>
          </h2>
          <div className="about-timeline">
            {experience.map((job) => (
              <div
                key={`${job.company}-${job.start}`}
                className={`about-timeline-card ${isOngoing(job) ? 'about-timeline-card--current' : ''}`}
              >
                <div className="about-timeline-card__header">
                  <div>
                    <h3 className="about-timeline-card__role">{job.title}</h3>
                    <div className="about-timeline-card__org">
                      <Building2 size={14} aria-hidden />
                      <span>{job.company}</span>
                    </div>
                  </div>
                  <div className="about-timeline-card__badges">
                    <span className="about-timeline-badge about-timeline-badge--period">
                      {formatPeriod(job)}
                    </span>
                    <span className="about-timeline-badge about-timeline-badge--duration">
                      {isOngoing(job) ? (
                        <LiveDuration entry={job} />
                      ) : (
                        formatDuration(job)
                      )}
                    </span>
                  </div>
                </div>
                <div className="about-timeline-card__meta">
                  <span>{job.location}</span>
                  <span>&middot;</span>
                  <span>{job.employmentType}</span>
                  <span>&middot;</span>
                  <span className="about-timeline-tag">{job.workMode}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="about-section">
          <h2 className="about-section__title">
            <GraduationCap size={18} aria-hidden />
            <span>Education &amp; Credentials</span>
          </h2>
          <div className="about-education-grid">
            {education.map((item) => (
              <div key={`${item.school}-${item.start}`} className="about-edu-card">
                <div className="about-edu-card__icon">
                  <GraduationCap size={20} />
                </div>
                <div className="about-edu-card__content">
                  <h3 className="about-edu-card__school">{item.school}</h3>
                  <p className="about-edu-card__degree">{item.degree}</p>
                  <span className="about-edu-card__period">{formatPeriod(item)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Engineering Philosophy */}
      <section className="about-section">
        <h2 className="about-section__title">
          <Zap size={18} aria-hidden />
          <span>Engineering Philosophy</span>
        </h2>
        <div className="about-principles-grid">
          <div className="about-principle-card">
            <div className="about-principle-card__icon">
              <ShieldCheck size={20} />
            </div>
            <h3>Architecture with Invariants</h3>
            <p>
              I structure applications with clear boundaries. Domain rules remain decoupled from framework quirks, ensuring high testability, agility, and maintainability.
            </p>
          </div>
          <div className="about-principle-card">
            <div className="about-principle-card__icon">
              <Zap size={20} />
            </div>
            <h3>Speed &amp; Low Latency</h3>
            <p>
              From non-blocking asynchronous APIs and split queries to cache-aside distribution, I design systems with sub-30ms P99 responses as a standard.
            </p>
          </div>
          <div className="about-principle-card">
            <div className="about-principle-card__icon">
              <Code2 size={20} />
            </div>
            <h3>Fluid Frontend Craft</h3>
            <p>
              Great backend architecture deserves an equally polished frontend. I craft responsive, intuitive, and accessible user interfaces that feel alive.
            </p>
          </div>
        </div>
      </section>

      {/* Site Transparency / Open Source */}
      <section className="about-section about-transparency-card">
        <h2 className="about-section__title">About This Website</h2>
        <p>
          This website is built with <strong>React 19</strong>, <strong>TypeScript</strong>, and <strong>Vite SSR / Static Generation</strong>.
          It publishes original engineering articles with zero trackers, zero ads, and full accessibility compliance.
        </p>
        <p>
          To review site policies, read the <Link to="/publishing-policy">Publishing Policy</Link> and <Link to="/privacy">Privacy Policy</Link>.
          The complete codebase is open-source on GitHub:{' '}
          <a href={SOURCE_REPO_URL} target="_blank" rel="noopener noreferrer" className="text-accent">
            view source repository <ArrowUpRight size={13} className="inline-icon" />
          </a>
          .
        </p>
      </section>
    </section>
  );
}
