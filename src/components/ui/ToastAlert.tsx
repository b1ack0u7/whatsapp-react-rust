import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EAlert } from '../../interfaces/enums';
import { IAlert } from '../../interfaces/interfaces';
import { enqueueAlert, resetCurrentAlert } from '../../redux/slices/appSlice';

const ToastAlert = ({alertData}: {alertData: IAlert}) => {
  const dispatch = useDispatch();

  let dataContainer: {
    bgColor?: string;
    icon?: string;
    iconColor?: string;
    titleColor?: string;
    title?: string;
    messageColor?: string;
    message?: string;
  } = {
    bgColor: 'bg-emerald-300/30',
    icon: 'fi-br-check',
    iconColor: 'text-emerald-500',
    titleColor: 'text-emerald-900',
    title: 'Exito',
    messageColor: 'text-emerald-800',
    message: alertData.message || 'Se completo la operación'
  };

  switch (alertData.alertType) {
    case EAlert.error:
      dataContainer.bgColor = 'bg-red-300/30',
      dataContainer.icon = 'fi-rr-cross-circle'
      dataContainer.iconColor = 'text-red-500',
      dataContainer.titleColor = 'text-red-900',
      dataContainer.title = 'Error',
      dataContainer.messageColor = 'text-red-800',
      dataContainer.message = alertData.message || 'Ocurrio un error'
      break;

    case EAlert.info:
      dataContainer.bgColor = 'bg-blue-300/30',
      dataContainer.icon = 'fi fi-rr-info',
      dataContainer.iconColor = 'text-blue-500',
      dataContainer.titleColor = 'text-blue-900',
      dataContainer.title = 'Info',
      dataContainer.messageColor = 'text-blue-800',
      dataContainer.message = alertData.message || 'Info'

    default:
      break;
  };

  const handleDismiss = () => {
    setTimeout(async() => {
      dispatch(resetCurrentAlert());
    }, 2000);
  }

  useEffect(() => {
    return () => {
      dispatch(enqueueAlert({type: 'reload'}))
    }
  }, []);
  

  return (
    <motion.div
      className='absolute flex -bottom-[70px] w-full z-30'
      initial={{y: 0}}
      animate={{y: -100}}
      exit={{y: 0}}
      transition={{ ease: 'easeInOut'}}
      onAnimationComplete={handleDismiss}
    >
      <div className={`flex gap-x-3 mx-auto ${dataContainer.bgColor} pt-3 pb-2 px-3 rounded-lg`}>
        <i className={`fi ${dataContainer.icon} mt-1 ${dataContainer.iconColor}`}/>
        <div className='flex flex-col'>
          <p className={`font-semibold text-[17px] ${dataContainer.titleColor}`}>{dataContainer.title}</p>
          <p className={dataContainer.messageColor}>{dataContainer.message}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default ToastAlert