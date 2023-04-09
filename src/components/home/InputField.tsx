import moment from 'moment';
import { InputHTMLAttributes, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { sendMessage } from '../../helpers/Socket';
import { IChat, IMessage, IUser } from '../../interfaces/interfaces';
import { useDispatch } from 'react-redux';
import { setSideBarChats } from '../../redux/slices/appSlice';
import { v4 as uuid } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';

const InputField = ({socket, chatData, userData, setMessages}: {socket: Socket, chatData: IChat, userData: IUser, setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>}) => {
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>('');
  const [showInputFiles, setShowInputFiles] = useState<boolean>(false);

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
    dispatch(setSideBarChats({incomingChat: {...dataTransport, id: uuid()}}));
    setMessage('');
  }

  const handleChange = async(e: any) => {
    e.preventDefault();
  }

  useEffect(() => {
    socket.on("recieveMessage", (data: IMessage) => {
      setMessages(list => chatData.id === data.idGroup ? list[list.length-1].id !== data.id ? [...list, data] : [...list] : [...list]);
    });
  }, [socket]);

  return (
    <div className='flex items-center justify-center gap-x-4 px-6 py-3 bg-uiBG border-t border-t-gray-300'>
      <div className='flex relative mt-1 text-[20px] text-gray-500 gap-x-4'>
        <AnimatePresence mode='wait'>
          { showInputFiles &&
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className='absolute flex flex-col left-6 bottom-[60px] gap-y-2'
            >
              <input
                className='hidden'
                type='file'
                multiple={false}
                ref={inputRef}
                onChange={handleChange}
              />

              <button
                className='flex items-center justify-center pt-1 w-[40px] h-[40px] bg-blue-400 rounded-full hover:bg-blue-500'
                onClick={() => inputRef.current!.click()}
              >
                <i className='fi fi-rr-picture text-white'/>
              </button>

              <button
                className='flex items-center justify-center pt-1 w-[40px] h-[40px] bg-purple-500 rounded-full hover:bg-purple-600'
                onClick={() => inputRef.current!.click()}
              >
                <i className='fi fi-rr-file text-white'/>
              </button>
            </motion.div>
          }
        </AnimatePresence>

        <i className='fi fi-rr-face-awesome cursor-pointer'/>

        <button
          onClick={() => setShowInputFiles(!showInputFiles)}
        >
          <i className={`fi fi-rr-clip cursor-pointer transition ${showInputFiles ? 'text-gray-800' : ''}`}/>
        </button>
      </div>

      <input 
        className='appearance-none focus:outline-none flex-1 py-2 px-3 rounded-lg text-gray-600 text-[15px] placeholder:font-light'
        type='text'
        value={message}
        placeholder='Escribe un mensaje aquí'
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
      />

      { message.length == 0 ?
        <button>
          <i className='fi fi-rr-microphone text-[20px] mt-1 text-gray-500 cursor-pointer'/>
        </button>
        :
        <button
          onClick={() => handleSendMessage()}
        >
          <i className='fi fi-rr-paper-plane text-[20px] mt-1 text-gray-500 cursor-pointer'/>
        </button>
      }
    </div>
  )
}

export default InputField