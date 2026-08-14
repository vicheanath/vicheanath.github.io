import { useEffect, useState, useRef } from "react";
import { FolderGit2, Github, Loader2, Star, ExternalLink, Code2 } from "lucide-react";
import gsap from "gsap";
import Seo from "../components/Seo";

const GITHUB_USER = "vicheanath";
const EXTRA_REPOS = [
  "vailabel/vailabel-studio",
  "vicheanath/SearchBugs",
  "vicheanath/kroma-pos",
  "vicheanath/CleanArchitecture",
];

interface Project {
  name: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
  updated: string;
}

function toProject(repo: {
  name?: string;
  description?: string | null;
  html_url: string;
  language?: string | null;
  stargazers_count?: number;
  updated_at?: string;
}): Project {
  return {
    name: repo.name ?? "",
    description: repo.description ?? "",
    url: repo.html_url,
    language: repo.language || null,
    stars: repo.stargazers_count ?? 0,
    updated: repo.updated_at || "",
  };
}

const PINNED_QUERY = `
  query($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            primaryLanguage { name }
            stargazerCount
            updatedAt
          }
        }
      }
    }
  }
`;

async function fetchPinnedProjects(login: string): Promise<Project[]> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: PINNED_QUERY, variables: { login } }),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${res.statusText}`);
  const data = await res.json();
  if (data.errors) throw new Error(data.errors[0]?.message ?? "GraphQL error");
  const nodes = data?.data?.user?.pinnedItems?.nodes ?? [];
  return nodes.map(
    (n: {
      name?: string;
      description?: string;
      url: string;
      primaryLanguage?: { name: string };
      stargazerCount?: number;
      updatedAt?: string;
    }) => ({
      name: n.name ?? "",
      description: n.description ?? "",
      url: n.url ?? "",
      language: n.primaryLanguage?.name ?? null,
      stars: n.stargazerCount ?? 0,
      updated: n.updatedAt ?? "",
    }),
  );
}

async function fetchProjects(): Promise<Project[]> {
  const headers = { Accept: "application/vnd.github.v3+json" };

  const [pinnedRes, ...extraReposRes] = await Promise.all([
    fetchPinnedProjects(GITHUB_USER).catch(() => [] as Project[]),
    ...EXTRA_REPOS.map((fullName) =>
      fetch(`https://api.github.com/repos/${fullName}`, { headers }),
    ),
  ]);

  const fromPinned = Array.isArray(pinnedRes) ? pinnedRes : [];

  const extraRepos: Project[] = [];
  for (let i = 0; i < EXTRA_REPOS.length; i++) {
    const res = extraReposRes[i];
    if (res.ok) {
      const repo = await res.json();
      extraRepos.push(toProject(repo));
    }
  }

  const byUrl = new Set<string>();
  const dedupe = (list: Project[]) =>
    list.filter((p) => {
      if (byUrl.has(p.url)) return false;
      byUrl.add(p.url);
      return true;
    });

  const pinned = dedupe(fromPinned);
  const fromExtra = dedupe(extraRepos);

  return [...pinned, ...fromExtra];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetchProjects()
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : "Failed to load projects",
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loading && projects.length > 0 && listRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.from('.project-list__item', {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        });
      }
    }
  }, [loading, projects]);

  return (
    <section className="projects-page">
      <Seo title="Projects — Vichea Nath" description="Pinned and featured GitHub projects." path="projects" />
      
      <div className="section-header">
        <div className="section-badge">
          <FolderGit2 size={14} aria-hidden />
          <span>Open Source &amp; Systems</span>
        </div>
        <h1 className="section-title">
          Repositories &amp; <span className="text-highlight">Projects</span>
        </h1>
        <p className="section-subtitle">
          Featured repositories, architectures, and applications from GitHub.
        </p>
      </div>

      {loading ? (
        <div className="projects__empty" aria-busy="true">
          <Loader2 size={24} className="projects__loader spin-icon" aria-hidden />
          <p>Loading projects from GitHub…</p>
        </div>
      ) : error ? (
        <div className="projects__empty">
          <p>{error}</p>
          <a
            href={`https://github.com/${GITHUB_USER}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary"
          >
            <Github size={18} aria-hidden />
            <span>View on GitHub</span>
          </a>
        </div>
      ) : projects.length === 0 ? (
        <div className="projects__empty">
          <p>No projects found.</p>
          <a
            href={`https://github.com/${GITHUB_USER}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary"
          >
            <Github size={18} aria-hidden />
            <span>View on GitHub</span>
          </a>
        </div>
      ) : (
        <ul className="project-list" ref={listRef}>
          {projects.map((project) => (
            <li key={project.url} className="project-list__item">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-list__link"
              >
                <div className="project-list__header">
                  <span className="project-list__name">{project.name}</span>
                  <ExternalLink size={14} className="project-list__arrow" aria-hidden />
                </div>
                {project.description && (
                  <p className="project-list__description">
                    {project.description}
                  </p>
                )}
                <span className="project-list__meta">
                  {project.language && (
                    <span className="project-list__language">
                      <Code2 size={12} aria-hidden />
                      {project.language}
                    </span>
                  )}
                  {project.stars > 0 && (
                    <span className="project-list__stars">
                      <Star size={13} aria-hidden />
                      {project.stars}
                    </span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
