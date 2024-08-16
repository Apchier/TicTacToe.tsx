import calculateWinner from "../elements/Calculate";
import Square from "../elements/Square";

type TicTacToeProps = {
    xIsNext: boolean;
    squares: Array<string | null>;
    onPlay: (newSquares: Array<string | null>) => void;
};

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

export default TicTacToe