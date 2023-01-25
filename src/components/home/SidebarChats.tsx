import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { initializeSocket, joinRoom } from "../../helpers/Socket";

const SidebarChats = () => {
  const [inputSearch, setInputSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    initializeSocket();
    setIsLoading(false);
  });

  return (
    <div className='flex flex-col w-[370px] h-full bg-white'>
      <div className="flex items-center mx-4 my-2 px-4 py-2 gap-x-4 bg-uiBG rounded-lg">
        <i className={`fi ${inputSearch.length == 0 ? 'fi-br-search text-gray-500' : 'fi-br-arrow-left text-emerald-400'} mr-2 text-[14px] `}/>
        <input 
          className='w-full appearance-none text-[14px] text-righ focus:outline-none bg-transparent text-gray-700'
          type='search'
          value={inputSearch}
          placeholder='Buscar un chat o inicia uno nuevo.'
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </div>

      <hr />
      
      <div className="flex flex-col h-[538px] overflow-y-scroll">
        { !isLoading &&
          Array(6).fill(0).map((item, idx) => 
            <ItemChat key={idx} chatData={idx}/>
          )
        }

        <div className="flex items-center justify-center text-gray-600">
          <i className="fi fi-sr-lock text-[12px] mt-1 -mr-1 "/>
          <p className="m-3 text-[12px]">Tus mensajes personales están cifrados con AES256</p>
        </div>
      </div>
    </div>
  )
}

const ItemChat = ({chatData}: {chatData: number}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    joinRoom(String(chatData));
  }, []);

  return (
    <div
      className="py-[11px] border-b transition hover:bg-gray-100 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-x-4 mx-4">
        <div className="w-[50px] h-[50px] bg-slate-300 rounded-full"/>

        <div className="flex flex-1">
          <div className="flex-1">
            <p className="">Club de Algoritmia GDA</p>
            <p className="text-gray-500 text-[14px]">Last message</p>
          </div>

          <div className="flex flex-col items-end gap-y-[6px]">
            <p className="text-emerald-400 text-[12px] font-bold">12:55 p. m.</p>

            <div className="relative">
              <motion.div
                animate={{x: isHovered ? -18 : 0}}
                className="absolute right-0 flex items-center justify-center w-[30px] h-[20px] rounded-full bg-emerald-400"
              >
                <p className="text-[12px] text-white">52</p>
              </motion.div>

              <AnimatePresence mode="wait">
                { isHovered &&
                  <motion.i
                    className="absolute left-1 opacity-0 fi fi-br-angle-small-down text-gray-500 hover:text-gray-700"
                    animate={{opacity: isHovered ? 1 : 0, x: isHovered ? -20 : 0}}
                  />
                }
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarChats