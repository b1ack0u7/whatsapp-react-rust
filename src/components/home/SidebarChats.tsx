import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { initializeSocket, joinRoom } from "../../helpers/Socket";
import requester from '../../helpers/Requester';
import { IGroupChat, IRequest } from "../../interfaces/interfaces";
import moment from "moment";
import { useDispatch } from 'react-redux';
import { setGroupChatData } from "../../redux/slices/chatSlice";

const SidebarChats = ({chatRooms}: {chatRooms?: string[]}) => {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    initializeSocket(setIsLoading);
  });

  return (
    <div className='flex flex-col w-[370px] h-full bg-white'>
      <div className="flex items-center mx-4 my-2 px-4 py-2 gap-x-4 bg-uiBG rounded-lg">
        <i className={`fi ${inputSearch.length == 0 ? 'fi-br-search text-gray-500' : 'fi-br-arrow-left text-emerald-400'} mr-2 text-[14px] `}/>
        <input 
          className='w-full appearance-none text-[14px] text-righ focus:outline-none bg-transparent text-gray-700'
          type='search'
          value={inputSearch}
          placeholder='Buscar un chat o inicia uno nuevo.'
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </div>

      <hr />
      
      <div className="flex flex-col h-[538px] overflow-y-scroll">
        { chatRooms && !isLoading &&
          chatRooms.map((item, idx) => 
            <ItemChat key={idx} roomId={item}/>
          )
        }

        <div className="flex items-center justify-center text-gray-600">
          <i className="fi fi-sr-lock text-[12px] mt-1 -mr-1 "/>
          <p className="m-3 text-[12px]">Tus mensajes personales están cifrados con AES256</p>
        </div>
      </div>
    </div>
  )
}

const ItemChat = ({roomId}: {roomId: string}) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [chatInfo, setChatInfo] = useState<IGroupChat | undefined>(undefined);

  const fetchChatRoomInfo = async() => {
    const respChatsInfo:IRequest<IGroupChat> = await requester({url: 'http://localhost:4002/whatsapp/fetchGroupInfo', params:{id: roomId, lastMessage: true}});
    if (!respChatsInfo.success) return;
    setChatInfo(respChatsInfo.response);
  }

  const handleSelectChat = () => {
    dispatch(setGroupChatData(chatInfo));
  }

  useEffect(() => {
    fetchChatRoomInfo();
    joinRoom(roomId);
  }, []);
    
  return (
    <div
      className="py-[11px] border-b transition hover:bg-gray-100 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleSelectChat()}  
    >
      <div className="flex gap-x-4 mx-4">
        <div className="w-[50px] h-[50px] bg-slate-300 rounded-full"/>

        <div className="flex flex-1">
          <div className="flex-1">
            <p className="">{chatInfo?.groupName}</p>
            <p className="text-gray-500 text-[14px]"><span className="font-medium">{chatInfo?.message?.sender?.name?.split(' ')[0]}: </span>{chatInfo?.message?.message}</p>
          </div>

          <div className="flex flex-col items-end gap-y-[6px]">
            <p className="text-emerald-400 text-[12px] font-bold">{moment(chatInfo?.message?.timestamp).format('HH:mm a')}</p>

            <div className="relative">
              <motion.div
                animate={{x: isHovered ? -18 : 0}}
                className="absolute right-0 flex items-center justify-center w-[30px] h-[20px] rounded-full bg-emerald-400"
              >
                <p className="text-[12px] text-white">52</p>
              </motion.div>

              <AnimatePresence mode="wait">
                { isHovered &&
                  <motion.i
                    className="absolute left-1 opacity-0 fi fi-br-angle-small-down text-gray-500 hover:text-gray-700"
                    animate={{opacity: isHovered ? 1 : 0, x: isHovered ? -20 : 0}}
                  />
                }
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarChats