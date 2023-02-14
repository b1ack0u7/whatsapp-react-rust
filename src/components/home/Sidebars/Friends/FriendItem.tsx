import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EAlert } from '../../../../interfaces/enums';
import { IUser } from '../../../../interfaces/interfaces';
import { enqueueAlert } from '../../../../redux/slices/appSlice';

const FriendItem = ({item, inheritedProps}: {item?: IUser, inheritedProps?: any}) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id)
    dispatch(enqueueAlert({alertData: {alertType: EAlert.info, message: 'ID copiado'}}));
  }

  return (
    <div
      className="py-[11px] border-b transition text-left h-[73px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-x-4 mx-4">
        <div className="w-[50px] h-[50px] bg-slate-300 rounded-full"/>

        <div className="flex flex-1">
          <div className="flex-1">
            <p className="">{item?.name}</p>
            <button
              className="text-gray-500 text-[14px]"
              onClick={() => handleCopyId(item?.id!)}
            >
                {item?.id}
            </button>
          </div>

          <div className="flex flex-col items-end gap-y-[6px]">
            <p className="text-emerald-400 text-[12px] font-bold">Mi estado</p>

            <div className="relative">
              { inheritedProps?.enableAcceptRejectButton &&
                <motion.div
                  className='flex gap-x-1'
                  animate={{x: isHovered && inheritedProps.showOptions ? -18 : 0}}
                >
                  <button
                  >
                    <i className="fi fi-sr-add text-[22px] mt-[2px] text-blue-500"/>
                  </button>

                  <button
                    className='w-[25px] h-[25px]'
                  >
                    <i className="fi fi-sr-cross-circle text-[22px] mt-[2px] text-red-500"/>
                  </button>
                </motion.div>
              }

              { inheritedProps?.enableAddButton &&
                <motion.button
                  animate={{x: isHovered && inheritedProps.showOptions ? -18 : 0}}
                  className="absolute right-0 flex items-center justify-center w-[25px] h-[25px] rounded-full bg-emerald-400"
                >
                  <i className="fi fi-rr-user-add text-[14px] mt-[2px] text-white"/>
                </motion.button>
              }

              { inheritedProps.showOptions &&
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
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FriendItem