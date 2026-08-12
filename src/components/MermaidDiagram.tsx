import { useEffect, useId, useState } from 'react';

interface MermaidDiagramProps {
  chart: string;
}

type MermaidModule = typeof import('mermaid').default;

let mermaidLoader: Promise<MermaidModule> | null = null;

function loadMermaid() {
  if (!mermaidLoader) {
    mermaidLoader = import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'base',
        themeVariables: {
          background: '#fbfaf6',
          primaryColor: '#ebe4d8',
          primaryBorderColor: '#2a2a2a',
          primaryTextColor: '#1a1a1a',
          lineColor: '#2a2a2a',
          secondaryColor: '#f4f1ea',
          tertiaryColor: '#ffffff',
          fontFamily: "'Ubuntu', 'Segoe UI', Helvetica, Arial, sans-serif",
        },
        flowchart: {
          curve: 'basis',
          useMaxWidth: true,
        },
      });

      return mermaid;
    });
  }

  return mermaidLoader;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const id = useId().replace(/[:]/g, '');
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
  }, [chart, id]);

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
