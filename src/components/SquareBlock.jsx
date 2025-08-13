import { motion } from 'framer-motion'

const SquareBlock = ({val, onClick}) => {
  return (
    <motion.button 
    className='bg-slate-800 text-white font-extrabold text-5xl 
    cursor-pointer rounded w-[90px] h-[90px] flex items-center justify-center' 
    whileTap={{scale: 0.9}}
    onClick={onClick}>
      {val}
    </motion.button>
  )
}

export default SquareBlock