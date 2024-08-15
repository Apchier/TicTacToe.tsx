import { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { LiaCircleSolid } from "react-icons/lia";

interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
    return (
        <button
            className="flex justify-center items-center w-[100px] h-[100px] border-2 border-gray-500 text-6xl rounded bg-gray-100 hover:bg-gray-200"
            onClick={onSquareClick}
        >
            {value === "X" ? <HiXMark /> : value === "O" ? <LiaCircleSolid /> : null}
        </button>
    );
}

interface TicTacToeProps {
    xIsNext: boolean;
    squares: Array<string | null>;
    onPlay: (newSquares: Array<string | null>) => void;
}

function TicTacToe({ xIsNext, squares, onPlay }: TicTacToeProps) {
    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares)) return;

        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? "X" : "O";
        onPlay(newSquares);
    }

    const winner = calculateWinner(squares);
    let status = "";
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    console.log(winner);

    return (
        <div className="flex flex-col gap-5">
            <div className="text-4xl">{status}</div>
            <div className="flex flex-wrap w-[300px] aspect-square">
                {squares.map((square, i) => (
                    <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
                ))}
            </div>
        </div>
    );
}

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

function calculateWinner(squares: Array<string | null>): string | false {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return false;
}
