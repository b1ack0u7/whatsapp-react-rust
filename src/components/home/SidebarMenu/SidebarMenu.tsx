import { useDispatch } from 'react-redux';
import { setSidebarMenuShow } from '../../../redux/slices/appSlice';
import SecurityMenu from './Security/SecurityMenu';

const SidebarMenu = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className='flex h-[108px] bg-[#018068]'>
        <div className='flex gap-x-4 items-center mt-8 px-4 text-white'>
          <i 
            className='fi fi-br-arrow-left mt-1 cursor-pointer text-[18px]'
            onClick={() => dispatch(setSidebarMenuShow(false))}
          />
          <p className='text-[20px]'>Ajustes</p>
        </div>
      </div>

      <div className='flex flex-col flex-1 pt-2 px-4 bg-uiBG'>
        <SecurityMenu />
      </div>
    </>
  )
}

export default SidebarMenu