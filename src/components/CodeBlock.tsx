import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  source: string;
}

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
        <figcaption className="article__code-label">{language}</figcaption>
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
      <div className="article__code-surface">
        <SyntaxHighlighter
          style={oneDark}
          language={language === 'text' ? undefined : language}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: '1rem 1.1rem',
            borderRadius: 0,
            border: 'none',
            background: 'transparent',
          }}
          codeTagProps={{
            style: {
              display: 'block',
              fontSize: '0.92rem',
              lineHeight: 1.65,
              padding: 0,
              minWidth: 'max-content',
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
