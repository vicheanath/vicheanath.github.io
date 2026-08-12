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
  Wrench,
} from 'lucide-react';
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

const { experience, education, topSkills: skills } = profile;
const currentRole = getCurrentRole();

export default function About() {
  return (
    <section className="page resume">
      <Seo
        title={`About ${profile.name} — Software Engineer`}
        description={`Profile and résumé for ${profile.name}: ${profile.headline}, based in ${profile.location}. Experience, education, and focus areas.`}
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
            knowsAbout: skills,
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

      <header className="resume__header">
        <p className="page__eyebrow">Profile</p>
        <h1 className="page__title">{profile.name}</h1>
        <p className="resume__headline">{profile.headline}</p>
        <p className="resume__facts">
          <span>
            <MapPin size={15} aria-hidden />
            {profile.location}
          </span>
          {profile.pronouns && <span>{profile.pronouns}</span>}
          <span>
            <Briefcase size={15} aria-hidden />
            <LiveYearsOfExperience /> across {experience.length} roles
          </span>
        </p>
        <div className="resume__links">
          <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer" className="tag">
            <Linkedin size={15} aria-hidden />
            LinkedIn
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="tag">
            <Github size={15} aria-hidden />
            GitHub
          </a>
          <Link to="/contact" className="tag">
            <Mail size={15} aria-hidden />
            Contact
          </Link>
          <span className="resume__print">
            <Printer size={14} aria-hidden />
            Print this page for a PDF copy
          </span>
        </div>
      </header>

      {profile.about && (
        <section className="page__section">
          <h2>Summary</h2>
          <p>{profile.about}</p>
        </section>
      )}

      {skills.length > 0 && (
        <section className="page__section">
          <h2>
            <Wrench size={17} aria-hidden />
            <span>Core skills</span>
          </h2>
          <div className="tag-row">
            {skills.map((skill) => (
              <span key={skill} className="tag tag--static">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section className="page__section">
          <h2>
            <Briefcase size={17} aria-hidden />
            <span>Experience</span>
          </h2>
          <ol className="resume__timeline">
            {experience.map((job) => (
              <li key={`${job.company}-${job.start}`} className="resume__entry">
                <p className="resume__role">{job.title}</p>
                <p className="resume__org">
                  <Building2 size={14} aria-hidden />
                  {job.company}
                </p>
                <p className="resume__period">
                  {formatPeriod(job)}
                  {isOngoing(job) ? (
                    <LiveDuration entry={job} prefix=" · " />
                  ) : (
                    ` · ${formatDuration(job)}`
                  )}
                </p>
                <p className="resume__meta">
                  {job.location} · {job.employmentType} · {job.workMode}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {education.length > 0 && (
        <section className="page__section">
          <h2>
            <GraduationCap size={17} aria-hidden />
            <span>Education</span>
          </h2>
          <ol className="resume__timeline">
            {education.map((item) => (
              <li key={`${item.school}-${item.start}`} className="resume__entry">
                <p className="resume__role">{item.school}</p>
                <p className="resume__org">{item.degree}</p>
                <p className="resume__period">{formatPeriod(item)}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="page__section">
        <h2>About this site</h2>
        <p>
          This site is an independently maintained personal blog. It publishes original notes on .NET,
          frontend development, and software delivery — no advertising, no sponsored posts, and no
          republished content.
        </p>
        <p>
          How articles are written and corrected is described in the{' '}
          <Link to="/publishing-policy">Publishing Policy</Link>, and data handling is covered in the{' '}
          <Link to="/privacy">Privacy Policy</Link>. The site itself is open source:{' '}
          <a href={SOURCE_REPO_URL} target="_blank" rel="noopener noreferrer">
            view the repository
          </a>
          .
        </p>
      </section>
    </section>
  );
}
