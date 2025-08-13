import SquareBlock from "./SquareBlock"

const GameBoard = ({board, handleClick}) => {
  return (
    <div className="flex flex-wrap items-center justify-center w-[300px] gap-3 mt-5">
      {board.map((val, i) => (
        <SquareBlock key={i} val={val} onClick={() => handleClick(i)} />
      ))}
    </div>
  )
}

export default GameBoard