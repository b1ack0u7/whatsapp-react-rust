import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import ChatInstance from '../components/home/ChatInstance';
import SidebarChats from '../components/home/SidebarChats';
import SidebarMenu from '../components/home/SidebarMenu/SidebarMenu';
import Draggable from '../components/ui/Draggable';
import Loader from '../components/ui/Loader';
import Toast from '../components/ui/Toast';
import { initializeSocket } from '../helpers/Socket';
import { RootState } from '../redux/store';

const Home = () => {
  const appData = useSelector((state: RootState) => state.appReducer);
  const userData = useSelector((state: RootState) => state.userReducer);

  const [socket, setSocket] = useState<Socket | undefined>(undefined);

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

  const initialize = async() => {
    initializeSocket(setSocket);
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      {appData.isLoading &&
        <Loader />
      }
      
      { userData.id && socket &&
        <div className='flex flex-col h-screen '>
          <Draggable appData={appData} userData={userData}/>
          <AnimatePresence mode='wait'>
            { appData.logoutRequested &&
              <Toast />
            }
          </AnimatePresence>

          <div className='flex-1 select-none bg-uiBG'>
            <div className='flex h-full'>
              <SidebarChats chatRooms={userData.chatGroups} socket={socket}/>

              <AnimatePresence mode='wait'>
                { appData.sidebarMenuIsShown &&
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

              <ChatInstance socket={socket!}/>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Home