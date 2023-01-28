import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';
import BG from '../../assets/bg-chat.png';
import InputField from './InputField';
import { IChat, IMessage, IRequest } from '../../interfaces/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useState, useEffect } from 'react';
import requester from '../../helpers/Requester';

const ChatInstance = () => {
  const chatReducer = useSelector((state: RootState) => state.chatReducer);
  const userData = useSelector((state: RootState) => state.userReducer);

  const [chatData, setChatData] = useState<IChat>(chatReducer);
  const [messages, setMessages] = useState<IMessage[] | undefined>(undefined);

  const groupMessagesById = (rawMessages:IMessage[]) => {
    console.log("🚀 ~ file: ChatInstance.tsx:19 ~ groupMessagesById ~ rawMessages", rawMessages)
    console.log("🚀 ~ file: ChatInstance.tsx:22 ~ groupMessagesById ~ chatReducer.participants", chatReducer.participants)
  }

  const fetchMessages = async() => {
    setChatData({...chatReducer});
    const respMessages:IRequest<IMessage[]> = await requester({url: 'http://localhost:4002/whatsapp/fetchGroupMessages', params:{idGroup: chatReducer.id}});
    if (!respMessages.success) return;

    groupMessagesById(respMessages.response);
    setMessages(respMessages.response);
  }

  useEffect(() => {
    if (chatData.id !== chatReducer.id) fetchMessages();
  },[chatReducer.id]);
  
  return (
    <>
      { chatData.id &&
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
            <div className='flex flex-col h-[530px] overflow-y-scroll mx-6 mt-1 pb-4 gap-y-2'>
              { messages &&
                messages.map((item, idx) => {
                  if (item.sender?.id === userData.id){
                    return <OutgoingMessage key={idx} />
                  } else {
                    return <IncomingMessage key={idx}/>
                  }
                })
              }
            </div>

            <InputField />
          </div>
        </div>
      }
    </>
  )
}

export default ChatInstance