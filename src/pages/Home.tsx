import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import ChatInstance from '../components/home/ChatInstance';
import SidebarManager from '../components/home/Sidebars/SidebarManager';
import Draggable from '../components/ui/Draggable';
import Loader from '../components/ui/Loader';
import Logout from '../components/ui/Logout';
import ToastAlert from '../components/ui/ToastAlert';
import { initializeSocket } from '../helpers/Socket';
import { RootState } from '../redux/store';

const Home = () => {
  const appData = useSelector((state: RootState) => state.appReducer);
  const chatData = useSelector((state: RootState) => state.chatReducer);
  const userData = useSelector((state: RootState) => state.userReducer);

  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  const initialize = async() => {
    initializeSocket(setSocket);
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <AnimatePresence initial={false} mode='wait'>
        {appData.isLoading &&
          <Loader />
        }
      </AnimatePresence>
      
      <AnimatePresence mode='wait'>
        { appData.currentAlert &&
          <ToastAlert alertData={appData.currentAlert}/>
        }
      </AnimatePresence>
      
      { userData.id && socket &&
        <div className='flex flex-col h-screen '>
          <Draggable appData={appData} userData={userData} chatData={chatData}/>
          
          <AnimatePresence mode='wait'>
            { appData.logoutRequested &&
              <Logout />
            }
          </AnimatePresence>

          <div className='flex-1 select-none bg-uiBG'>
            <div className='flex h-full'>
              <SidebarManager socket={socket!} appData={appData} userData={userData}/>

              <ChatInstance socket={socket!} userData={userData} chatReducer={chatData}/>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Home