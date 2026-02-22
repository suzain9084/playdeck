import GameHeader from "@/components/GameHeader";
import FeaturedGame from "@/components/FeaturedGame";
import GameRow from "@/components/GameRow";

// Import game images
import game1 from "@/assets/game-1.jpg";
import game2 from "@/assets/game-2.jpg";
import game3 from "@/assets/game-3.jpg";
import game4 from "@/assets/game-4.jpg";
import game5 from "@/assets/game-5.jpg";
import game6 from "@/assets/game-6.jpg";
import game7 from "@/assets/game-7.jpg";
import game8 from "@/assets/game-8.jpg";
import { useEffect, useRef, useState } from "react";
import { toggleFullScreen } from "@/lib/utils";
import { useDispatch } from "react-redux";

const hotAndFreeGames = [
    { id: "1", title: "Kart Racing", image: game1 },
    { id: "2", title: "Party Fiesta", image: game2 },
    { id: "3", title: "Let's Cook Together", image: game3 },
    { id: "4", title: "Quiz Mania", image: game4 },
    { id: "5", title: "Drawing Party", image: game5 },
    { id: "6", title: "Castle Defense", image: game6 },
    { id: "7", title: "Golazo Soccer", image: game7 },
    { id: "8", title: "Monster Party", image: game8 },
    { id: "8", title: "Monster Party", image: game8 },
];

const newGames = [
    { id: "6", title: "Castle Defense", image: game6 },
    { id: "8", title: "Monster Party", image: game8 },
    { id: "5", title: "Drawing Party", image: game5 },
    { id: "4", title: "Quiz Mania", image: game4 },
    { id: "3", title: "Let's Cook Together", image: game3 },
    { id: "2", title: "Party Fiesta", image: game2 },
    { id: "7", title: "Golazo Soccer", image: game7 },
    { id: "1", title: "Kart Racing", image: game1 },
    { id: "1", title: "Kart Racing", image: game1 },
];

const topCharts = [
    { id: "3", title: "Let's Cook Together", image: game3 },
    { id: "8", title: "Monster Party", image: game8 },
    { id: "1", title: "Kart Racing", image: game1 },
    { id: "7", title: "Golazo Soccer", image: game7 },
    { id: "4", title: "Quiz Mania", image: game4 },
    { id: "5", title: "Drawing Party", image: game5 },
    { id: "2", title: "Party Fiesta", image: game2 },
    { id: "6", title: "Castle Defense", image: game6 },
    { id: "6", title: "Castle Defense", image: game6 },
];

const familyGames = [
    { id: "5", title: "Drawing Party", image: game5 },
    { id: "3", title: "Let's Cook Together", image: game3 },
    { id: "4", title: "Quiz Mania", image: game4 },
    { id: "2", title: "Party Fiesta", image: game2 },
    { id: "8", title: "Monster Party", image: game8 },
    { id: "7", title: "Golazo Soccer", image: game7 },
    { id: "1", title: "Kart Racing", image: game1 },
    { id: "6", title: "Castle Defense", image: game6 },
    { id: "6", title: "Castle Defense", image: game6 },
];

const GameList = () => {
    const [activeRow, setActiveRow] = useState<number>(0);
    const [activeCol, setActiveCol] = useState<number>(0);
    const gameContainersRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setActiveRow((prevRow) => {
                let newRow = prevRow;
                let newCol = activeCol;

                if (e.key === "ArrowDown") {
                    newRow = Math.min(prevRow + 1, 3);
                }

                if (e.key === "ArrowUp") {
                    newRow = Math.max(prevRow - 1, 0);
                }

                if (e.key === "ArrowRight") {
                    setActiveCol((prev) =>
                        (prev + 1) % rowLengths[activeRow]
                    );
                }

                if (e.key === "ArrowLeft") {
                    setActiveCol((prev) => Math.max(prev - 1, 0));
                    return prevRow;
                }

                return newRow;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeCol]);

    useEffect(() => {
        const selected = document.querySelector(".selected-game") as HTMLElement;

        if (selected) {
            selected.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    }, [activeRow, activeCol]);

    const dispatch = useDispatch();

    const handleGameClick = (gameId: string) => {
        // console.log("Game clicked:", gameId);
    };

    const handlePlayFeatured = () => {
        // console.log("Play featured game");
    };

    useEffect(() => {
        toggleFullScreen(dispatch);
    }, [dispatch])

    const rowLengths = [
        hotAndFreeGames.length,
        newGames.length,
        topCharts.length,
        familyGames.length,
    ];

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
                    onPlay={handlePlayFeatured}
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
                        onGameClick={handleGameClick}
                        selectedGame={activeRow === 0 ? activeCol : null}
                    />

                    <GameRow
                        rowIndex={1}
                        title="New"
                        icon="new"
                        games={newGames}
                        onGameClick={handleGameClick}
                        selectedGame={activeRow === 1 ? activeCol : null}
                    />

                    <GameRow
                        rowIndex={2}
                        title="Top Charts"
                        icon="top"
                        games={topCharts}
                        onGameClick={handleGameClick}
                        selectedGame={activeRow === 2 ? activeCol : null}
                    />

                    <GameRow
                        rowIndex={3}
                        title="Kids & Family"
                        icon="family"
                        games={familyGames}
                        onGameClick={handleGameClick}
                        selectedGame={activeRow === 3 ? activeCol : null}
                    />
                </div>
            </div>
        </div>
    );
};
export default GameList;
