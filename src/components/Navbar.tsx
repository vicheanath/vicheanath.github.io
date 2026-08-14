import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Home, CircleUserRound, FolderGit2, Newspaper, Mail, Search, Menu, X, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { profile } from '../content/profile';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  const isBlogActive =
    location.pathname.startsWith('/blog') ||
    location.pathname.startsWith('/posts') ||
    location.pathname.startsWith('/post') ||
    location.pathname.startsWith('/tag');

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (typeof window === 'undefined' || !navRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen && mobileDrawerRef.current) {
      gsap.fromTo(
        mobileDrawerRef.current,
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [mobileMenuOpen]);

  return (
    <header className="site-nav-wrapper" ref={navRef}>
      <div className="site-nav">
        {/* Brand - Name only */}
        <Link to="/" className="site-nav__brand" aria-label="Home page">
          <span className="site-nav__name">{profile.name}</span>
        </Link>

        {/* Desktop Links */}
        <nav className="site-nav__links" aria-label="Main Navigation">
          <NavLink to="/" className="site-nav__link" end>
            <Home size={15} aria-hidden />
            <span>Home</span>
          </NavLink>
          <NavLink to="/about" className="site-nav__link">
            <CircleUserRound size={15} aria-hidden />
            <span>About</span>
          </NavLink>
          <NavLink to="/projects" className="site-nav__link">
            <FolderGit2 size={15} aria-hidden />
            <span>Projects</span>
          </NavLink>
          <NavLink
            to="/blog"
            className={`site-nav__link ${isBlogActive ? 'active' : ''}`}
          >
            <Newspaper size={15} aria-hidden />
            <span>Blog</span>
          </NavLink>
          <NavLink to="/contact" className="site-nav__link">
            <Mail size={15} aria-hidden />
            <span>Contact</span>
          </NavLink>
        </nav>

        {/* Actions (Cmd+K + Mobile Toggle) */}
        <div className="site-nav__actions">
          <button
            type="button"
            className="site-nav__cmd-btn"
            onClick={onOpenCommandPalette}
            aria-label="Open Command Palette (Ctrl+K or Cmd+K)"
            title="Open command palette (Ctrl+K)"
          >
            <Search size={14} aria-hidden />
            <span className="site-nav__cmd-text">Search...</span>
            <kbd className="site-nav__kbd">&#8984;K</kbd>
          </button>

          <button
            type="button"
            className="site-nav__toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="site-nav__mobile-drawer" ref={mobileDrawerRef}>
          <nav className="site-nav__mobile-links">
            <NavLink to="/" className="site-nav__mobile-link" end>
              <Home size={18} />
              <span>Home</span>
            </NavLink>
            <NavLink to="/about" className="site-nav__mobile-link">
              <CircleUserRound size={18} />
              <span>About</span>
            </NavLink>
            <NavLink to="/projects" className="site-nav__mobile-link">
              <FolderGit2 size={18} />
              <span>Projects</span>
            </NavLink>
            <NavLink
              to="/blog"
              className={`site-nav__mobile-link ${isBlogActive ? 'active' : ''}`}
            >
              <Newspaper size={18} />
              <span>Blog</span>
            </NavLink>
            <NavLink to="/contact" className="site-nav__mobile-link">
              <Mail size={18} />
              <span>Contact</span>
            </NavLink>
            <button
              type="button"
              className="site-nav__mobile-cmd"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
            >
              <Terminal size={16} />
              <span>Quick Command Palette &middot; ⌘K</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
