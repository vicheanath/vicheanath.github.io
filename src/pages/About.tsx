import { Linkedin, ArrowUpRight } from 'lucide-react';
import Seo from '../components/Seo';
import { profile } from '../content/profile';
import { LINKEDIN_URL, SITE_NAME } from '../lib/site';

export default function About() {
  return (
    <section className="page">
      <Seo
        title={`About - ${SITE_NAME}`}
        description={profile.about}
        path="about"
      />
      <header className="page__header">
        <p className="page__eyebrow">About me</p>
        <h1 className="page__title">
          I build software that is <span className="text-highlight">clear and dependable</span>.
        </h1>
        <p className="page__intro">{profile.about}</p>
      </header>

      <section className="page__section">
        <h2>What I work with</h2>
        <p>
          My work spans backend APIs, frontend applications, data access, distributed systems, and
          developer tooling. I care about simple boundaries, useful tests, good observability, and
          interfaces that are easy to understand.
        </p>
        <div className="tag-row">
          {profile.topSkills.map((skill) => (
            <span key={skill} className="tag tag--static">{skill}</span>
          ))}
        </div>
      </section>

      <section className="page__section">
        <h2>Writing and projects</h2>
        <p>
          This site is where I collect engineering notes, experiments, and explanations from the
          problems I work through. The goal is to make complex ideas practical and reusable.
        </p>
        <a
          className="page__card-link"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin size={18} aria-hidden />
          <span>
            <strong>Connect with me on LinkedIn</strong>
            <span>Professional background, experience, and contact options.</span>
          </span>
          <ArrowUpRight size={16} aria-hidden />
        </a>
      </section>
    </section>
  );
}
