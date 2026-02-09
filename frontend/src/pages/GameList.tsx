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
    const handleGameClick = (gameId: string) => {
        console.log("Game clicked:", gameId);
    };

    const handlePlayFeatured = () => {
        console.log("Play featured game");
    };

    return (
        <div className="min-h-screen bg-background">
            <GameHeader />

            {/* Featured Game */}
           <div className="sticky top-16 w-full py-4 z-40 bg-background px-9">
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
            <div className="w-full space-y-2 px-9">
                <div className="pb-2 space-y-2 ">
                    <GameRow
                        title="Hot & Free"
                        icon="hot"
                        games={hotAndFreeGames}
                        onGameClick={handleGameClick}
                    />

                    <GameRow
                        title="New"
                        icon="new"
                        games={newGames}
                        onGameClick={handleGameClick}
                    />

                    <GameRow
                        title="Top Charts"
                        icon="top"
                        games={topCharts}
                        onGameClick={handleGameClick}
                    />

                    <GameRow
                        title="Kids & Family"
                        icon="family"
                        games={familyGames}
                        onGameClick={handleGameClick}
                    />
                </div>
            </div>
        </div>
    );
};
export default GameList;
