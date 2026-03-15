import GameHeader from "@/components/GameHeader";
import FeaturedGame from "@/components/FeaturedGame";
import GameRow from "@/components/GameRow";
import { useEffect, useMemo, useRef } from "react";
import { toggleFullScreen } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  hotAndFreeGames,
  newGames,
  topCharts,
  familyGames,
} from "@/constant/gameListArray";
import { RootState } from "@/lib/store";
import soundFile from "@/assets/select_sound.mp3";

const GameList = () => {
  const selectedRow = useSelector(
    (state: RootState) => state.appState.selectedRow,
  );
  const selectedCol = useSelector(
    (state: RootState) => state.appState.selectedCol,
  );
  const gameContainersRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const selected = document.querySelector(".selected-game") as HTMLElement;
    const audio = new Audio(soundFile);
    audio.play();
    if (selected) {
      selected.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedRow, selectedCol]);

  useEffect(() => {
    toggleFullScreen(dispatch);
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <GameHeader />

      {/* Featured Game */}
      <div className="flex-shrink-0 w-full py-4 bg-background px-9">
        <FeaturedGame
          title="Burnin' Rubber 5 Air"
          description="Combative car racing with explosives! Battle your fellow players in a fast paced race while slowdown opponents with rockets, mines and more!"
          rating={5}
          playerCount="1-4"
          tags={["Hero required", "No ad breaks"]}
        />
      </div>
      {/* Game Rows */}
      <div className="flex-1 overflow-hidden w-full scrollbar-hide space-y-2 px-9">
        <div className="pb-2 space-y-2" ref={gameContainersRef}>
          <GameRow
            rowIndex={0}
            title="Hot & Free"
            icon="hot"
            games={hotAndFreeGames}
            onGameClick={() => {}}
            selectedGame={selectedRow === 0 ? selectedCol : null}
          />

          <GameRow
            rowIndex={1}
            title="New"
            icon="new"
            games={newGames}
            onGameClick={() => {}}
            selectedGame={selectedRow === 1 ? selectedCol : null}
          />

          <GameRow
            rowIndex={2}
            title="Top Charts"
            icon="top"
            games={topCharts}
            onGameClick={() => {}}
            selectedGame={selectedRow === 2 ? selectedCol : null}
          />

          <GameRow
            rowIndex={3}
            title="Kids & Family"
            icon="family"
            games={familyGames}
            onGameClick={() => {}}
            selectedGame={selectedRow === 3 ? selectedCol : null}
          />
        </div>
      </div>
    </div>
  );
};
export default GameList;
