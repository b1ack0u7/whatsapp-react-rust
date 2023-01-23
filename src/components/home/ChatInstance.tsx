import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';
import BG from '../../assets/bg-chat.png';
import InputField from './InputField';

const ChatInstance = () => {
  return (
    <div className='flex flex-col flex-1'>
      <div className='absolute w-full h-full bg-chatBG z-0'/>
      <div
        className='absolute w-full h-full opacity-50 z-10'
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: 'cover'
        }}
      />

      <div className='z-10'>
        <div className='flex flex-col h-[530px] overflow-y-scroll mx-6 mt-1 pb-4 gap-y-2'>
          <IncomingMessage />
          <OutgoingMessage />
          <IncomingMessage />
        </div>

        <InputField />
      </div>
    </div>
  )
}

export default ChatInstance