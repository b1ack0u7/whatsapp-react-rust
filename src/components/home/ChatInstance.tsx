import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';
import BG from '../../assets/bg-chat.png';

const ChatInstance = () => {
  return (
    <div
      className='flex-1 h-[593px] overflow-y-scroll bg-chatBG'
      style={{
        backgroundImage: `url(${BG})`,
        backgroundSize: 'cover'
      }}
    >
      <div className='flex flex-col mx-6 my-1 gap-y-2'>
        <IncomingMessage />
        <OutgoingMessage />
        <IncomingMessage />
      </div>
    </div>
  )
}

export default ChatInstance