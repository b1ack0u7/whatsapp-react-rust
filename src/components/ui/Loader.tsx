import Lottie from 'lottie-react';
import loading from '../../assets/loading-lottie.json';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      className='absolute w-screen h-screen select-none bg-uiBG z-20'
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0, transition: { delay: 1, duration: 0.2 }}}
      transition={{ease: 'easeInOut'}}
    >
      <div className='flex flex-col h-screen justify-center items-center'>
        <Lottie className='w-[200px] h-[200px] m-auto' animationData={loading} loop={true}/>
      </div>
    </motion.div>
  )
}

export default Loader