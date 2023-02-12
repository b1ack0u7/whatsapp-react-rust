import { useState } from 'react';
import { IUser } from '../../../../interfaces/interfaces';
import { AnimatePresence, motion } from 'framer-motion';

const FriendItem = ({item: friendData, inheritedProps}: {item?: IUser, enableAddButton?: boolean, inheritedProps?: any}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
            <p className="">{friendData?.name}</p>
            <button
              className="text-gray-500 text-[14px]"
              onClick={() => navigator.clipboard.writeText(friendData?.id!)}
            >
                {friendData?.id}
            </button>
          </div>

          <div className="flex flex-col items-end gap-y-[6px]">
            <p className="text-emerald-400 text-[12px] font-bold">Mi estado</p>

            <div className="relative">
              { inheritedProps?.enableAddButton &&
                <motion.button
                  animate={{x: isHovered ? -18 : 0}}
                  className="absolute right-0 flex items-center justify-center w-[25px] h-[25px] rounded-full bg-emerald-400"
                >
                  <i className="fi fi-rr-user-add text-[14px] mt-[2px] text-white"/>
                </motion.button>
              }

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

export default FriendItem