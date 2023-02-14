import { AnimatePresence, motion } from 'framer-motion';
import { Socket } from 'socket.io-client';
import { EChatOptions } from '../../../interfaces/enums';
import { IApp, IUser } from '../../../interfaces/interfaces';
import SidebarChats from './Chats/SidebarChats';
import SidebarFriends from './Friends/SidebarFriends';
import SidebarMenu from './Menu/SidebarMenu';

const SidebarManager = ({socket, userData, appData}: {socket: Socket, userData: IUser, appData: IApp}) => {
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
    <>
      <AnimatePresence mode='wait'>
        { appData.sidebarMenuIsShown &&
          <motion.div
            className='absolute flex flex-col top-0 w-[370px] h-full border-r border-r-gray-300 z-20'
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

      <AnimatePresence>
        { appData.chatOption === EChatOptions.messages &&
          <SidebarChats socket={socket} chatRooms={userData.chatGroups!} chatsInfo={appData.sideBarChats}/>
        }

        { appData.chatOption === EChatOptions.friends && 
          <SidebarFriends userData={userData}/>
        }
      </AnimatePresence>

    </>
  )
}

export default SidebarManager