import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import ChatInstance from '../components/home/ChatInstance';
import SidebarChats from '../components/home/SidebarChats';
import SidebarMenu from '../components/home/SidebarMenu/SidebarMenu';
import Draggable from '../components/ui/Draggable';
import { RootState } from '../redux/store';

const Home = () => {
  const { sidebarMenuIsShown } = useSelector((state: RootState) => state.appReducer);

  const animationContainer = {
    start: {
      x: -370,
      opacity: 0
    },
    show: {
      x: 0,
      opacity: 1,
    },
    hidden: {
      x: -370
    }
  };

  return (
    <div className='flex flex-col h-screen '>
      <Draggable />

      <div className='flex-1 select-none bg-uiBG'>
        <div className='flex h-full'>
          <SidebarChats />

          <AnimatePresence mode='wait'>
            { sidebarMenuIsShown &&
              <motion.div
                className='absolute flex flex-col top-0 w-[370px] h-full border-r border-r-gray-300'
                variants={animationContainer}
                initial="start"
                animate="show"
                exit="hidden"
                transition={{duration: 0.3}}
              >
                <SidebarMenu />
              </motion.div>
            }
          </AnimatePresence>

          <ChatInstance />
        </div>
      </div>
    </div>
  )
}

export default Home