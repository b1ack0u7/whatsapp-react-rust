import SidebarChats from '../components/home/SidebarChats';
import Draggable from '../components/ui/Draggable';

const Home = () => {
  return (
    <div className='flex flex-col h-screen '>
      <Draggable />

      <div className='flex-1 select-none bg-wht'>
        <div className='flex h-full'>
          <SidebarChats />
          <div>
            Hey
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home