import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const OutgoingMessage = () => {
  const animationsContainer = {
    start: {
      opacity: 0,
      x: 0
    },
    show: {
      opacity: 1,
      x: -20,
      transition: {
        x: {
          duration: 0.15
        }
      }
    },
    hidden: {
      opacity: 0,
      x: 0,
      transition: {
        opacity: {
          duration: 0.15
        }
    }}
  };

  return (
    <div className='flex justify-end select-text'>
      <div>
        <InitialMessage animation={animationsContainer}/>

        <div className='flex flex-col items-end gap-y-[2px]'>
          {
            Array(6).fill(0).map(() => 
              <IndividualMessage animation={animationsContainer}/>
            )  
          }
        </div>

      </div>
    </div>
  )
}

const InitialMessage = ({animation}: {animation: any}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className='flex gap-x-4 mb-[2px]'>
      <div 
        className='relative pt-2 pl-3 bg-white rounded-l-lg rounded-br-lg'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='absolute -right-4 top-0 w-0 h-0 border-l-white border-t-0 border-l-[20px] border-b-[15px] border-b-transparent rounded-tr-md'/>
        <div className='relative'>
          <p className='text-[14px] font-medium text-green-500 hover:underline hover:cursor-pointer'>Axel Hernandez Montes de Oca</p>
          <AnimatePresence mode="wait">
            { isHovered &&
              <motion.i
                className="absolute -right-4 top-0 opacity-0 fi fi-br-angle-small-down cursor-pointer text-gray-500 hover:text-gray-700"
                variants={animation}
                initial="start"
                animate="show"
                exit="hidden"
              />
            }
          </AnimatePresence>
        </div>

        <div className='flex mb-[3px] gap-x-[6px]'>
          <p className='text-[14px] break-all'>Hola estoy ocupando una demo de whatsapp</p>
          <p className='text-[10px] text-gray-500 mt-3 mr-2 self-end'>7:58 p. m.</p>
        </div>
      </div>

      <div className='w-[25px] h-[25px] rounded-full bg-gray-400'/>
    </div>
  )
}


const IndividualMessage = ({animation}: {animation: any}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className='flex'>
      <div 
        className='relative flex gap-x-[6px] mr-10 pt-[6px] pb-[2px] pl-3 bg-white rounded-lg'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p className='text-[14px]'>Esta es una prueba del quien manda</p>
        <p className='text-[10px] text-gray-500 mt-3 mr-2 self-end'>7:58 p. m.</p>
        <AnimatePresence mode="wait">
          { isHovered &&
            <motion.i
              className="absolute -right-4 top-1 opacity-0 fi fi-br-angle-small-down cursor-pointer text-gray-500 hover:text-gray-700"
              variants={animation}
              initial="start"
              animate="show"
              exit="hidden"
            />
          }
        </AnimatePresence>
      </div>
      <div className='flex-1'/>
    </div>
  )
}

export default OutgoingMessage