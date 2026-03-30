import { lazy } from "react";

const SnakeController = lazy(() => import("@/games/snake/controller"));
const SnakeGame = lazy(() => import("@/games/snake/snakeGame"));

export const gameMap = {
    snake_grid: {
    game: SnakeGame,
    controller: SnakeController
  },
} 