import { appWindow } from '@tauri-apps/api/window';
import { useDispatch } from 'react-redux';
import { setSidebarMenuShow } from '../../redux/slices/appSlice';

const Draggable = () => {
  const dispatch = useDispatch();

  return (
    <div
      className='flex h-[58px] border-b border-b-gray-300 bg-uiBG'
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
      <div className='flex items-center gap-x-4 ml-[5rem] w-[290px] px-5 text-[18px] border-r border-r-gray-300 text-gray-700'>
        <div 
          className='flex justify-center items-center w-[35px] h-[35px] rounded-full cursor-pointer bg-gray-300'
          onClick={() => dispatch(setSidebarMenuShow(true))}
        >
          <i className='fi fi-sr-user mt-1 text-[16px]'/>
        </div>

        <div className='flex ml-4 gap-x-6 mt-[6px] text-gray-600'>
          <i className='fi fi-rr-comment-alt cursor-pointer transition hover:text-black'/>
          <i className='fi fi-rr-comments cursor-pointer transition hover:text-black'/>
        </div>
      </div>

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
    </div>
  )
}

export default Draggable