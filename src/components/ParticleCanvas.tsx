import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 480);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 480;
    };

    window.addEventListener('resize', handleResize);

    // Dynamic tech particle network
    const count = Math.min(Math.floor(width / 18), 55);
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulseOffset: number;
    }> = [];

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.4 + 0.25,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      const isDarkMode =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

      const dotRgb = isDarkMode ? '124, 45, 24' : '160, 60, 35';
      const lineRgb = isDarkMode ? '200, 140, 110' : '120, 90, 75';

      // Draw subtle glowing background radial gradient under mouse
      if (mouseX > 0 && mouseY > 0) {
        const glowGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 180);
        glowGrad.addColorStop(0, isDarkMode ? 'rgba(124, 45, 24, 0.12)' : 'rgba(124, 45, 24, 0.06)');
        glowGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update and connect nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        // Mouse avoidance/interactive gravity
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 0) {
          const force = (1 - dist / 120) * 0.8;
          node.x -= (dx / dist) * force;
          node.y -= (dy / dist) * force;
        }

        const alpha = node.baseAlpha + Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.15;

        // Draw particle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotRgb}, ${Math.max(0.1, alpha)})`;
        ctx.fill();

        // Connect lines
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist2 = Math.hypot(node.x - n2.x, node.y - n2.y);
          if (dist2 < 110) {
            const lineAlpha = (1 - dist2 / 110) * (isDarkMode ? 0.22 : 0.14);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(${lineRgb}, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__particles" aria-hidden="true" />;
}
