import Draggable from '../components/ui/Draggable';
import requester from '../helpers/Requester';
import { IRequest, IUser } from '../interfaces/interfaces';
import { useEffect, useState } from 'react';
import UserCard from '../components/login/UserCard';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userList, setUserList] = useState<IUser[]>([]);

  const fetchUsers = async() => {
    const respUsers:IRequest<IUser[]> = await requester({url: 'http://localhost:4002/whatsapp/fetchUser'});
    if (!respUsers.success) return;
    setUserList([...respUsers.response]);
  }

  const handleSelectUser = (user: IUser):void => {
    dispatch(setCurrentUser(user));
    navigate('/home', {replace: true});
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='flex flex-col h-screen'>
      <Draggable />

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