import { useEffect, useRef } from 'react';

interface DnaNode {
  name: string;
  shortName: string;
  color: string;
  glow: string;
  category: 'backend' | 'frontend' | 'cloud' | 'data';
}

const TECH_PAIRS: Array<[DnaNode, DnaNode]> = [
  [
    { name: '.NET 9 Core', shortName: '.NET', color: '#512BD4', glow: 'rgba(81, 43, 212, 0.7)', category: 'backend' },
    { name: 'React 19', shortName: 'React', color: '#61DAFB', glow: 'rgba(97, 218, 251, 0.7)', category: 'frontend' },
  ],
  [
    { name: 'C# 13', shortName: 'C#', color: '#9B4F96', glow: 'rgba(155, 79, 150, 0.7)', category: 'backend' },
    { name: 'TypeScript', shortName: 'TS', color: '#3178C6', glow: 'rgba(49, 120, 198, 0.7)', category: 'frontend' },
  ],
  [
    { name: 'EF Core 9', shortName: 'EF Core', color: '#6C2BD9', glow: 'rgba(108, 43, 217, 0.7)', category: 'data' },
    { name: 'TanStack', shortName: 'TanStack', color: '#FF4154', glow: 'rgba(255, 65, 84, 0.7)', category: 'frontend' },
  ],
  [
    { name: 'Azure Cloud', shortName: 'Azure', color: '#0078D4', glow: 'rgba(0, 120, 212, 0.7)', category: 'cloud' },
    { name: 'Docker', shortName: 'Docker', color: '#2496ED', glow: 'rgba(36, 150, 237, 0.7)', category: 'cloud' },
  ],
  [
    { name: 'SQL Server', shortName: 'SQL', color: '#CC292B', glow: 'rgba(204, 41, 43, 0.7)', category: 'data' },
    { name: 'Redis Cache', shortName: 'Redis', color: '#DC382D', glow: 'rgba(220, 56, 45, 0.7)', category: 'data' },
  ],
  [
    { name: 'Clean CQRS', shortName: 'CQRS', color: '#059669', glow: 'rgba(5, 150, 105, 0.7)', category: 'backend' },
    { name: 'Next.js', shortName: 'Next', color: '#000000', glow: 'rgba(255, 255, 255, 0.6)', category: 'frontend' },
  ],
  [
    { name: 'MediatR', shortName: 'MediatR', color: '#D97706', glow: 'rgba(217, 119, 6, 0.7)', category: 'backend' },
    { name: 'PostgreSQL', shortName: 'Postgres', color: '#336791', glow: 'rgba(51, 103, 145, 0.7)', category: 'data' },
  ],
];

export default function TechDnaHelix() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };

    window.addEventListener('resize', handleResize);

    let mouseX = width / 2;
    let targetSpeed = 0.015;
    let currentSpeed = 0.015;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      // Faster rotation when hovering sides
      const normX = (mouseX - width / 2) / (width / 2);
      targetSpeed = 0.015 + Math.abs(normX) * 0.018;
    };

    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);

    let rotationAngle = 0;
    let pulseTime = 0;

    const render = () => {
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;
      rotationAngle += currentSpeed;
      pulseTime += 0.04;

      ctx.clearRect(0, 0, width, height);

      const isDarkMode =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      const numPairs = TECH_PAIRS.length;
      const verticalPadding = 50;
      const availableHeight = height - verticalPadding * 2;
      const stepY = availableHeight / (numPairs - 1);
      const centerX = width > 800 ? width * 0.78 : width * 0.5; // Offset to right on desktop for great composition
      const radiusX = Math.min(width * 0.22, 140);

      interface RenderNode {
        x: number;
        y: number;
        z: number;
        scale: number;
        alpha: number;
        tech: DnaNode;
        pairIndex: number;
        strand: 1 | 2;
      }

      const renderNodes: RenderNode[] = [];

      for (let i = 0; i < numPairs; i++) {
        const pair = TECH_PAIRS[i];
        const y = verticalPadding + i * stepY;

        // Helix phase shift along the vertical axis
        const phase = rotationAngle + (i * Math.PI) / 3;

        // Strand 1
        const cos1 = Math.cos(phase);
        const sin1 = Math.sin(phase);
        const x1 = centerX + cos1 * radiusX;
        const z1 = sin1; // -1 (back) to +1 (front)
        const scale1 = 0.65 + (z1 + 1) * 0.25;
        const alpha1 = isDarkMode ? 0.35 + (z1 + 1) * 0.35 : 0.3 + (z1 + 1) * 0.35;

        // Strand 2 (Opposite 180 degrees)
        const cos2 = Math.cos(phase + Math.PI);
        const sin2 = Math.sin(phase + Math.PI);
        const x2 = centerX + cos2 * radiusX;
        const z2 = sin2;
        const scale2 = 0.65 + (z2 + 1) * 0.25;
        const alpha2 = isDarkMode ? 0.35 + (z2 + 1) * 0.35 : 0.3 + (z2 + 1) * 0.35;

        // Draw connecting base-pair rungs (Bonds)
        const avgZ = (z1 + z2) / 2;
        const rungAlpha = Math.max(0.12, (avgZ + 1.5) * 0.2);

        // Draw rung gradient line
        const grad = ctx.createLinearGradient(x1, y, x2, y);
        grad.addColorStop(0, pair[0].color);
        grad.addColorStop(0.5, isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.2)');
        grad.addColorStop(1, pair[1].color);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8 * ((avgZ + 1.5) / 2);
        ctx.globalAlpha = rungAlpha;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();

        // Animated traveling data pulse across the rung
        const packetProgress = (Math.sin(pulseTime + i * 0.8) + 1) / 2;
        const packetX = x1 + (x2 - x1) * packetProgress;
        ctx.save();
        ctx.beginPath();
        ctx.arc(packetX, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 8;
        ctx.globalAlpha = rungAlpha * 1.5;
        ctx.fill();
        ctx.restore();

        renderNodes.push({ x: x1, y, z: z1, scale: scale1, alpha: alpha1, tech: pair[0], pairIndex: i, strand: 1 });
        renderNodes.push({ x: x2, y, z: z2, scale: scale2, alpha: alpha2, tech: pair[1], pairIndex: i, strand: 2 });
      }

      // Draw backbone curves connecting Strand 1 and Strand 2
      for (let s = 1; s <= 2; s++) {
        const strandNodes = renderNodes.filter((n) => n.strand === s);
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i < strandNodes.length; i++) {
          const pt = strandNodes[i];
          if (i === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            const prev = strandNodes[i - 1];
            const midX = (prev.x + pt.x) / 2;
            const midY = (prev.y + pt.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
        }
        ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // Sort nodes by Z-index (Draw back nodes first, front nodes last)
      renderNodes.sort((a, b) => a.z - b.z);

      // Render 3D Tech Nodes
      for (const node of renderNodes) {
        const radius = 18 * node.scale;

        ctx.save();
        ctx.globalAlpha = Math.min(1, Math.max(0.2, node.alpha));

        // Outer Glow
        if (node.z > 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 6, 0, Math.PI * 2);
          ctx.fillStyle = node.tech.glow;
          ctx.filter = 'blur(6px)';
          ctx.fill();
          ctx.filter = 'none';
        }

        // Main Node Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.tech.color;
        ctx.fill();

        // Inner Border / Specular ring
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.9)';
        ctx.stroke();

        // Node Label
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.round(8.5 * node.scale)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 3;
        ctx.fillText(node.tech.shortName, node.x, node.y);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="tech-dna-container" aria-hidden="true">
      <canvas ref={canvasRef} className="tech-dna-canvas" />
    </div>
  );
}
