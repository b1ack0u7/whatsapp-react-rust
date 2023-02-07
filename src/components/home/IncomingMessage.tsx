import { Menu, MenuItem } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { IMessage } from '../../interfaces/interfaces';

const IncomingMessage = ({message, variant = 0}: {message: IMessage, variant: number}) => {
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
    <div className='select-text'>
      { variant === 0 ?
        <InitialMessage message={message} animation={animationsContainer}/>
        :
        <IndividualMessage message={message} animation={animationsContainer}/>
      }
    </div>
  )
}

const InitialMessage = ({message, animation}: {message: IMessage, animation: any}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(anchor);

  useEffect(() => {
    if (anchor === null) setIsHovered(false);
  }, [anchor]);

  return (
    <div className='flex gap-x-4 mb-[1px]'>
      <div className='w-[25px] h-[25px] rounded-full bg-gray-400'/>

      <div
        className='relative pt-2 pl-3 bg-white rounded-r-lg rounded-bl-lg shadow-sm'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='absolute -left-4 top-0 w-0 h-0 border-r-white border-t-0 border-r-[20px] border-b-[15px] border-b-transparent rounded-tl-md'/>

        <div className='relative'>
          <p className='text-[14px] font-medium text-green-500 hover:underline hover:cursor-pointer'>{message.sender?.name}</p>
          <AnimatePresence mode="wait">
            { isHovered &&
              <>
                <motion.i
                  className="absolute -right-4 top-0 opacity-0 fi fi-br-angle-small-down cursor-pointer text-gray-500 hover:text-gray-700"
                  variants={animation}
                  initial="start"
                  animate="show"
                  exit="hidden"
                  onClick={(e) => setAnchor(e.currentTarget)}
                />

                <Menu
                  id='basic-menu'
                  anchorEl={anchor}
                  open={open}
                  onClose={() => setAnchor(null)}
                >
                  <MenuItem>Info. del mensaje</MenuItem>
                  <MenuItem
                    sx={{color: '#EF4444'}}
                  >
                    Eliminar
                  </MenuItem>
                </Menu>
              </>
            }
          </AnimatePresence>
        </div>

        <div className='flex mb-[3px] gap-x-[6px]'>
          <p className='text-[14px] break-all'>{message.message}</p>
          <p className='text-[10px] text-gray-500 mt-3 mr-2 self-end'>{moment(message.timestamp || new Date()).format('hh:mm a')}</p>
        </div>
      </div>
    </div>
  )
}

const IndividualMessage = ({message, animation}: {message: IMessage, animation: any}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(anchor);

  useEffect(() => {
    if (anchor === null) setIsHovered(false);
  }, [anchor]);

  return (
    <div className='flex'>
      <div 
        className='relative flex gap-x-[6px] ml-10 pt-[6px] pb-[2px] pl-3 bg-white rounded-lg'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p className='text-[14px]'>{message.message}</p>
        <p className='text-[10px] text-gray-500 mt-3 mr-2 self-end'>{moment(message.timestamp || new Date()).format('hh:mm a')}</p>
        <AnimatePresence mode="wait">
          { isHovered &&
            <>
              <motion.i
                className="absolute -right-4 top-1 opacity-0 fi fi-br-angle-small-down cursor-pointer text-gray-500 hover:text-gray-700"
                variants={animation}
                initial="start"
                animate="show"
                exit="hidden"
                onClick={(e) => setAnchor(e.currentTarget)}
              />

              <Menu
                id='basic-menu'
                anchorEl={anchor}
                open={open}
                onClose={() => setAnchor(null)}
              >
                <MenuItem>Info. del mensaje</MenuItem>
                <MenuItem
                  sx={{color: '#EF4444'}}
                >
                  Eliminar
                </MenuItem>
              </Menu>
            </>
          }
        </AnimatePresence>
      </div>
      <div className='flex-1'/>
    </div>
  )
}

export default IncomingMessage