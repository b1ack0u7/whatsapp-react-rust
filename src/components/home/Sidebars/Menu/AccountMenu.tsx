import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EAlert } from '../../../../interfaces/enums';
import { enqueueAlert } from '../../../../redux/slices/appSlice';
import { RootState } from '../../../../redux/store';

const AccountMenu = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userReducer);

  const [userName, setUserName] = useState<string>(userData.name!);
  const [activeEditMode, setActiveEditMode] = useState<boolean>(false);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id)
    dispatch(enqueueAlert({alertData: {alertType: EAlert.info, message: 'ID copiado'}}));
  }

  return (
    <div className='flex flex-col gap-y-6 mt-6 mb-4'>
      <div className='w-[130px] h-[130px] rounded-full mx-auto bg-white'/>

      <div className='flex flex-col px-8 py-2 gap-y-2 bg-white'>
        <p className='text-[#018068] text-[14px]'>Tu nombre</p>

        <div className='flex justify-between'>
          <input 
            className='mb-1 appearance-none focus:outline-none'
            type='text'
            value={userName}
            placeholder='Tu nombre'
            onChange={(e) => setUserName(e.target.value)}
            disabled={!activeEditMode}
          />
          <button onClick={() => setActiveEditMode(mode => !mode)}>
            { activeEditMode ?
              <i className='fi fi-br-cross text-gray-500'/>
              :
              <i className='fi fi-sr-pencil text-gray-500'/>
            }
          </button>
        </div>
      </div>

      <div className='flex flex-col px-8 py-2 gap-y-2 bg-white'>
        <p className='text-[#018068] text-[14px]'>Tu ID</p>
        <div className='flex justify-between'>
          <p className='text-gray-700'>{userData.id}</p>
          <button onClick={() => handleCopyId(userData.id!)}>
            <i className='fi fi-rr-copy-alt text-gray-500'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountMenu