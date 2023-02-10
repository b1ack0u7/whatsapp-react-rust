import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import banner from '../../assets/banner-chat-light.svg';
import BG from '../../assets/bg-chat.png';
import requester from '../../helpers/Requester';
import { IChat, IMessage, IRequest, IUser } from '../../interfaces/interfaces';
import IncomingMessage from './IncomingMessage';
import InputField from './InputField';
import OutgoingMessage from './OutgoingMessage';

const ChatInstance = ({socket, chatReducer, userData}: {socket: Socket, chatReducer: IChat, userData: IUser}) => {
  const [chatData, setChatData] = useState<IChat>(chatReducer);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const fetchMessages = async() => {
    setChatData({...chatReducer});
    const respMessages:IRequest<IMessage[]> = await requester({url: 'http://localhost:4002/whatsapp/fetchGroupMessages', params:{idGroup: chatReducer.id}});
    if (!respMessages.success) return;
    setMessages(respMessages.response);
  }
  
  const handleConditionalRender = (item: IMessage, idx: number) => {
    let variant = 0
    if (item.sender?.id === messages[idx-1]?.sender?.id) variant = 1
    
    if (item.sender?.id === userData.id) return <OutgoingMessage key={idx} message={item} variant={variant}/>
    else return <IncomingMessage key={idx} message={item} variant={variant}/>
  }
  
  useEffect(() => {
    if (chatData.id !== chatReducer.id) fetchMessages();
  },[chatReducer.id]);

  return (
    <>
      { chatData.id ?
        <div className='flex flex-col flex-1'>
          <div className='absolute w-full h-full bg-chatBG z-0'/>
          <div
            className='absolute w-full h-full opacity-50 z-10'
            style={{
              backgroundImage: `url(${BG})`,
              backgroundSize: 'cover'
            }}
          />

          <div className='z-10'>
            <div className='flex flex-col h-[530px] overflow-y-scroll mx-6 mt-1 pb-4 gap-y-[2px]'>
              { 
                messages.map((item, idx) => handleConditionalRender(item, idx))
              }
            </div>

            <InputField
              socket={socket}
              chatData={chatData}
              userData={userData}
              setMessages={setMessages}
            />
          </div>
        </div>
        :
        <div className='flex-1 relative'>
          <div className='absolute left-[25%] top-[30%]'>
            <img
              src={banner}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        </div>
      }
    </>
  )
}

export default ChatInstance