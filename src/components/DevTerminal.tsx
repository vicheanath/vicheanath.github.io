import { useState, useRef, useEffect, useTransition } from 'react';
import { Terminal, Send, RotateCcw, Copy, Check } from 'lucide-react';
import { profile } from '../content/profile';

interface CommandOutput {
  command: string;
  output: string | React.ReactNode;
}

export default function DevTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'whoami',
      output: (
        <div>
          <span className="terminal__highlight">{profile.name}</span> — {profile.headline}
          <div className="terminal__subtext">📍 {profile.location} · 6+ Years Full-Stack Engineering</div>
        </div>
      ),
    },
    {
      command: 'skills --core',
      output: (
        <div className="terminal__tags">
          <span className="terminal__tag terminal__tag--csharp">C# .NET 9</span>
          <span className="terminal__tag terminal__tag--react">React 19</span>
          <span className="terminal__tag terminal__tag--ts">TypeScript</span>
          <span className="terminal__tag terminal__tag--azure">Azure Cloud</span>
          <span className="terminal__tag terminal__tag--sql">SQL Server</span>
          <span className="terminal__tag terminal__tag--arch">Clean Architecture</span>
          <span className="terminal__tag terminal__tag--cloud">Docker &amp; CI/CD</span>
        </div>
      ),
    },
  ]);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const [, startTransition] = useTransition();

  const availableCommands = ['whoami', 'skills', 'architecture', 'projects', 'contact', 'clear', 'help'];

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear' || cmd === 'cls') {
      setHistory([]);
      setInput('');
      return;
    }

    let output: string | React.ReactNode;

    switch (cmd) {
      case 'whoami':
        output = (
          <div>
            <p><strong>{profile.name}</strong> ({profile.pronouns ?? 'He/Him'})</p>
            <p>{profile.about}</p>
          </div>
        );
        break;

      case 'skills':
      case 'skills --all':
        output = (
          <div className="terminal__output-block">
            <div><strong className="terminal__key">Frontend:</strong> React 19, TypeScript, Next.js, Angular, GSAP, CSS3, TailwindCSS</div>
            <div><strong className="terminal__key">Backend:</strong> C#, .NET 9/8 Core, ASP.NET Web API, Minimal APIs, Python, REST, OAuth2</div>
            <div><strong className="terminal__key">Patterns:</strong> Clean Architecture, CQRS, MediatR, Domain-Driven Design (DDD), Microservices</div>
            <div><strong className="terminal__key">Databases:</strong> Microsoft SQL Server, PostgreSQL, Redis, Entity Framework Core, Dapper</div>
            <div><strong className="terminal__key">Cloud/DevOps:</strong> Microsoft Azure, AWS, Docker, Kubernetes, CI/CD, Git</div>
          </div>
        );
        break;

      case 'architecture':
        output = (
          <pre className="terminal__ascii-art">
{`+-----------------------------------------------------------+
| React 19 + GSAP UI (Vite / SSR)                           |
+-----------------------------+-----------------------------+
                              | HTTPS / REST / gRPC
+-----------------------------v-----------------------------+
| ASP.NET Core Web API (Minimal APIs / JWT / Rate Limiter)  |
+-----------------------------+-----------------------------+
                              | CQRS & MediatR Pipeline
+-----------------------------v-----------------------------+
| Domain Layer (Entities, Value Objects, Domain Events)     |
+-----------------------------+-----------------------------+
                              | EF Core / Dapper
+-----------------------------v-----------------------------+
| SQL Server / PostgreSQL  <--->  Redis Distributed Cache   |
+-----------------------------------------------------------+`}
          </pre>
        );
        break;

      case 'projects':
        output = (
          <div className="terminal__output-block">
            <div>🚀 <strong>vailabel-studio</strong> — Audio/visual labeling studio for ML datasets</div>
            <div>⚡ <strong>SearchBugs</strong> — High performance log search & bug telemetry</div>
            <div>🛍️ <strong>kroma-pos</strong> — Modern Point of Sale system (.NET Core + React)</div>
            <div>🏗️ <strong>CleanArchitecture</strong> — Enterprise .NET template with CQRS & MediatR</div>
            <div className="terminal__hint">Type or click &quot;blog&quot; or visit /projects to view all.</div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="terminal__output-block">
            <div>💼 LinkedIn: <a href={profile.linkedInUrl} target="_blank" rel="noreferrer">{profile.linkedInUrl}</a></div>
            <div>🐙 GitHub: <a href="https://github.com/vicheanath" target="_blank" rel="noreferrer">https://github.com/vicheanath</a></div>
            <div>📍 Location: {profile.location}</div>
          </div>
        );
        break;

      case 'help':
        output = (
          <div className="terminal__output-block">
            <div>Available commands:</div>
            <div className="terminal__cmd-list">
              {availableCommands.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="terminal__quick-cmd"
                  onClick={() => executeCommand(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        );
        break;

      default:
        output = (
          <div className="terminal__error">
            command not found: <code>{rawCmd}</code>. Type <button type="button" className="terminal__quick-cmd" onClick={() => executeCommand('help')}>help</button> for available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }]);
    setInput('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  const handleCopy = () => {
    const text = history.map(h => `$ ${h.command}\n${typeof h.output === 'string' ? h.output : ''}`).join('\n');
    navigator.clipboard?.writeText(text || 'Vichea Nath - Software Engineer');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dev-terminal" role="region" aria-label="Interactive Developer Terminal">
      <div className="dev-terminal__header">
        <div className="dev-terminal__dots" aria-hidden>
          <span className="dev-terminal__dot dev-terminal__dot--red" />
          <span className="dev-terminal__dot dev-terminal__dot--yellow" />
          <span className="dev-terminal__dot dev-terminal__dot--green" />
        </div>
        <div className="dev-terminal__title">
          <Terminal size={14} aria-hidden />
          <span>vichea@ced-workstation: ~/portfolio</span>
        </div>
        <div className="dev-terminal__actions">
          <button
            type="button"
            className="dev-terminal__btn"
            onClick={handleCopy}
            title="Copy terminal session"
            aria-label="Copy terminal session"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          <button
            type="button"
            className="dev-terminal__btn"
            onClick={() => setHistory([])}
            title="Clear terminal"
            aria-label="Clear terminal"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <div className="dev-terminal__body">
        <div className="dev-terminal__welcome">
          <span className="terminal__dim">// Type a command or click suggestions below:</span>
        </div>

        <div className="dev-terminal__chips">
          {availableCommands.slice(0, 5).map((cmd) => (
            <button
              key={cmd}
              type="button"
              className="dev-terminal__chip"
              onClick={() => {
                startTransition(() => {
                  executeCommand(cmd);
                });
              }}
            >
              $ {cmd}
            </button>
          ))}
        </div>

        <div className="dev-terminal__history">
          {history.map((item, idx) => (
            <div key={idx} className="dev-terminal__entry">
              <div className="dev-terminal__prompt-line">
                <span className="dev-terminal__user">vichea</span>
                <span className="dev-terminal__symbol">➜</span>
                <span className="dev-terminal__dir">~</span>
                <span className="dev-terminal__cmd">{item.command}</span>
              </div>
              <div className="dev-terminal__output">{item.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="dev-terminal__input-row">
          <span className="dev-terminal__user" aria-hidden>vichea</span>
          <span className="dev-terminal__symbol" aria-hidden>➜</span>
          <span className="dev-terminal__dir" aria-hidden>~</span>
          <input
            type="text"
            className="dev-terminal__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' or 'skills'..."
            aria-label="Terminal input command"
            autoComplete="off"
            spellCheck={false}
          />
          <button type="submit" className="dev-terminal__submit" aria-label="Run command">
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
