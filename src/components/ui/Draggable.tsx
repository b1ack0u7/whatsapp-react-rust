import React from 'react'
import { appWindow } from '@tauri-apps/api/window';

const Draggable = () => {
  return (
    <div
      className='bg-wht h-[58px]'
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
    </div>
  )
}

export default Draggable