import SecurityMenu from './Security/SecurityMenu'

const SidebarMenu = () => {
  return (
    <div className='absolute flex flex-col top-0 w-[370px] h-full'>
      <div className='flex h-[108px] bg-[#018068]'>
        <div className='flex gap-x-4 items-center mt-8 px-4 text-white'>
          <i className='fi fi-br-arrow-left mt-1 cursor-pointer text-[18px]'/>
          <p className='text-[20px]'>Ajustes</p>
        </div>
      </div>

      <div className='flex flex-1 px-4 bg-uiBG'>
        <SecurityMenu />
      </div>
    </div>
  )
}

export default SidebarMenu