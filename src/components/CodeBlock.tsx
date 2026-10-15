import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  source: string;
}

const LANGUAGE_LABELS: Record<string, string> = {
  bash: 'Bash',
  cs: 'C#',
  csharp: 'C#',
  css: 'CSS',
  html: 'HTML',
  js: 'JavaScript',
  javascript: 'JavaScript',
  json: 'JSON',
  jsx: 'JSX',
  md: 'Markdown',
  powershell: 'PowerShell',
  sh: 'Shell',
  shell: 'Shell',
  sql: 'SQL',
  text: 'Plain text',
  ts: 'TypeScript',
  tsx: 'TSX',
  typescript: 'TypeScript',
  xml: 'XML',
  yaml: 'YAML',
  yml: 'YAML',
};

/**
 * Highlighted code with a copy control. The markup is fully rendered at build
 * time; the button only becomes useful once the page hydrates.
 */
export default function CodeBlock({ language, source }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <figure className="article__code-block">
      <div className="article__code-head">
        <figcaption className="article__code-label">{LANGUAGE_LABELS[language] ?? language}</figcaption>
        <button
          type="button"
          className="article__code-copy"
          onClick={copy}
          data-copied={copied}
          aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
        >
          {copied ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="article__code-surface" tabIndex={0} role="region" aria-label={`${LANGUAGE_LABELS[language] ?? language} code`}>
        {/* Token colors come from CSS variables (index.css) so they follow the theme. */}
        <SyntaxHighlighter
          useInlineStyles={false}
          language={language === 'text' ? undefined : language}
          PreTag="div"
          customStyle={{ margin: 0, padding: '1.1rem 1.25rem' }}
          codeTagProps={{
            className: 'article__code',
            style: {
              display: 'block',
              minWidth: 'max-content',
              whiteSpace: 'pre',
            },
          }}
          showLineNumbers={false}
        >
          {source}
        </SyntaxHighlighter>
      </div>
    </figure>
  );
}
