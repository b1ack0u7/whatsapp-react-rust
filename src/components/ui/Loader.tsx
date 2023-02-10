import Lottie from 'lottie-react';
import loading from '../../assets/loading-lottie.json';

const Loader = () => {
  return (
    <div className='absolute w-screen h-screen select-none bg-uiBG z-20'>
      <div className='flex flex-col h-screen justify-center items-center'>
        <Lottie className='w-[200px] h-[200px] m-auto' animationData={loading} loop={true}/>
      </div>
    </div>
  )
}

export default Loader