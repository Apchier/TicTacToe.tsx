import { useState } from "react";
import TicTacToe from "../components/fragments/Board";


export default function Game() {
    const [isXNext, setXIsNext] = useState<boolean>(true);
    const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const currentSquares = history[currentMove];

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    function handlePlay(newSquares: Array<string | null>) {
        const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!isXNext);
    }

    const moves = history.map((_, move) => {
        let description = "";
        if (move) {
            description = "Go to move #" + move;
        } else {
            description = "Go to game start";
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className="flex gap-10">
            <div>
                <TicTacToe xIsNext={isXNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div>
                <ol className="text-3xl">{moves}</ol>
            </div>
        </div>
    );
}


