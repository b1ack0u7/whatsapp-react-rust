import { appWindow } from '@tauri-apps/api/window';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { EChatOptions } from '../../interfaces/enums';
import { IApp, IChat, IUser } from '../../interfaces/interfaces';
import { setChatOption, setLogoutRequest, setSidebarMenuShow } from '../../redux/slices/appSlice';

const Draggable = ({appData, userData, chatData}: {appData: IApp, userData: IUser, chatData: IChat}) => {
  const dispatch = useDispatch();

  const handleSetChatOption = (option: EChatOptions) => dispatch(setChatOption(option));

  const componentManager = () => {
    if (chatData.participant?.id) {
      return <p className='text-gray-800'>{chatData.participant.name}</p>
    } else {
      const participants = chatData.participants?.map(item => item.id === userData.id ? 'Tú' : item.name).join(', ');
      return (
        <>
          <p className='text-gray-800'>{chatData.groupName}</p>
          <p className='text-[13px] text-gray-500'>
            {participants}
          </p>
        </>
      )
    }
  }

  return (
    <div
      className={`flex h-[58px] ${userData?.id ? 'border-b ' : ''}border-b-gray-300 bg-uiBG`}
      id='draggable-zone'
      onMouseDown={async(e) => {
        e.preventDefault();
        document.getElementById('draggable-zone')?.classList.remove('cursor-default');
        document.getElementById('draggable-zone')?.classList.add('cursor-grabbing');
        await appWindow.startDragging();
      }}
      onMouseUp={(e) => {
        e.preventDefault();
        document.getElementById('draggable-zone')?.classList.remove('cursor-grabbing');
        document.getElementById('draggable-zone')?.classList.add('cursor-default');
      }}
    >
      { userData?.id &&
        <>
          <div className='flex items-center gap-x-4 ml-[4rem] w-[306.5px] px-5 text-[18px] border-r bg-blue border-r-gray-300 text-gray-700'>
            <button 
              className='flex justify-center items-center w-[35px] h-[35px] rounded-full cursor-pointer bg-gray-300'
              onClick={() => dispatch(setSidebarMenuShow(true))}
            >
              <i className='fi fi-sr-user mt-1 text-[16px]'/>
            </button>

            <div className='flex flex-1 relative justify-between ml-4 mt-[6px] text-gray-600'>
              <motion.div
                className='absolute -bottom-[13px] w-[25px] border-b-[1.5px] border-emerald-500'
                animate={{x: appData.chatOption === EChatOptions.messages ? -3 : appData.chatOption === EChatOptions.other ? 40 : appData.chatOption === EChatOptions.friends ? 80 : -3}}
              />
              <div className='flex gap-x-6'>
                <button
                  onClick={() => handleSetChatOption(EChatOptions.messages)}
                >
                  <i className={`fi fi-rr-comment-alt cursor-pointer transition ${appData.chatOption === EChatOptions.messages && 'text-black'} hover:text-black`}/>
                </button>

                <button
                  onClick={() => handleSetChatOption(EChatOptions.other)}
                >
                  <i className={`fi fi-rr-comments cursor-pointer transition ${appData.chatOption === EChatOptions.other && 'text-black'} hover:text-black`}/>
                </button>

                <button
                  onClick={() => handleSetChatOption(EChatOptions.friends)}
                >
                  <i className={`fi fi-rr-users cursor-pointer transition ${appData.chatOption === EChatOptions.friends && 'text-black'} hover:text-black`}/>
                </button>
              </div>

              <button
                onClick={() => dispatch(setLogoutRequest(true))}
              >
                <i className='fi fi-rr-exit cursor-pointer transition hover:text-black'/>
              </button>
            </div>
          </div>

          { chatData.id &&
            <div className='flex flex-1 px-4 items-center'>
              <div className='flex flex-1 items-center cursor-pointer mr-20'>
                <div className='flex justify-center items-center w-[35px] h-[35px] rounded-full bg-gray-300'>
                  <i className='fi fi-sr-user mt-1 text-[16px]'/>
                </div>

                <div className='ml-4 cursor-pointer'>
                  {componentManager()}
                </div>
              </div>

              <div className='flex gap-x-8 pl-8 border-l border-l-gray-400 text-gray-600'>
                <i className='fi fi-rr-search cursor-pointer transition hover:text-black'/>
                <i className='fi fi-rr-angle-small-down cursor-pointer transition hover:text-black'/>
              </div>
            </div>
          }
        </>
      }
    </div>
  )
}

export default Draggable