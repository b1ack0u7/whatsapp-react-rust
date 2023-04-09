import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EAlert } from '../../../../interfaces/enums';
import { enqueueAlert } from '../../../../redux/slices/appSlice';
import { RootState } from '../../../../redux/store';
import requester from '../../../../helpers/Requester';
import { IRequest } from '../../../../interfaces/interfaces';
import { updateCurrentUser } from '../../../../redux/slices/userSlice';

const AccountMenu = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userReducer);
  
  const inputNameRef = useRef<any>(undefined);
  const inputImageRef = useRef<HTMLInputElement>(null);
  
  const [userName, setUserName] = useState<string>(userData.name!);
  const [activeEditMode, setActiveEditMode] = useState<boolean>(false);
  const [userPhoto, setUserPhoto] = useState<string | undefined>(userData.photoURL);
  
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id)
    dispatch(enqueueAlert({alertData: {alertType: EAlert.info, message: 'ID copiado'}}));
  }
  
  const handleEditName = async() => {
    if (activeEditMode && userData.name !== userName) {
      const respUpdateUser: IRequest<string> = await requester({url: '/updateUserData', method: 'PATCH', data: {id: userData.id, name: userName}});
      if (!respUpdateUser.success) {
        dispatch(enqueueAlert({alertData: {alertType: EAlert.error, message: respUpdateUser.reason}}));
        return;
      }

      dispatch(updateCurrentUser({name: userName}));
      dispatch(enqueueAlert({alertData: {alertType: EAlert.success, message: 'Se actualizo su nombre'}}));
    }
    
    setActiveEditMode(mode => !mode); 
  }
  
  const handleChangePhoto = async(e: any) => {
    e.preventDefault();
    const photo = e.target.files[0];
    if (photo.size > 2 * 1024 * 1024) {
      dispatch(enqueueAlert({alertData: {alertType: EAlert.error, message: 'Su imagen excede los 5 mb'}}));
      return;
    }

    const data = new FormData();
    data.append('file', photo);
    data.append('id', userData.id!);
  
    const respUpdateUser: IRequest<string> = await requester({url: '/updateUserData', method: 'PATCH', data: data, extraHeaders: {'Content-Type': 'multipart/form-data'}});
    if (!respUpdateUser.success) {
      dispatch(enqueueAlert({alertData: {alertType: EAlert.error, message: respUpdateUser.reason}}));
      return;
    }

    const photoURL = URL.createObjectURL(photo)
    dispatch(updateCurrentUser({photoURL}));
    dispatch(enqueueAlert({alertData: {alertType: EAlert.success, message: 'Se actualizo su foto'}}));
    setUserPhoto(photoURL);
  }

  useEffect(() => {
    if (activeEditMode) inputNameRef.current.focus();
  }, [activeEditMode]);

  return (
    <div className='flex flex-col gap-y-6 mt-6 mb-4'>
      <input
        className='hidden'
        type='file'
        multiple={false}
        accept='.png,.jpeg,.jpg'
        ref={inputImageRef}
        onChange={handleChangePhoto}
      />
      <button
        className='w-[130px] h-[130px] rounded-full mx-auto bg-white br'
        onClick={(e) => inputImageRef.current!.click()}
      >
        { userPhoto &&
          <img
            className='w-[130px] h-[130px] rounded-full border-none'
            src={userPhoto}
          />
        }
      </button>

      <div className='flex flex-col px-8 py-2 gap-y-2 bg-white'>
        <p className='text-[#018068] text-[14px]'>Tu nombre</p>

        <div className='flex justify-between'>
          <input 
            className='mb-1 appearance-none bg-white focus:outline-none'
            type='text'
            value={userName}
            ref={inputNameRef}
            placeholder='Tu nombre'
            onChange={(e) => setUserName(e.target.value)}
            disabled={!activeEditMode}
          />
          <button onClick={handleEditName}>
            { activeEditMode ?
              <i className='fi fi-br-disk text-gray-500'/>
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