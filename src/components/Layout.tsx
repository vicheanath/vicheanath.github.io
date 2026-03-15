import { Link, Outlet, NavLink } from 'react-router-dom';
import { Home, Newspaper, FolderGit2, Github, Mail, CircleUserRound } from 'lucide-react';
import profileData from '../content/profile.json';
import { SOURCE_REPO_URL } from '../lib/site';

const profile = profileData as { name: string };

export default function Layout() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="layout">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <header className="masthead">
        <h1 className="masthead__title">{profile.name}</h1>
        <p className="masthead__tagline">Personal bulletins &amp; occasional notes</p>
        <p className="masthead__path" aria-hidden>~/blog</p>
        <p className="masthead__date">{today}</p>
        <nav className="nav" aria-label="Main">
          <NavLink to="/" className="nav__link" end>
            <Home size={18} aria-hidden />
            <span>Home</span>
          </NavLink>
          <NavLink to="/about" className="nav__link">
            <CircleUserRound size={18} aria-hidden />
            <span>About</span>
          </NavLink>
          <NavLink to="/posts" className="nav__link">
            <Newspaper size={18} aria-hidden />
            <span>Posts</span>
          </NavLink>
          <NavLink to="/projects" className="nav__link">
            <FolderGit2 size={18} aria-hidden />
            <span>Projects</span>
          </NavLink>
          <NavLink to="/contact" className="nav__link">
            <Mail size={18} aria-hidden />
            <span>Contact</span>
          </NavLink>
        </nav>
      </header>
      <main className="main" id="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p className="footer__line">{profile.name} · original software notes and project updates</p>
        <div className="footer__links">
          <Link to="/about">About</Link>
          <Link to="/advertising">Advertising</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/publishing-policy">Publishing Policy</Link>
          <Link to="/contact">Contact</Link>
          <a href={SOURCE_REPO_URL} target="_blank" rel="noopener noreferrer">
            <Github size={14} aria-hidden />
            <span>Source</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
