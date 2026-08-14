import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface TechNode {
  id: string;
  name: string;
  short: string;
  logo: string;
  color: string;
  glow: string;
  connections: string[];
  x: number; // base % of viewport
  y: number; // base % of viewport
  size: number;
}

const TECH_NODES: TechNode[] = [
  {
    id: 'dotnet',
    name: '.NET 9 Core',
    short: '.NET 9',
    logo: '/logos/dotnetcore.webp',
    color: '#512bd4',
    glow: 'rgba(81, 43, 212, 0.45)',
    connections: ['csharp', 'azure', 'sqlserver', 'entra'],
    x: 10,
    y: 3,
    size: 46,
  },
  {
    id: 'csharp',
    name: 'C# 13',
    short: 'C#',
    logo: '/logos/csharp.webp',
    color: '#9b4993',
    glow: 'rgba(155, 73, 147, 0.45)',
    connections: ['dotnet', 'sqlserver', 'typescript'],
    x: 48,
    y: 30,
    size: 42,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    short: 'TypeScript',
    logo: '/logos/typescript.webp',
    color: '#3178c6',
    glow: 'rgba(49, 120, 198, 0.45)',
    connections: ['react', 'csharp', 'dotnet', 'vite'],
    x: 58,
    y: 18,
    size: 44,
  },
  {
    id: 'react',
    name: 'React 19',
    short: 'React 19',
    logo: '/logos/react.webp',
    color: '#61dafb',
    glow: 'rgba(97, 218, 251, 0.5)',
    connections: ['typescript', 'vite', 'entra'],
    x: 74,
    y: 10,
    size: 48,
  },
  {
    id: 'vite',
    name: 'Vite Tooling',
    short: 'Vite',
    logo: '/logos/vite.webp',
    color: '#646cff',
    glow: 'rgba(100, 108, 255, 0.45)',
    connections: ['react', 'js', 'typescript'],
    x: 88,
    y: 20,
    size: 44,
  },
  {
    id: 'entra',
    name: 'Microsoft Entra ID',
    short: 'Entra ID',
    logo: '/logos/entra.webp',
    color: '#008ad7',
    glow: 'rgba(0, 138, 215, 0.45)',
    connections: ['dotnet', 'azure', 'react'],
    x: 46,
    y: 56,
    size: 42,
  },
  {
    id: 'azuredevops',
    name: 'Azure DevOps',
    short: 'DevOps',
    logo: '/logos/azuredevops.jpg',
    color: '#0078d4',
    glow: 'rgba(0, 120, 212, 0.45)',
    connections: ['azure', 'dotnet'],
    x: 38,
    y: 72,
    size: 42,
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    short: 'Azure',
    logo: '/logos/azure.webp',
    color: '#0078d4',
    glow: 'rgba(0, 120, 212, 0.45)',
    connections: ['dotnet', 'azuredevops', 'entra', 'js'],
    x: 62,
    y: 78,
    size: 46,
  },
  {
    id: 'js',
    name: 'JavaScript / Node',
    short: 'JavaScript',
    logo: '/logos/js.png',
    color: '#f7df1e',
    glow: 'rgba(247, 223, 30, 0.45)',
    connections: ['vite', 'azure', 'psql'],
    x: 84,
    y: 80,
    size: 42,
  },
  {
    id: 'sqlserver',
    name: 'SQL Server',
    short: 'SQL Server',
    logo: '/logos/sqlserver.jpg',
    color: '#cc292b',
    glow: 'rgba(204, 41, 43, 0.45)',
    connections: ['dotnet', 'psql', 'azuredevops'],
    x: 48,
    y: 84,
    size: 44,
  },
  {
    id: 'psql',
    name: 'PostgreSQL',
    short: 'Postgres',
    logo: '/logos/psql.webp',
    color: '#336791',
    glow: 'rgba(51, 103, 145, 0.45)',
    connections: ['sqlserver', 'js'],
    x: 22,
    y: 92,
    size: 42,
  },
];

