import { useState } from 'react';

const InputField = () => {
  const [message, setMessage] = useState<string>('');

  return (
    <div className='flex items-center justify-center gap-x-4 px-6 py-3 bg-uiBG border-t border-t-gray-300'>
      <div className='flex mt-1 text-[20px] text-gray-500 gap-x-4'>
        <i className='fi fi-rr-face-awesome cursor-pointer'/>
        <i className='fi fi-rr-clip cursor-pointer'/>
      </div>

      <input 
        className='appearance-none focus:outline-none flex-1 py-2 px-3 rounded-lg text-gray-600 text-[15px] placeholder:font-light'
        type='text'
        value={message}
        placeholder='Escribe un mensaje aquí'
        onChange={(e) => setMessage(e.target.value)}
      />

      { message.length == 0 ?
        <i className='fi fi-rr-microphone text-[20px] mt-1 text-gray-500 cursor-pointer'/>
        :
        <i className='fi fi-rr-paper-plane text-[20px] mt-1 text-gray-500 cursor-pointer'/>
      }
    </div>
  )
}

export default InputField