"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
}

export function YellowStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create stars
    const stars: Star[] = [];
    const starCount = Math.min(300, Math.floor((window.innerWidth * window.innerHeight) / 3000));

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: 0.005 + Math.random() * 0.015,
        twinkleSpeed: 0.5 + Math.random() * 1.5,
      });
    }

    // Animation
    let time = 0;
    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines for nearby stars
      const connectionDistance = 120;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.06;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(234, 179, 8, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * 0.02 * star.twinkleSpeed + star.x) * 0.4 + 0.6;
        const currentOpacity = star.opacity * twinkle;

        const yellowHue = 40 + Math.sin(star.x * 0.01) * 10;
        const saturation = 80 + Math.sin(star.y * 0.01) * 20;
        const lightness = 50 + Math.sin(time * 0.01 + star.y) * 30;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * (0.8 + Math.sin(time * 0.01 + star.x) * 0.2), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${yellowHue}, ${saturation}%, ${lightness}%, ${currentOpacity * 0.9})`;
        ctx.fill();

        // Glow effect for larger stars
        if (star.size > 1.5) {
          const glowSize = star.size * 3 + Math.sin(time * 0.01 + star.x) * 1;
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, glowSize
          );
          gradient.addColorStop(0, `rgba(234, 179, 8, ${currentOpacity * 0.1})`);
          gradient.addColorStop(1, "rgba(234, 179, 8, 0)");
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ background: "black" }}
    />
  );
}