import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IGroupChat } from '../../../../interfaces/interfaces';
import { setGroupChatData } from '../../../../redux/slices/chatSlice';

const ChatItem = ({chatInfo}: {chatInfo: IGroupChat}) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleSelectChat = () => {
    dispatch(setGroupChatData(chatInfo));
  }

  return (
    <div
      className="py-[11px] border-b transition hover:bg-gray-100 cursor-pointer text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleSelectChat()}
    >
      <div className="flex gap-x-4 mx-4">
        <div className="w-[50px] h-[50px] bg-slate-300 rounded-full"/>

        <div className="flex flex-1">
          <div className="flex-1">
            <p className="">{chatInfo?.groupName}</p>
            <p className="text-gray-500 text-[14px]"><span className="font-medium">{chatInfo?.lastMessage?.sender?.name?.split(' ')[0]}: </span>{chatInfo?.lastMessage?.message}</p>
          </div>

          <div className="flex flex-col items-end gap-y-[6px]">
            <p className="text-emerald-400 text-[12px] font-bold">{moment(chatInfo?.lastMessage?.timestamp).format('hh:mm a')}</p>

            <div className="relative">
              <motion.div
                animate={{x: isHovered ? -18 : 0}}
                className="absolute right-0 flex items-center justify-center w-[30px] h-[20px] rounded-full bg-emerald-400"
              >
                <p className="text-[12px] text-white">52</p>
              </motion.div>

              <AnimatePresence mode="wait">
                { isHovered &&
                  <motion.button
                    className="absolute left-1 opacity-0 text-gray-500 hover:text-gray-700"
                    animate={{opacity: isHovered ? 1 : 0, x: isHovered ? -20 : 0}}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="fi fi-br-angle-small-down"/>
                  </motion.button>
                }
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatItem