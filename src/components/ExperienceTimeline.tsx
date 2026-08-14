import { useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { profile, formatPeriod, formatDuration, isOngoing } from '../content/profile';

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (typeof window === 'undefined' || !container || !listRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            '.timeline-item',
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power2.out', clearProps: 'opacity,transform' }
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
    <section className="timeline-section" id="experience" ref={containerRef}>
      <div className="section-header">
        <div className="section-badge">
          <Briefcase size={14} aria-hidden />
          <span>Career Trajectory</span>
        </div>
        <h2 className="section-title">
          Professional Experience &amp; <span className="text-highlight">Impact</span>
        </h2>
        <p className="section-subtitle">
          6+ years delivering scalable enterprise software across Fintech, E-commerce, and high-load web platforms.
        </p>
      </div>

      <div className="timeline-container" ref={listRef}>
        <div className="timeline-track" aria-hidden="true" />

        {profile.experience.map((item) => (
          <div
            key={`${item.company}-${item.start}`}
            className={`timeline-item ${isOngoing(item) ? 'timeline-item--current' : ''}`}
          >
            <div className="timeline-node">
              <span className="timeline-node__dot" />
            </div>

            <div className="timeline-card">
              <div className="timeline-card__header">
                <div>
                  <h3 className="timeline-card__title">{item.title}</h3>
                  <div className="timeline-card__company">
                    <strong>{item.company}</strong>
                    <span className="timeline-card__mode">· {item.employmentType} ({item.workMode})</span>
                  </div>
                </div>
                {isOngoing(item) && (
                  <span className="badge badge--pulse">Current Role</span>
                )}
              </div>

              <div className="timeline-card__meta">
                <span className="timeline-meta-item">
                  <Calendar size={13} aria-hidden />
                  <span>{formatPeriod(item)}</span>
                  <span className="timeline-duration">({formatDuration(item)})</span>
                </span>
                <span className="timeline-meta-item">
                  <MapPin size={13} aria-hidden />
                  <span>{item.location}</span>
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="timeline-item timeline-item--education">
          <div className="timeline-node timeline-node--edu">
            <GraduationCap size={15} aria-hidden />
          </div>

          <div className="timeline-card">
            <div className="timeline-card__header">
              <div>
                <h3 className="timeline-card__title">Academic Foundation</h3>
                <div className="timeline-card__company">Master&apos;s &amp; Bachelor&apos;s in Computer Science</div>
              </div>
            </div>

            <div className="timeline-edu-list">
              {profile.education.map((edu) => (
                <div key={edu.school} className="timeline-edu-item">
                  <p className="timeline-edu-school"><strong>{edu.school}</strong></p>
                  <p className="timeline-edu-degree">{edu.degree} ({formatPeriod(edu)})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
