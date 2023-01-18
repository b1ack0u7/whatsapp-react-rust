import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react"

const SidebarChats = () => {
  const [inputSearch, setInputSearch] = useState<string>('');

  return (
    <div className='w-[410px] h-full bg-white'>
      <div className="flex items-center mx-4 my-2 px-4 py-2 gap-x-4 bg-wht rounded-lg">
        <i className={`fi ${inputSearch.length == 0 ? 'fi-br-search text-gray-500' : 'fi-br-arrow-left text-emerald-400'} mr-2 text-[14px] `}/>
        <input 
          className='w-full appearance-none text-[14px] text-righ focus:outline-none bg-transparent'
          type='search'
          value={inputSearch}
          placeholder='Buscar un chat o inicia uno nuevo.'
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </div>

      <hr />

      <div className="flex flex-col">
        {
          Array(3).fill(0).map(() => 
            <ItemChat />
          )
        }
      </div>
    </div>
  )
}

const ItemChat = () => {
  const [isHovered, setIsHovered] = useState<boolean>(true);

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
                    transition={{}}
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