export default function ConnectedTechNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodePositions = useRef<{ [key: string]: { x: number; y: number; baseX: number; baseY: number } }>({});
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth || document.documentElement.clientWidth);
    let height = (canvas.height = container.clientHeight || (window.innerHeight - 65));

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth || document.documentElement.clientWidth;
      height = canvas.height = container.clientHeight || (window.innerHeight - 65);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    TECH_NODES.forEach((n) => {
      nodePositions.current[n.id] = {
        x: (n.x / 100) * width,
        y: (n.y / 100) * height,
        baseX: (n.x / 100) * width,
        baseY: (n.y / 100) * height,
      };
    });

    let time = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const containerRect = container.getBoundingClientRect();
      targetMouseX = e.clientX - containerRect.left;
      targetMouseY = e.clientY - containerRect.top;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // IntersectionObserver to pause loop when hero is offscreen (saves GPU/CPU cycles)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // GSAP floating animations for each badge DOM element
    const ctxGsap = gsap.context(() => {
      TECH_NODES.forEach((node, idx) => {
        const el = document.getElementById(`connected-badge-${node.id}`);
        if (!el) return;

        gsap.to(el, {
          y: idx % 2 === 0 ? -12 : 12,
          x: idx % 3 === 0 ? -8 : 8,
          duration: 4.5 + (idx % 4) * 0.9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: idx * 0.2,
        });
      });
    }, containerRef);

    const render = () => {
      if (!isVisibleRef.current) {
        animationFrameId = 0;
        return;
      }

      time += 0.022;
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.07;
      mouseY += (targetMouseY - mouseY) * 0.07;

      const isDarkMode =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      // Update positions based on DOM elements relative to container
      const containerRect = container.getBoundingClientRect();
      const containerLeft = containerRect.left;
      const containerTop = containerRect.top;

      TECH_NODES.forEach((n) => {
        const el = document.getElementById(`connected-badge-${n.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          nodePositions.current[n.id] = {
            x: rect.left - containerLeft + rect.width / 2,
            y: rect.top - containerTop + rect.height / 2,
            baseX: (n.x / 100) * width,
            baseY: (n.y / 100) * height,
          };
        }
      });

      // Draw Connection Lines between Nodes inside container boundary
      const drawnConnections = new Set<string>();

      TECH_NODES.forEach((node) => {
        const p1 = nodePositions.current[node.id];
        if (!p1) return;

        node.connections.forEach((targetId) => {
          const pairKey = [node.id, targetId].sort().join('--');
          if (drawnConnections.has(pairKey)) return;
          drawnConnections.add(pairKey);

          const targetNode = TECH_NODES.find((t) => t.id === targetId);
          const p2 = nodePositions.current[targetId];
          if (!p2 || !targetNode) return;

          const isHighlight =
            hoveredNode === node.id || hoveredNode === targetId;

          const baseAlpha = isHighlight
            ? 0.8
            : isDarkMode
            ? 0.22
            : 0.16;

          const lineWidth = isHighlight ? 2.5 : 1.2;

          // Draw Curved Connection Line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);

          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2 + Math.sin(time + p1.x * 0.01) * 12;
          ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);

          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, node.color);
          grad.addColorStop(1, targetNode.color);

          ctx.strokeStyle = grad;
          ctx.lineWidth = lineWidth;
          ctx.globalAlpha = baseAlpha;
          ctx.stroke();

          if (isHighlight) {
            ctx.shadowColor = node.color;
            ctx.shadowBlur = 14;
            ctx.stroke();
          }
          ctx.restore();

          // Flowing Data Pulse Particle
          const pulseOffset = (time * 0.5 + (p1.x + p1.y) * 0.004) % 1;
          const t = pulseOffset;
          const qx = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * midX + t * t * p2.x;
          const qy = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * midY + t * t * p2.y;

          ctx.save();
          ctx.beginPath();
          ctx.arc(qx, qy, isHighlight ? 3.5 : 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = node.color;
          ctx.shadowBlur = isHighlight ? 12 : 5;
          ctx.globalAlpha = isHighlight ? 0.95 : 0.6;
          ctx.fill();
          ctx.restore();
        });
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      ctxGsap.revert();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredNode]);

  return (
    <div className="connected-tech-network" ref={containerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="connected-tech-canvas" />

      {/* Floating Tech Badges with Official Logos */}
      {TECH_NODES.map((node) => (
        <div
          key={node.id}
          id={`connected-badge-${node.id}`}
          className={`connected-badge ${hoveredNode === node.id ? 'connected-badge--active' : ''}`}
          style={{
            left: `clamp(1rem, ${node.x}%, calc(100% - 7.5rem))`,
            top: `clamp(1rem, ${node.y}%, calc(100% - 3.25rem))`,
            borderColor: node.color,
            boxShadow: `0 4px 20px ${node.glow}`,
          }}
          onMouseEnter={() => setHoveredNode(node.id)}
          onMouseLeave={() => setHoveredNode(null)}
          title={`${node.name} (Full-Stack Technology Node)`}
        >
          <img
            src={node.logo}
            alt=""
            aria-hidden="true"
            className="connected-badge__logo-img"
            width={18}
            height={18}
            loading="lazy"
          />
          <span className="connected-badge__text">{node.short}</span>
        </div>
      ))}
    </div>
  );
}
