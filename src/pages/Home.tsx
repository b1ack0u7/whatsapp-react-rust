import { AnimatePresence, motion } from 'framer-motion';
import ChatInstance from '../components/home/ChatInstance';
import SidebarChats from '../components/home/SidebarChats';
import SidebarMenu from '../components/home/SidebarMenu/SidebarMenu';
import Draggable from '../components/ui/Draggable';

const Home = () => {
  return (
    <div className='flex flex-col h-screen '>
      <Draggable />

      <div className='flex-1 select-none bg-uiBG'>
        <div className='flex h-full'>
          <SidebarChats />

          {/* <AnimatePresence>
            {
              <motion.div
                initial={{x: 0}}
                animate={{x: 10}}
                exit={{x: 0}}
              >
                <SidebarMenu />
              </motion.div>
            }
          </AnimatePresence> */}
          <ChatInstance />
        </div>
      </div>
    </div>
  )
}

export default Home