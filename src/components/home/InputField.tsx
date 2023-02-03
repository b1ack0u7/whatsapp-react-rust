import moment from 'moment';
import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { sendMessage } from '../../helpers/Socket';
import { IChat, IMessage, IUser } from '../../interfaces/interfaces';

const InputField = ({socket, chatData, userData, setMessages}: {socket: Socket, chatData: IChat, userData: IUser, setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>}) => {
  const [message, setMessage] = useState<string>('');
  
  const handleSendMessage = () => {

    const dataTransport: IMessage = {
      idGroup: chatData.id,
      message,
      timestamp: moment.utc(new Date()).format(),
      sender: {
        id: userData.id,
        name: userData.name
      }
    };
    sendMessage(socket!, {roomId: chatData.id!, dataTransport: dataTransport});
    setMessages(list => [...list, dataTransport]);
  }

  useEffect(() => {
    socket.on("recieveMessage", (data: IMessage) => {
      setMessages(list => chatData.id === data.idGroup ? list[list.length-1].id !== data.id ? [...list, data] : [...list] : [...list]);
    });
  }, [socket]);

  return (
    <div className='flex items-center justify-center gap-x-4 px-6 py-3 bg-uiBG border-t border-t-gray-300'>
      <div className='flex mt-1 text-[20px] text-gray-500 gap-x-4'>
        <i className='fi fi-rr-face-awesome cursor-pointer'/>
        <i className='fi fi-rr-clip cursor-pointer'/>
      </div>

      <input 
        className='appearance-none focus:outline-none flex-1 py-2 px-3 rounded-lg text-gray-600 text-[15px] placeholder:font-light'
        type='text'
        value={message}
        placeholder='Escribe un mensaje aquí'
        onChange={(e) => setMessage(e.target.value)}
      />

      { message.length == 0 ?
        <button>
          <i className='fi fi-rr-microphone text-[20px] mt-1 text-gray-500 cursor-pointer'/>
        </button>
        :
        <button onClick={() => handleSendMessage()}>
          <i className='fi fi-rr-paper-plane text-[20px] mt-1 text-gray-500 cursor-pointer'/>
        </button>
      }
    </div>
  )
}

export default InputField