import { HiXMark } from "react-icons/hi2";
import { LiaCircleSolid } from "react-icons/lia";

type SquareProps = {
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

export default Square