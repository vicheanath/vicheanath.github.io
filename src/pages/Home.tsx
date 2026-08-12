import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, MapPin, Newspaper, Tags } from 'lucide-react';
import Seo from '../components/Seo';
import PostList from '../components/PostList';
import { getAllPosts, getAllTags } from '../lib/posts';
import { profile } from '../content/profile';
import { DEFAULT_DESCRIPTION, GITHUB_URL, canonicalUrl } from '../lib/site';

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags().slice(0, 8);

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
            url: canonicalUrl(),
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
            url: canonicalUrl('about'),
          },
        ]}
      />

      <div className="intro-card">
        <p className="intro-card__name">
          {profile.name}
          {profile.pronouns && <span className="intro-card__pronouns"> · {profile.pronouns}</span>}
        </p>
        <p className="intro-card__headline">{profile.headline}</p>
        <p className="intro-card__location">
          <MapPin size={14} aria-hidden />
          {profile.location}
        </p>
        <p className="intro-card__blurb">
          Notes from day-to-day engineering work: backend architecture in .NET, frontend practice, and
          what holds up in production. Everything here is written first-hand.
        </p>
        <div className="intro-card__actions">
          <Link to="/about" className="article__back-link">
            <span>Profile &amp; résumé</span>
            <ArrowRight size={17} aria-hidden />
          </Link>
          <a
            href={profile.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="article__back-link"
          >
            <Linkedin size={17} aria-hidden />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="filter-bar filter-bar--home">
          <span className="filter-bar__label">
            <Tags size={15} aria-hidden />
            <span>Topics</span>
          </span>
          <div className="tag-row">
            {tags.map((tag) => (
              <Link key={tag.slug} to={`/tag/${tag.slug}`} className="tag">
                {tag.name}
                <span className="tag__count">{tag.count}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <h2 className="home__heading">
        <Newspaper size={22} aria-hidden />
        <span>Latest bulletins</span>
        <span className="home__count">{posts.length}</span>
      </h2>

      <PostList posts={posts.slice(0, 6)} emptyMessage="No bulletins yet. Check back soon." />

      {posts.length > 6 && (
        <p className="home__more">
          <Link to="/posts" className="article__back-link">
            <span>Browse all {posts.length} posts</span>
            <ArrowRight size={18} aria-hidden />
          </Link>
        </p>
      )}
    </section>
  );
}
