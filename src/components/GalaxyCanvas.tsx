import React, { useEffect, useRef } from 'react';
import {
  ActiveProjectile,
  LaserBeam,
  Particle,
  FloatingText,
  GameSettings,
} from '../types';

interface GalaxyCanvasProps {
  projectiles: ActiveProjectile[];
  laserBeams: LaserBeam[];
  particles: Particle[];
  floatingTexts: FloatingText[];
  baseHp: number;
  maxBaseHp: number;
  currentInput: string;
  targetedProjectileId: string | null;
  turretAngle: number;
  isFiring: boolean;
  settings: GameSettings;
  screenShake: number;
  onCanvasClick?: (clickXPercent: number, clickYPercent: number) => void;
}

export const GalaxyCanvas: React.FC<GalaxyCanvasProps> = ({
  projectiles,
  laserBeams,
  particles,
  floatingTexts,
  baseHp,
  maxBaseHp,
  currentInput,
  targetedProjectileId,
  turretAngle,
  isFiring,
  settings,
  screenShake,
  onCanvasClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Array<{ x: number; y: number; size: number; speed: number; brightness: number }>>([]);
  const pulseTimerRef = useRef<number>(0);

  // Initialize starfield
  useEffect(() => {
    const count = 120;
    const stars: Array<{ x: number; y: number; size: number; speed: number; brightness: number }> = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.05 + 0.01,
        brightness: Math.random() * 0.8 + 0.2,
      });
    }
    starsRef.current = stars;
  }, []);

  // Handle dynamic canvas sizing with ResizeObserver & initial mount calculation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const updateSize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = Math.floor(rect.width);
        canvas.height = Math.floor(rect.height);
      }
    };

    updateSize();

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          canvas.width = Math.floor(width);
          canvas.height = Math.floor(height);
        }
      }
    });

    observer.observe(canvas.parentElement);
    return () => observer.disconnect();
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width || 800;
      const height = canvas.height || 600;
      const now = Date.now();
      pulseTimerRef.current += 0.03;

      // Handle screen shake
      ctx.save();
      if (screenShake > 0) {
        const shakeX = (Math.random() - 0.5) * screenShake * 16;
        const shakeY = (Math.random() - 0.5) * screenShake * 16;
        ctx.translate(shakeX, shakeY);
      }

      // Background: Clean solid deep space
      ctx.fillStyle = '#070a13';
      ctx.fillRect(0, 0, width, height);

      // Draw drifting starfield
      starsRef.current.forEach(star => {
        star.y += star.speed * 0.03;
        if (star.y > 1) star.y = 0;
        const sx = star.x * width;
        const sy = star.y * height;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Base Energy Shield at bottom
      const shieldY = height - 60;
      const shieldHpPercent = Math.max(0, baseHp / maxBaseHp);

      // Shield Forcefield Curve with solid clean alpha
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.quadraticCurveTo(width * 0.5, shieldY - 20, width, height);
      ctx.closePath();

      if (shieldHpPercent > 0.5) {
        ctx.fillStyle = 'rgba(14, 165, 233, 0.12)';
      } else if (shieldHpPercent > 0.25) {
        ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
      } else {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
      }
      ctx.fill();

      // Shield Top Outline
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.quadraticCurveTo(width * 0.5, shieldY - 20, width, height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = shieldHpPercent > 0.5
        ? '#38bdf8'
        : shieldHpPercent > 0.25
        ? '#facc15'
        : '#ef4444';
      ctx.stroke();

      // Draw Turret Base at bottom center
      const turretX = width * 0.5;
      const turretY = height - 35;

      // Turret base ring
      ctx.beginPath();
      ctx.arc(turretX, turretY + 10, 36, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Cannon Barrel (Rotates toward target)
      ctx.save();
      ctx.translate(turretX, turretY);
      ctx.rotate(turretAngle);

      // Gun recoil translation if firing
      const recoilOffset = isFiring ? 8 : 0;

      // Twin Gun Barrels
      ctx.fillStyle = '#334155';
      ctx.fillRect(-10, -38 + recoilOffset, 7, 36);
      ctx.fillRect(3, -38 + recoilOffset, 7, 36);

      // Barrel tips
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-10, -42 + recoilOffset, 7, 5);
      ctx.fillRect(3, -42 + recoilOffset, 7, 5);

      // Turret core dome
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fillStyle = isFiring ? '#38bdf8' : '#0f172a';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Core center indicator
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fillStyle = isFiring ? '#ffffff' : '#38bdf8';
      ctx.fill();

      ctx.restore();

      // Draw Laser Beams
      laserBeams.forEach(beam => {
        const elapsed = now - beam.createdAt;
        const progress = Math.min(1, elapsed / beam.duration);
        const alpha = 1 - progress;

        const bx1 = (beam.startX / 100) * width;
        const by1 = (beam.startY / 100) * height;
        const bx2 = (beam.targetX / 100) * width;
        const by2 = (beam.targetY / 100) * height;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(bx1, by1);
        ctx.lineTo(bx2, by2);
        ctx.strokeStyle = beam.color;
        ctx.lineWidth = 4 * alpha;
        ctx.shadowColor = beam.color;
        ctx.shadowBlur = 16;
        ctx.globalAlpha = alpha;
        ctx.stroke();

        // Inner white beam
        ctx.beginPath();
        ctx.moveTo(bx1, by1);
        ctx.lineTo(bx2, by2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2 * alpha;
        ctx.stroke();

        ctx.restore();
      });

      // Draw Particles
      particles.forEach(p => {
        const px = (p.x / 100) * width;
        const py = (p.y / 100) * height;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.5, p.size * (p.life / p.maxLife)), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      // Draw Falling Hanzi Projectiles (Pure Practice)
      projectiles.forEach(p => {
        const px = (p.x / 100) * width;
        const py = (p.y / 100) * height;
        const isTargeted = p.id === targetedProjectileId;

        ctx.save();
        ctx.translate(px, py);

        // Meteor Hazard Glow / Aura
        const isBoss = p.hazardType === 'boss';
        const isFast = p.hazardType === 'fast';
        const cardWidth = Math.max(96, p.word.hanzi.length * 34 + 36);
        const cardHeight = settings.showEnglishHint ? 64 : 52;

        // Projectile Container (Futuristic Sci-Fi Pod)
        ctx.beginPath();
        const r = 10;
        const x0 = -cardWidth / 2;
        const y0 = -cardHeight / 2;
        if (ctx.roundRect) {
          ctx.roundRect(x0, y0, cardWidth, cardHeight, r);
        } else {
          ctx.rect(x0, y0, cardWidth, cardHeight);
        }

        // Solid background of Hanzi Pod
        if (isTargeted) {
          ctx.fillStyle = '#0f172a';
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.5;
        } else if (isBoss) {
          ctx.fillStyle = '#1e111a';
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
        } else if (isFast) {
          ctx.fillStyle = '#1e1a11';
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
        } else {
          ctx.fillStyle = '#0f172a';
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.5;
        }
        ctx.fill();
        ctx.stroke();

        // Draw Targeting Reticle if targeted
        if (isTargeted) {
          const reticleOffset = 6;
          const cornerLen = 10;
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;

          // Top Left
          ctx.beginPath();
          ctx.moveTo(x0 - reticleOffset, y0 - reticleOffset + cornerLen);
          ctx.lineTo(x0 - reticleOffset, y0 - reticleOffset);
          ctx.lineTo(x0 - reticleOffset + cornerLen, y0 - reticleOffset);
          ctx.stroke();

          // Top Right
          ctx.beginPath();
          ctx.moveTo(x0 + cardWidth + reticleOffset - cornerLen, y0 - reticleOffset);
          ctx.lineTo(x0 + cardWidth + reticleOffset, y0 - reticleOffset);
          ctx.lineTo(x0 + cardWidth + reticleOffset, y0 - reticleOffset + cornerLen);
          ctx.stroke();

          // Bottom Left
          ctx.beginPath();
          ctx.moveTo(x0 - reticleOffset, y0 + cardHeight + reticleOffset - cornerLen);
          ctx.lineTo(x0 - reticleOffset, y0 + cardHeight + reticleOffset);
          ctx.lineTo(x0 - reticleOffset + cornerLen, y0 + cardHeight + reticleOffset);
          ctx.stroke();

          // Bottom Right
          ctx.beginPath();
          ctx.moveTo(x0 + cardWidth + reticleOffset - cornerLen, y0 + cardHeight + reticleOffset);
          ctx.lineTo(x0 + cardWidth + reticleOffset, y0 + cardHeight + reticleOffset);
          ctx.lineTo(x0 + cardWidth + reticleOffset, y0 + cardHeight + reticleOffset - cornerLen);
          ctx.stroke();
        }

        // Draw Chinese Characters (Hanzi) prominently
        ctx.font = 'bold 24px "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isTargeted ? '#ffffff' : '#f8fafc';
        ctx.fillText(p.word.hanzi, 0, settings.showEnglishHint ? -8 : 0);

        // Draw English Meaning clearly inside the card (No Pinyin) if enabled in settings
        if (settings.showEnglishHint && p.word.english) {
          ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.fillStyle = isTargeted ? '#7dd3fc' : '#cbd5e1';
          const maxCharLen = Math.floor(cardWidth / 7.2);
          const displayEnglish = p.word.english.length > maxCharLen
            ? p.word.english.slice(0, maxCharLen - 2) + '..'
            : p.word.english;
          ctx.fillText(displayEnglish, 0, 14);
        }

        // Optional debug / setting override if user turns Pinyin back on in settings
        if (settings.showPinyinHint) {
          ctx.font = '500 10px monospace';
          ctx.fillStyle = '#64748b';
          ctx.fillText(p.word.pinyin, 0, cardHeight / 2 + 12);
        }

        // Multi-HP boss badge
        if (p.maxHp > 1) {
          ctx.beginPath();
          ctx.arc(cardWidth / 2 - 2, -cardHeight / 2 + 2, 10, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText(p.hp.toString(), cardWidth / 2 - 2, -cardHeight / 2 + 2);
        }

        ctx.restore();
      });

      // Draw Floating Combat Texts (+150, Combo x3, etc.)
      floatingTexts.forEach(ft => {
        const elapsed = now - ft.createdAt;
        const progress = Math.min(1, elapsed / ft.duration);
        const alpha = 1 - progress;
        const floatY = (ft.y / 100) * height - progress * 40;
        const floatX = (ft.x / 100) * width;

        ctx.save();
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = ft.color;
        ctx.shadowColor = ft.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = alpha;
        ctx.fillText(ft.text, floatX, floatY);
        ctx.restore();
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [
    projectiles,
    laserBeams,
    particles,
    floatingTexts,
    baseHp,
    maxBaseHp,
    currentInput,
    targetedProjectileId,
    turretAngle,
    isFiring,
    settings,
    screenShake,
  ]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!onCanvasClick) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickXPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const clickYPercent = ((e.clientY - rect.top) / rect.height) * 100;
    onCanvasClick(clickXPercent, clickYPercent);
  };

  return (
    <div id="galaxy-canvas-container" className="relative w-full h-full overflow-hidden select-none">
      <canvas
        id="galaxy-game-canvas"
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        className="w-full h-full block cursor-crosshair"
      />
    </div>
  );
};
