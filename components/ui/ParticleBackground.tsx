"use client";

import { useEffect, useRef, memo } from "react";

interface Ball {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

// グローバルにボールの状態を保持（再マウント時も継続）
let globalBalls: Ball[] | null = null;
let isInitialized = false;

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 既に初期化済みでボールが存在する場合はスキップ
    if (isInitialized && globalBalls && globalBalls.length > 0) {
      ballsRef.current = globalBalls;
      // 既存のボールでアニメーションを再開
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ballsRef.current.forEach((ball) => {
          ball.x += ball.speedX;
          ball.y += ball.speedY;
          if (ball.x < ball.size || ball.x > canvas.width - ball.size) {
            ball.speedX *= -1;
          }
          if (ball.y < ball.size || ball.y > canvas.height - ball.size) {
            ball.speedY *= -1;
          }
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
          ctx.globalAlpha = 0.4;
          ctx.fillStyle = ball.color;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        });
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animate();
      
      // リサイズ処理
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ballsRef.current.forEach((ball) => {
          if (ball.x < 0) ball.x = ball.size;
          if (ball.x > canvas.width) ball.x = canvas.width - ball.size;
          if (ball.y < 0) ball.y = ball.size;
          if (ball.y > canvas.height) ball.y = canvas.height - ball.size;
        });
      };
      window.addEventListener("resize", handleResize);
      
      return () => {
        window.removeEventListener("resize", handleResize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = undefined;
        }
      };
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // カラフルな色の配列
    const colors = [
      "#3b82f6", // blue
      "#8b5cf6", // violet
      "#ec4899", // pink
      "#f59e0b", // amber
      "#10b981", // emerald
      "#06b6d4", // cyan
    ];

    // キャンバスサイズ設定
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    // ボール生成
    const createBalls = () => {
      const count = 6;
      const balls: Ball[] = [];

      for (let i = 0; i < count; i++) {
        balls.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 30 + 25, // 25〜55px（大きく）
          speedX: (Math.random() - 0.5) * 2, // 速度を上げて大きく動き回る
          speedY: (Math.random() - 0.5) * 2, // 速度を上げて大きく動き回る
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      return balls;
    };

    // 既存のボールがあれば再利用、なければ新規作成
    if (globalBalls && globalBalls.length > 0) {
      ballsRef.current = globalBalls;
    } else {
      ballsRef.current = createBalls();
      globalBalls = ballsRef.current;
    }

    isInitialized = true;

    // アニメーション
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ballsRef.current.forEach((ball) => {
        // 位置更新
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        // 境界処理
        if (ball.x < ball.size || ball.x > canvas.width - ball.size) {
          ball.speedX *= -1;
        }
        if (ball.y < ball.size || ball.y > canvas.height - ball.size) {
          ball.speedY *= -1;
        }

        // ボールを描画（透明度を上げる）
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
        ctx.globalAlpha = 0.4; // 透明度を上げる（薄くする）
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.globalAlpha = 1.0; // 透明度をリセット
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // リサイズ処理（ボールは再生成しない）
    const handleResize = () => {
      resize();
      // ボールの位置を調整（画面外に出た場合は内側に戻す）
      ballsRef.current.forEach((ball) => {
        if (ball.x < 0) ball.x = ball.size;
        if (ball.x > canvas.width) ball.x = canvas.width - ball.size;
        if (ball.y < 0) ball.y = ball.size;
        if (ball.y > canvas.height) ball.y = canvas.height - ball.size;
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // アニメーションを停止
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// メモ化して再レンダリングを防ぐ
export default memo(ParticleBackground);
