import React from 'react'
import { appWindow } from '@tauri-apps/api/window';

const Draggable = () => {
  return (
    <div
      className='flex h-[58px] bg-uiBG'
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
      <div className='flex items-center gap-x-4 ml-[5rem] w-[290px] px-5 text-[18px] text-gray-700'>
        <div className='flex justify-center items-center w-[35px] h-[35px] rounded-full cursor-pointer bg-gray-300'>
          <i className='fi fi-sr-user mt-1 text-[16px]'/>
        </div>

        <div className='flex ml-4 gap-x-6 mt-[6px]'>
          <i className='fi fi-rr-comment-alt cursor-pointer'/>
          <i className='fi fi-rr-comments cursor-pointer'/>
        </div>
      </div>

      <div className='flex-1 bg-blue-300'>
        hey
      </div>
    </div>
  )
}

export default Draggable