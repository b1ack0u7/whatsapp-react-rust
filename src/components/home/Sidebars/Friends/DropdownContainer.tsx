import { motion } from 'framer-motion'
import React, { FC } from 'react'

const DropdownContainer = <T extends object>({
  arrayOfItems = [],
  Children,
  childrenProps = {},
  heightOfItem = 73,
  label = '',
  setShowContainer,
  showContainer,
}: {
  arrayOfItems: T[],
  Children: FC<{item: T, inheritedProps: any}>,
  childrenProps?: any,
  heightOfItem?:number,
  label?: string,
  showContainer: boolean,
  setShowContainer: React.Dispatch<React.SetStateAction<boolean>>
}) => {

  return (
    <div>
      <div className='bg-gray-200'>
        <div className='flex justify-between item-center mx-6 py-1 text-gray-800'>
          <p>{label}</p>

          <div className='flex items-center gap-x-1'>
            <p className='text-[12px] font-bold text-gray-500'>{arrayOfItems.length}</p>
            <motion.button
              className='mt-[2px] disabled:cursor-not-allowed'
              animate={{
                rotate: showContainer && arrayOfItems.length > 0 ? 0 : 180,
                y: showContainer && arrayOfItems.length > 0 ? 0 : -2,
                transition: {
                  ease: 'easeInOut',
                  duration: 0.15
                }
              }}
              disabled={arrayOfItems.length == 0 ? true : false}
              onClick={() => setShowContainer(bool => !bool)}
            >
              <i className='fi fi-rr-caret-down'/>
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div
        className='overflow-y-auto'
        animate={{
          height: showContainer ? `${heightOfItem*arrayOfItems.length}px` : '0',
          transition: {
            ease: 'easeInOut',
            duration: 0.2
          }
        }}
      >
        { arrayOfItems.length > 0 &&
          arrayOfItems.map((item, idx) => 
            <Children key={idx} item={item} inheritedProps={childrenProps}/>
          )
        }
      </motion.div>
    </div>
  )
}

export default DropdownContainer