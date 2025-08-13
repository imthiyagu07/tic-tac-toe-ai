import { useState, useEffect } from 'react'
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';

import { ToastContainer, toast } from 'react-toastify';

import { getAIMove } from './utils/AiOpenRouter';
import { checkWinner } from './utils/Winner';

const App = () => {

  // state for 3 x 3 (9 cells)
  const [board, setBoard] = useState(Array(9).fill(null))

  // Is it the player turn?
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  // who won? ("X", "O" or "Draw")
  const [winner, setWinner] = useState(null);

  // track score
  const [score, setScore] = useState({X: 0, O:0});

  //game level
  const [level, setLevel] = useState("easy")

  //whose turn
  const [turn, setTurn] = useState("Your Turn!")

  const handleClick = (i) => {

    if (!isPlayerTurn || board[i] || winner) return

    const newBoard = [...board]

    newBoard[i] = "X"

    setBoard(newBoard)

    setIsPlayerTurn(false)

    setTurn("AI is thinking....")
  }

  useEffect(() => {

      if(winner) return setTurn("")

      // check if someone has won
      const result = checkWinner(board);
      
      if(result?.winner){
        setWinner(result.winner);
        if(result?.winner === "X" || result.winner === "O"){
          setScore((prev) => ({
            ...prev,
            [result.winner]:prev[result.winner] + 1
          }))
          return;
        }
      }

      //If it's AI's trun and game not over
      if (!isPlayerTurn && !winner) {
          const aiTurn = async () => {
            const move = await getAIMove(board, level);
            if (typeof move === "number" && move >= 0 && move <= 8){
              if(move !== null && board[move] === null){
                const newBoard = [...board]
                newBoard[move] = "O";
                setBoard(newBoard);
                setIsPlayerTurn(true);
                setTurn("Your Turn!")
              }
            } else {
              toast.error(move, {
                closeButton: false,
                className: 'w-[300px] text-sm',
              })
            }
          }
          const timeout = setTimeout(aiTurn(), 1000)
          return () => clearTimeout(timeout)
      }
  }, [board, isPlayerTurn, winner, level])

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setTurn("Your Turn")
  }

  const changeLevel = (value) => {
    setLevel(value)
  }

  return (
    <div className='bg-slate-950 p-3 min-h-[100vh] font-mono flex flex-col pt-10 items-center'>
      <ToastContainer position="top-center" theme="dark" />
      <h1 className='text-white text-3xl mb-5'>TIC TAC TOE 🤖</h1>
      <div className='mb-4 flex flex-row items-center gap-2'>
        <p className='text-white text-xl'>Game Level</p>
        <select value={level} onChange={(e) => changeLevel(e.target.value)} className='text-white border-1 bg-slate-950 border-slate-600 outline-none p-1 rounded-2xl'>
          <option value="easy">Easy</option>
          <option value="hard">Hard</option>
          <option value="impossible">Impossible</option>
        </select>
      </div>
      <ScoreBoard score={score} />
      <p className='text-violet-400 text-xl'>{turn}</p>
      <GameBoard board={board} handleClick={handleClick} />
      {winner && (
        <div className='space-y-4 mt-4 flex flex-col items-center'>
          <p className='text-white text-xl mt-2'>{winner === "Draw" ? "It's a draw" : `${winner} wins!`}</p>
          <button onClick={restartGame}
          className='border-none outline-none cursor-pointer bg-slate-800 rounded-4xl p-3 w-[130px] text-white hover:bg-slate-600'>
            Play Again
          </button>
        </div>
      )}
      <p className='text-white mt-5'>Powered By OpenAI</p>
    </div>
  )
}

export default App