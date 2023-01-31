import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import ChatInstance from '../components/home/ChatInstance';
import SidebarChats from '../components/home/SidebarChats';
import SidebarMenu from '../components/home/SidebarMenu/SidebarMenu';
import Draggable from '../components/ui/Draggable';
import requester from '../helpers/Requester';
import { initializeSocket } from '../helpers/Socket';
import { IRequest, IUser } from '../interfaces/interfaces';
import { setCurrentUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';

const Home = () => {
  const dispatch = useDispatch();
  const { sidebarMenuIsShown } = useSelector((state: RootState) => state.appReducer);
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
    const respUserData: IRequest<IUser> = await requester({url: "http://localhost:4002/whatsapp/fetchUser", params: {idUser: "63d2d86d88c681f3de729f9e"}});
    if (!respUserData.success) return;
    dispatch(setCurrentUser(respUserData.response));
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <AnimatePresence>
      { userData.id &&
        <div className='flex flex-col h-screen '>
          <Draggable />

          <div className='flex-1 select-none bg-uiBG'>
            <div className='flex h-full'>
              <SidebarChats chatRooms={userData.chatGroups} socket={socket}/>

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

              <ChatInstance socket={socket!}/>
            </div>
          </div>
        </div>
      }
    </AnimatePresence>
  )
}

export default Home