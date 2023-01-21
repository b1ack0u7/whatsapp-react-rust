import Draggable from '../components/ui/Draggable';
import BG from '../assets/bg-chat.png';

const Login = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Draggable />

      <div className='flex-1 select-none bg-uiBG'>
        <p>Hola</p>
      </div>
    </div>
  )
}

export default Login