import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';
import ChatInstance from '../components/home/ChatInstance';
import SidebarManager from '../components/home/Sidebars/SidebarManager';
import Draggable from '../components/ui/Draggable';
import Loader from '../components/ui/Loader';
import Logout from '../components/ui/Logout';
import ToastAlert from '../components/ui/ToastAlert';
import requester from '../helpers/Requester';
import { initializeSocket } from '../helpers/Socket';
import { IRequest, IUser } from '../interfaces/interfaces';
import { setIsLoading } from '../redux/slices/appSlice';
import { updateCurrentUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';

const Home = () => {
  const dispatch = useDispatch();
  const appData = useSelector((state: RootState) => state.appReducer);
  const chatData = useSelector((state: RootState) => state.chatReducer);
  const userData = useSelector((state: RootState) => state.userReducer);

  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  const initialize = async() => {
    initializeSocket(setSocket);

    if (!appData.loggedInRecently) {
      const respUser: IRequest<IUser> = await requester({url: 'http://localhost:4002/whatsapp/fetchUser', params: {idUser: userData.id}});
      if (!respUser.success) return;
  
      const updatedData: IUser = {
        chatGroups: respUser.response.chatGroups,
        friendList: respUser.response.friendList,
        friendRequest: respUser.response.friendRequest
      };
      dispatch(updateCurrentUser(updatedData));
    }
    dispatch(setIsLoading({target: 'rehydrate', value: false}));
  }

  useEffect(() => {
    if (!Object.values(appData.isLoading).includes(true)) setShowLoader(false);
  }, [appData.isLoading]);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <AnimatePresence initial={false} mode='wait'>
        {showLoader &&
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
          <Draggable appData={appData} userData={userData} chatData={chatData} dispatch={dispatch}/>
          
          <AnimatePresence mode='wait'>
            { appData.logoutRequested &&
              <Logout />
            }
          </AnimatePresence>

          <div className='flex-1 select-none bg-uiBG'>
            <div className='flex h-full'>
              <SidebarManager socket={socket!} appData={appData} userData={userData}/>

              <ChatInstance socket={socket!} userData={userData} chatReducer={chatData} dispatch={dispatch}/>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Home