import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { useState, useEffect } from 'react';
import { IRequest, IUser } from '../../../../interfaces/interfaces';
import requester from '../../../../helpers/Requester';

const SidebarFriends = ({userData}: {userData: IUser}) => {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [searchBy, setSearchBy] = useState<number>(0);
  const [searchList, setSearchList] = useState<IUser []>([]);
  const [showFriends, setShowFriends] = useState<boolean>(true);
  const [showSearchResuls, setShowSearchResuls] = useState<boolean>(true);

  const searchFriends = async() => {
    const respUsersInfo: IRequest<IUser[]> = await requester({url: 'http://localhost:4002/whatsapp/fetchUser'});
    if (!respUsersInfo.success) return;

    setSearchList([...respUsersInfo.response]);
  }

  useEffect(() => {
    searchFriends();
  }, []);

  return (
    <div className='flex flex-col w-[370px] h-full bg-white'>
      <div className="flex items-center mx-4 my-2 px-4 py-2 gap-x-4 bg-uiBG rounded-lg">
        <i className={`fi ${inputSearch.length == 0 ? 'fi-br-search text-gray-500' : 'fi-br-arrow-left text-emerald-400'} mr-2 text-[14px] `}/>
        <input 
          className='w-full appearance-none text-[14px] text-righ focus:outline-none bg-transparent text-gray-700'
          type='search'
          value={inputSearch}
          placeholder='Buscar un usuario.'
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </div>

      <div className='relative flex mx-4 p-1 rounded-lg bg-gray-200 mb-2'>
        <button
          className='w-1/2 py-1 rounded-md text-gray-700 bg-transparent z-10'
          onClick={() => setSearchBy(0)}
        >
          Buscar por nombre
        </button>

        <button
          className='w-1/2 py-1 rounded-md text-gray-700 bg-transparent z-10'
          onClick={() => setSearchBy(1)}
        >
          Buscar por ID
        </button>

        <motion.div 
          className='absolute w-[49%] h-[31.8px] p-2 rounded-md bg-white z-0'
          animate={{
            x: searchBy === 0 ? 0 : 165,
            transition: {
              ease: 'easeInOut',
              duration: 0.15
            }
          }}
        />
      </div>

      <div className="flex flex-col h-[489px] overflow-y-scroll">
        <div>
          <div className='bg-gray-200'>
            <div className='flex justify-between item-center mx-6 py-1 text-gray-800'>
              <p>Mis amigos</p>
              <motion.button
                className='mt-[2px]'
                animate={{
                  rotate: showFriends ? 0 : 180,
                  y: showFriends ? 0 : -2,
                  transition: {
                    ease: 'easeInOut',
                    duration: 0.15
                  }
                }}
                onClick={() => setShowFriends(bool => !bool)}
              >
                <i className='fi fi-rr-caret-down'/>
              </motion.button>
            </div>
          </div>

          <motion.div
            className='overflow-y-auto'
            animate={{
              height: showFriends ? `${73*userData.friendList!.length}px` : '0',
              transition: {
                ease: 'easeInOut',
                duration: 0.2
              }
            }}
          >
            { userData.friendList!.length > 0 &&
              userData.friendList!.map((item, idx) => 
                <ItemFriend key={idx} friendData={item}/>
              )
            }
          </motion.div>
        </div>

        <div>
          <div className='bg-gray-200'>
            <div className='flex justify-between item-center mx-6 py-1 text-gray-800'>
              <p>Resultados de busqueda</p>
              <motion.button
                className='mt-[2px]'
                animate={{
                  rotate: showSearchResuls ? 0 : 180,
                  y: showSearchResuls ? 0 : -2,
                  transition: {
                    ease: 'easeInOut',
                    duration: 0.15
                  }
                }}
                onClick={() => setShowSearchResuls(bool => !bool)}
              >
                <i className='fi fi-rr-caret-down'/>
              </motion.button>
            </div>
          </div>

          <motion.div
            className='overflow-y-auto'
            animate={{
              height: showSearchResuls ? `${73*searchList.length}px` : '0',
              transition: {
                ease: 'easeInOut',
                duration: 0.2
              }
            }}
          >
            { searchList.length > 0 &&
              searchList.map((item, idx) => 
                <ItemFriend key={idx} friendData={item}/>
              )
            }
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const ItemFriend = ({friendData}: {friendData: IUser}) => {
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
            <p className="text-gray-500 text-[14px]">{friendData?.id}</p>
          </div>

          <div className="flex flex-col items-end gap-y-[6px]">
            <p className="text-emerald-400 text-[12px] font-bold">Mi estado</p>

            <div className="relative">
              <motion.button
                animate={{x: isHovered ? -18 : 0}}
                className="absolute right-0 flex items-center justify-center w-[25px] h-[25px] rounded-full bg-emerald-400"
              >
                <i className="fi fi-rr-user-add text-[14px] mt-[2px] text-white"/>
              </motion.button>

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

export default SidebarFriends