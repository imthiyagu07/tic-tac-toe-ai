
const ScoreBoard = ({score}) => {
  return (
    <div className="flex justify-between w-[300px] mb-4">
      <div className="text-violet-600 text-lg font-semibold">You (X) : <span className="text-white">{score.X}</span></div>
      <div className="text-fuchsia-600 text-lg font-semibold">AI (O) : <span className="text-white">{score.O}</span></div>
    </div>
  )
}

export default ScoreBoard