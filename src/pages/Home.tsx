import { Link } from 'react-router-dom';
import { Newspaper, Calendar, ChevronRight, Inbox, Linkedin, Briefcase, GraduationCap } from 'lucide-react';
import Seo from '../components/Seo';
import { getAllPosts } from '../lib/posts';
import profileData from '../content/profile.json';
import { DEFAULT_DESCRIPTION, GITHUB_URL, SITE_URL } from '../lib/site';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  duration: string;
  location: string;
  employmentType: string;
  workMode: string;
}

interface EducationItem {
  school: string;
  degree: string;
  period: string;
}

const profile = profileData as {
  name: string;
  pronouns?: string;
  headline: string;
  location: string;
  linkedInUrl: string;
  about?: string;
  topSkills?: string[];
  experience?: ExperienceItem[];
  education?: EducationItem[];
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <section className="home">
      <Seo
        title={`${profile.name} — Personal bulletins`}
        description={profile.about ?? DEFAULT_DESCRIPTION}
        path=""
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: profile.name,
            url: SITE_URL,
            description: profile.about ?? DEFAULT_DESCRIPTION,
            inLanguage: 'en-US',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: profile.name,
            jobTitle: profile.headline,
            homeLocation: {
              '@type': 'Place',
              name: profile.location,
            },
            sameAs: [profile.linkedInUrl, GITHUB_URL],
            url: SITE_URL,
          },
        ]}
      />
      <div className="home__profile">
        <h2 className="home__profile-heading">About</h2>
        <p className="home__profile-name">
          {profile.name}
          {profile.pronouns && (
            <span className="home__profile-pronouns"> · {profile.pronouns}</span>
          )}
        </p>
        <p className="home__profile-headline">{profile.headline}</p>
        <p className="home__profile-location">{profile.location}</p>

        {profile.about && (
          <div className="home__profile-about">
            <h3 className="home__profile-subheading">Background</h3>
            <p className="home__profile-about-text">{profile.about}</p>
          </div>
        )}

        {profile.topSkills && profile.topSkills.length > 0 && (
          <p className="home__profile-skills">
            <strong>Top skills:</strong>{' '}
            {profile.topSkills.join(' · ')}
          </p>
        )}

        {profile.experience && profile.experience.length > 0 && (
          <div className="home__profile-experience">
            <h3 className="home__profile-subheading">
              <Briefcase size={18} aria-hidden />
              <span>Experience</span>
            </h3>
            <ul className="experience-list">
              {profile.experience.map((job, i) => (
                <li key={i} className="experience-list__item">
                  <span className="experience-list__title">{job.title}</span>
                  <span className="experience-list__company">{job.company}</span>
                  <span className="experience-list__meta">
                    {job.period} · {job.duration}
                  </span>
                  <span className="experience-list__location">
                    {job.location} · {job.workMode}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {profile.education && profile.education.length > 0 && (
          <div className="home__profile-education">
            <h3 className="home__profile-subheading">
              <GraduationCap size={18} aria-hidden />
              <span>Education</span>
            </h3>
            <ul className="education-list">
              {profile.education.map((edu, i) => (
                <li key={i} className="education-list__item">
                  <span className="education-list__school">{edu.school}</span>
                  <span className="education-list__degree">{edu.degree}</span>
                  <span className="education-list__period">{edu.period}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="home__site-note">
          <h3 className="home__profile-subheading">About this site</h3>
          <p className="home__profile-about-text">
            This is a personal technical blog with original long-form notes on backend architecture,
            frontend development, and software delivery. Important site details are easy to find so readers
            and reviewers can verify who publishes the content and how the site operates.
          </p>
          <div className="home__site-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/advertising">Advertising</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/publishing-policy">Publishing Policy</Link>
          </div>
        </div>

        <a
          href={profile.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="home__profile-link"
        >
          <Linkedin size={20} aria-hidden />
          <span>Profile on LinkedIn</span>
        </a>
      </div>

      <h2 className="home__heading">
        <Newspaper size={22} aria-hidden />
        <span>Latest bulletins</span>
      </h2>
      {posts.length === 0 ? (
        <div className="home__empty">
          <Inbox size={48} aria-hidden />
          <p>No bulletins yet. Check back soon.</p>
        </div>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug} className="post-list__item">
              <Link to={`/post/${post.slug}`} className="post-list__link">
                <span className="post-list__content">
                  <span className="post-list__title">{post.title}</span>
                  <time className="post-list__date" dateTime={post.date}>
                    <Calendar size={14} aria-hidden />
                    {post.date}
                  </time>
                  <p className="post-list__excerpt">{post.excerpt}</p>
                </span>
                <ChevronRight size={20} className="post-list__chevron" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
