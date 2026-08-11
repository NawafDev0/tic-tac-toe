import { useState ,useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const initialBoard = {
    x1: "",
    x2: "",
    x3: "",
    x4: "",
    x5: "",
    x6: "",
    x7: "",
    x8: "",
    x9: "",
};

const winningCombinations = [
    ["x1", "x2", "x3"],
    ["x4", "x5", "x6"],
    ["x7", "x8", "x9"],
    ["x1", "x4", "x7"],
    ["x2", "x5", "x8"],
    ["x3", "x6", "x9"],
    ["x1", "x5", "x9"],
    ["x3", "x5", "x7"],
];

export default function TicTacToe() {
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [board, setBoard] = useState(initialBoard);
    const [gameResult, setGameResult] = useState(null);
    const [winningCells, setWinningCells] = useState({});
    const [moveCount, setMoveCount] = useState(0);

    function handleCellClick(cell) {
        if (gameResult !== null) return;
        if (board[cell] !== "") return;

        const updatedBoard = {
            ...board,
            [cell]: currentPlayer,
        };

        setBoard(updatedBoard);

        const updatedMoveCount = moveCount + 1;
        setMoveCount(updatedMoveCount);

        for (const [first, second, third] of winningCombinations) {
            if (
                updatedBoard[first] !== "" &&
                updatedBoard[first] === updatedBoard[second] &&
                updatedBoard[second] === updatedBoard[third]
            ) {
                setGameResult(updatedBoard[first]);

                setWinningCells({
                    [first]: true,
                    [second]: true,
                    [third]: true,
                });

                return;
            }
        }

        if (updatedMoveCount === 9) {
            setGameResult("Draw");
            return;
        }

        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    function restartGame() {
        setBoard(initialBoard);
        setCurrentPlayer("X");
        setGameResult(null);
        setWinningCells({});
        setMoveCount(0);
    }

    useEffect(() => {
        document.documentElement.style.margin = "0";
        document.documentElement.style.padding = "0";
        document.documentElement.style.width = "100%";
        document.documentElement.style.height = "100%";
        document.documentElement.style.overflow = "hidden";

        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.body.style.overflow = "hidden";

        const root = document.getElementById("root");

        if (root) {
            root.style.margin = "0";
            root.style.padding = "0";
            root.style.width = "100%";
            root.style.height = "100%";
            root.style.minWidth = "0";
            root.style.minHeight = "0";
        }
    }, []);

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                boxSizing: "border-box",
                background: "#18181b",
                fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
        >
            <div
                style={{
                    width: "min(100%, 500px)",
                    padding: "clamp(20px, 5vw, 40px)",
                    boxSizing: "border-box",
                    borderRadius: "24px",
                    background: "#27272a",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        marginBottom: "clamp(20px, 4vw, 30px)",
                    }}
                >
                    {gameResult === null ? (
                        <h1
                            style={{
                                margin: 0,
                                color: "#ffffff",
                                fontSize: "clamp(26px, 6vw, 38px)",
                                fontWeight: 700,
                                letterSpacing: "-0.5px",
                            }}
                        >
                            Turn: {currentPlayer}
                        </h1>
                    ) : gameResult === "Draw" ? (
                        <h1
                            style={{
                                margin: 0,
                                color: "#ffffff",
                                fontSize: "clamp(26px, 6vw, 38px)",
                                fontWeight: 700,
                            }}
                        >
                            Draw
                        </h1>
                    ) : (
                        <h1
                            style={{
                                margin: 0,
                                color: "#ffffff",
                                fontSize: "clamp(26px, 6vw, 38px)",
                                fontWeight: 700,
                            }}
                        >
                            {gameResult} Wins
                        </h1>
                    )}

                    <p
                        style={{
                            margin: "8px 0 0",
                            color: "#a1a1aa",
                            fontSize: "clamp(14px, 3vw, 17px)",
                            fontWeight: 500,
                        }}
                    >
                        Moves : {moveCount}
                    </p>
                </div>

                <div
                    style={{
                        width: "min(100%, 360px)",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "clamp(6px, 2vw, 10px)",
                    }}
                >
                    {Object.keys(board).map((cell) => (
                        <button
                            key={cell}
                            disabled={gameResult !== null}
                            onClick={() => handleCellClick(cell)}
                            style={{
                                width: "100%",
                                aspectRatio: "1 / 1",
                                border: "none",
                                borderRadius: "14px",
                                background: winningCells[cell]
                                    ? "#22c55e"
                                    : "#ffffff",
                                color: "#18181b",
                                fontSize: "clamp(30px, 9vw, 52px)",
                                fontWeight: 800,
                                fontFamily:
                                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                                cursor:
                                    gameResult !== null
                                        ? "default"
                                        : "pointer",
                                transition:
                                    "transform 0.15s ease, background 0.15s ease",
                                boxShadow:
                                    "0 4px 10px rgba(0, 0, 0, 0.15)",
                            }}
                        >
                            {board[cell]}
                        </button>
                    ))}
                </div>

                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    style={{
                        marginTop: "clamp(20px, 4vw, 30px)",
                    }}
                >
                    <Button
                        color="error"
                        variant="contained"
                        onClick={restartGame}
                        sx={{
                            fontFamily:
                                "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                            fontWeight: 600,
                            padding: "9px 24px",
                            borderRadius: "10px",
                        }}
                    >
                        Restart
                    </Button>
                </Stack>
            </div>
        </div>
    );
}
