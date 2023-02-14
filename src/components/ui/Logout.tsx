import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogoutRequest } from '../../redux/slices/appSlice';
import Backdrop from './Backdrop';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login', {replace: true});
    window.location.reload();
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Escape') dispatch(setLogoutRequest(false));
    else if (e.key === 'Enter') handleLogout();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <Backdrop bgColor='bg-black/20' blur='2'>
      <motion.div 
        className='flex flex-col text-center py-4 px-6 rounded-lg gap-y-6 bg-white'
        initial = {{opacity: 0}}
        animate = {{opacity: 1}}
        exit = {{opacity: 0}}
        transition = {{ duration: 0.2 }}
      >
        <p className='text-[18px] font-medium'>Desea cerrar su sesión?</p>

        <div className='flex gap-x-4'>
          <button
            className='py-2 w-[9rem] rounded-lg transition bg-gray-200 hover:bg-gray-300'
            onClick={() => dispatch(setLogoutRequest(false))}
          >
            Regresar
          </button>

          <button
            className='py-2 w-[9rem] rounded-lg transition bg-emerald-400 hover:bg-emerald-500'
            onClick={() => handleLogout()}
          >
            Cerrar Sesión
          </button>
        </div>
      </motion.div>
    </Backdrop>
  )
}

export default Logout