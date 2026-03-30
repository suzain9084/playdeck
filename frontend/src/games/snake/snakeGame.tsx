import { RootState } from '@/lib/store';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const SnakeGame = ({ socket }) => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('START');
  const [score, setScore] = useState(0);
  const roomId = useSelector((state: RootState) => state.appState.roomId);
  const screenSocket = useSelector((state: RootState) => state.appState.screenId);

  const gameRef = useRef({
    snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }],
    food: { x: 15, y: 10 },
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    gridSize: 10,
    lastTime: 0,
    speed: 140,
    player: "",
  });

  const handleAction = useCallback((e) => {
    const data = e.detail;
    if (data.event === "start") {
      gameRef.current.player = data.to;
      resetGame();
    } else if (data.event === "action") {
      if (data.direction.x !== 0) gameRef.current.nextDir = { x: data.direction.x, y: 0 };
      if (data.direction.y !== 0) gameRef.current.nextDir = { x: 0, y: data.direction.y };
    }
  }, [])

  useEffect(() => {
    window.addEventListener("snake-grid/action", handleAction)
    return () => window.removeEventListener("snake-grid/action", handleAction);
  }, [handleAction]);

  const resetGame = () => {
    gameRef.current.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    gameRef.current.dir = { x: 1, y: 0 };
    gameRef.current.nextDir = { x: 1, y: 0 };
    setScore(0);
    setGameState('PLAYING');
  };

  const handleGameOver = useCallback(() => {
    setGameState("OVER");
    socket.current.send(JSON.stringify({
      to: gameRef.current.player,
      from: screenSocket,
      event: "over",
      room_id: roomId
    }))
  }, [roomId, screenSocket, socket])

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const update = (time) => {
      const g = gameRef.current;

      if (time - g.lastTime > g.speed) {
        g.lastTime = time;
        g.dir = g.nextDir;

        const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y };

        const cols = Math.floor(canvas.width / g.gridSize);
        const rows = Math.floor(canvas.height / g.gridSize);

        // Collision Logic
        if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows ||
          g.snake.some(s => s.x === head.x && s.y === head.y)) {
          handleGameOver();
          return;
        }

        g.snake.unshift(head);

        // Food Logic  
        if (head.x === g.food.x && head.y === g.food.y) {
          setScore(s => s + 1);
          g.food = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
          };
        } else {
          g.snake.pop();
        }
      }

      // Render
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Food
      ctx.fillStyle = "#f87171";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#ef4444";
      ctx.beginPath();
      ctx.arc((g.food.x * g.gridSize) + g.gridSize / 2, (g.food.y * g.gridSize) + g.gridSize / 2, g.gridSize / 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Snake
      g.snake.forEach((part, i) => {
        ctx.fillStyle = i === 0 ? "#10b981" : "#34d399";
        ctx.beginPath();
        ctx.roundRect(part.x * g.gridSize, part.y * g.gridSize, g.gridSize - 2, g.gridSize - 2, i === 0 ? 6 : 4);
        ctx.fill();
      });

      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, [gameState, handleGameOver]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-slate-950 font-sans overflow-hidden">
      {/* Score Header */}
      <div className="absolute top-10 flex items-center gap-8">
        <div className="text-center">
          <p className="text-slate-500 text-xs uppercase tracking-tighter">Current Score</p>
          <p className="text-4xl font-black text-white">{score}</p>
        </div>
      </div>

      {/* Canvas Game Board */}
      <canvas
        ref={canvasRef}
        width={700}
        height={500}
        className="rounded-xl bg-slate-900 shadow-2xl ring-1 ring-white/10"
      />

      {/* Overlays */}
      {gameState !== 'PLAYING' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <h1 className="mb-8 text-6xl font-black tracking-tighter text-white">
            {gameState === 'START' ? 'READY?' : 'GAME OVER'}
          </h1>
          <button
            onClick={resetGame}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-emerald-500 px-10 py-4 font-bold text-white transition-all hover:bg-emerald-400 active:scale-95"
          >
            {gameState === 'START' ? 'START MISSION' : 'RETRY'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;