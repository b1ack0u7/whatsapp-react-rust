import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/login/UserCard';
import Draggable from '../components/ui/Draggable';
import requester from '../helpers/Requester';
import { EAlert } from '../interfaces/enums';
import { IRequest, IUser } from '../interfaces/interfaces';
import { enqueueAlert, setLoggedInRecently } from '../redux/slices/appSlice';
import { setCurrentUser } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appData = useSelector((state: RootState) => state.appReducer);
  const chatData = useSelector((state: RootState) => state.chatReducer);
  const userData = useSelector((state: RootState) => state.userReducer);

  const [userList, setUserList] = useState<IUser[]>([]);

  const fetchUsers = async() => {
    const respUsers:IRequest<IUser[]> = await requester({url: 'http://localhost:4002/whatsapp/fetchUser'});
    if (!respUsers.success) {
      dispatch(enqueueAlert({alertData: {alertType: EAlert.error}}));
      return;
    }
    setUserList(respUsers.response);
  }

  const handleSelectUser = (user: IUser):void => {
    dispatch(setLoggedInRecently(true));
    dispatch(setCurrentUser(user));
    navigate('/home', {replace: true});
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='flex flex-col h-screen'>
      <Draggable appData={appData} userData={userData} chatData={chatData} dispatch={dispatch}/>

      <div className='absolute w-full h-full select-none bg-uiBG'>
        <div className='px-[20vh] py-[35vh] grid grid-cols-3 gap-2'>
            { userList.length > 0 &&
              userList.map((item, idx) => 
                <UserCard key={idx} userData={item} handleSelectUser={handleSelectUser}/>
              )
            }
        </div>
      </div>
    </div>
  )
}

export default Login