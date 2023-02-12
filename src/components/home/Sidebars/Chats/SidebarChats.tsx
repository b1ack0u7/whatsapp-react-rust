import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Socket } from "socket.io-client";
import requester from '../../../../helpers/Requester';
import { joinRoom } from "../../../../helpers/Socket";
import { IGroupChat, IMessage, IRequest } from '../../../../interfaces/interfaces';
import { setSideBarChats } from "../../../../redux/slices/appSlice";
import ChatItem from './ChatItem';

const SidebarChats = ({chatRooms, socket, chatsInfo}: {chatRooms: string[], socket: Socket, chatsInfo: IGroupChat[]}) => {
  const dispatch = useDispatch()
  const [inputSearch, setInputSearch] = useState<string>('');
  
  const fetchChatInfo = async() => {
    if (chatRooms.length === 0) return;
    
    const respChatsInfo:IRequest<IGroupChat []> = await requester({url: 'http://localhost:4002/whatsapp/fetchGroupInfo', params:{id: chatRooms, lastMessage: true}});
    if (!respChatsInfo.success) return;
    
    dispatch(setSideBarChats({
      initialChats: respChatsInfo.response,
      initial: true
    }));
    respChatsInfo.response.forEach(item => item.id && joinRoom(socket, item.id));
  }
  
  useEffect(() => {
    fetchChatInfo();
  }, []);
  
  useEffect(() => {
    socket.on("recieveMessage", (data: IMessage) => {
      dispatch(setSideBarChats({incomingChat: data}));
    });
  }, [socket]);

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
      
      <div className="flex flex-col h-[537px] overflow-y-scroll">
        { chatsInfo && socket &&
          chatsInfo.map((item, idx) => 
            <ChatItem key={idx} chatInfo={item}/>
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

export default SidebarChats