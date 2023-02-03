import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Socket } from 'socket.io-client';
import BG from '../../assets/bg-chat.png';
import requester from '../../helpers/Requester';
import { IChat, IMessage, IRequest, IUser } from '../../interfaces/interfaces';
import { RootState } from '../../redux/store';
import IncomingMessage from './IncomingMessage';
import InputField from './InputField';
import OutgoingMessage from './OutgoingMessage';

const ChatInstance = ({socket}: {socket: Socket}) => {
  const chatReducer = useSelector((state: RootState) => state.chatReducer);
  const userData = useSelector((state: RootState) => state.userReducer);

  const [chatData, setChatData] = useState<IChat>(chatReducer);
  const [messages, setMessages] = useState<IMessage[]>([]);

  // const groupMessagesById = (rawMessages:IMessage[]) => {
  //   let tmpMessages:IUser[] = [];
  //   rawMessages.forEach(item => {
  //     let idx = tmpMessages.length-1;
  //     if (item.sender?.id === tmpMessages[idx]?.id) {
  //       tmpMessages[idx].messages?.push(item);
  //     } else {
  //       let chatDataFiltered = {...chatReducer.participants.find(user => user.id === item.sender?.id)!}
  //       delete chatDataFiltered.chatGroups;
  //       delete chatDataFiltered.email;
  //       tmpMessages.push(chatDataFiltered);
  //       idx = tmpMessages.length-1;
  //       if (!tmpMessages[idx].messages) tmpMessages[idx] = {...tmpMessages[idx], messages: []};
  //       tmpMessages[idx].messages?.push(item);
  //     }
  //   });
  //   setMessages([...tmpMessages]);
  // }


  const fetchMessages = async() => {
    setChatData({...chatReducer});
    const respMessages:IRequest<IMessage[]> = await requester({url: 'http://localhost:4002/whatsapp/fetchGroupMessages', params:{idGroup: chatReducer.id}});
    console.log("🚀 ~ file: ChatInstance.tsx:57 ~ fetchMessages ~ respMessages", respMessages)
    if (!respMessages.success) return;
    setMessages(respMessages.response);
  }
  
  const handleConditionalRender = (item: IMessage, idx: number) => {
    let variant = 0
    if (item.sender?.id === messages[idx-1]?.sender?.id) {
      variant = 1
    }
    
    if (item.sender?.id === userData.id) return <OutgoingMessage key={idx} message={item} variant={variant}/>
    else return <IncomingMessage key={idx} message={item} variant={variant}/>
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
      }
    </>
  )
}

export default ChatInstance