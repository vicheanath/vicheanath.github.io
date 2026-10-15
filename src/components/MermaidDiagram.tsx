import { useEffect, useId, useState } from 'react';
import { useTheme, type Theme } from '../lib/theme';

interface MermaidDiagramProps {
  chart: string;
}

type MermaidModule = typeof import('mermaid').default;

let mermaidLoader: Promise<MermaidModule> | null = null;

// Mermaid bakes colors into the SVG, so each theme needs its own render.
const THEME_VARIABLES: Record<Theme, Record<string, string>> = {
  light: {
    background: '#fbfaf6',
    primaryColor: '#ebe4d8',
    primaryBorderColor: '#2a2a2a',
    primaryTextColor: '#1a1a1a',
    lineColor: '#2a2a2a',
    secondaryColor: '#f4f1ea',
    tertiaryColor: '#ffffff',
  },
  dark: {
    background: '#111110',
    primaryColor: '#2a2823',
    primaryBorderColor: '#8f8c84',
    primaryTextColor: '#ededea',
    lineColor: '#b3b3ad',
    secondaryColor: '#1f1e1b',
    tertiaryColor: '#171716',
  },
};

function loadMermaid() {
  if (!mermaidLoader) {
    mermaidLoader = import('mermaid').then(({ default: mermaid }) => mermaid);
  }

  return mermaidLoader;
}

function configure(mermaid: MermaidModule, theme: Theme) {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    themeVariables: {
      ...THEME_VARIABLES[theme],
      fontFamily: "'Ubuntu', 'Segoe UI', Helvetica, Arial, sans-serif",
    },
    flowchart: {
      curve: 'basis',
      useMaxWidth: true,
    },
  });
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const id = useId().replace(/[:]/g, '');
  const theme = useTheme();
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const source = chart.trim();

    if (!source) {
      return () => {
        cancelled = true;
      };
    }

    loadMermaid()
      .then(async (mermaid) => {
        // The previous SVG stays on screen until the re-themed one is ready.
        configure(mermaid, theme);
        const { svg: rendered } = await mermaid.render(`mermaid-${id}`, source);

        if (!cancelled) {
          setSvg(rendered);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to render diagram.');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chart, id, theme]);

  if (error) {
    return (
      <figure className="article__mermaid article__mermaid--error">
        <figcaption className="article__diagram-label">Diagram source</figcaption>
        <p className="article__diagram-error">Mermaid could not render this diagram.</p>
        <pre>{chart.trim()}</pre>
      </figure>
    );
  }

  if (!svg) {
    return (
      <figure className="article__mermaid article__mermaid--loading" aria-busy="true">
        <figcaption className="article__diagram-label">Diagram</figcaption>
        <p className="article__diagram-loading">Rendering diagram…</p>
      </figure>
    );
  }

  return (
    <figure className="article__mermaid">
      <figcaption className="article__diagram-label">Diagram</figcaption>
      <div className="article__mermaid-canvas" dangerouslySetInnerHTML={{ __html: svg }} />
    </figure>
  );
}
