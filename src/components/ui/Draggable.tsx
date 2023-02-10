import { appWindow } from '@tauri-apps/api/window';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { ChatOptions } from '../../interfaces/enums';
import { IApp, IUser } from '../../interfaces/interfaces';
import { setChatOption, setLogoutRequest, setSidebarMenuShow } from '../../redux/slices/appSlice';
import { RootState } from '../../redux/store';

const Draggable = ({appData, userData}: {appData: IApp, userData: IUser}) => {
  const dispatch = useDispatch();
  const chatData = useSelector((state: RootState) => state.chatReducer);

  const handleSetChatOption = (option: ChatOptions) => dispatch(setChatOption(option));

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
                animate={{x: appData.chatOption === ChatOptions.messages ? -3 : appData.chatOption === ChatOptions.other ? 40 : appData.chatOption === ChatOptions.friends ? 80 : -3}}
              />
              <div className='flex gap-x-6'>
                <button
                  onClick={() => handleSetChatOption(ChatOptions.messages)}
                >
                  <i className={`fi fi-rr-comment-alt cursor-pointer transition ${appData.chatOption === ChatOptions.messages && 'text-black'} hover:text-black`}/>
                </button>

                <button
                  onClick={() => handleSetChatOption(ChatOptions.other)}
                >
                  <i className={`fi fi-rr-comments cursor-pointer transition ${appData.chatOption === ChatOptions.other && 'text-black'} hover:text-black`}/>
                </button>

                <button
                  onClick={() => handleSetChatOption(ChatOptions.friends)}
                >
                  <i className={`fi fi-rr-users cursor-pointer transition ${appData.chatOption === ChatOptions.friends && 'text-black'} hover:text-black`}/>
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
                  <p className='text-gray-800'>Family</p>
                  <p className='text-[13px] text-gray-500'>Tú, Emilio, Joaquin, Monica</p>
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