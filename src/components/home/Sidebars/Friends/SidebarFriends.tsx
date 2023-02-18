import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import requester from '../../../../helpers/Requester';
import { EAlert } from '../../../../interfaces/enums';
import { IRequest, IUser } from '../../../../interfaces/interfaces';
import { enqueueAlert } from '../../../../redux/slices/appSlice';
import DropdownContainer from './DropdownContainer';
import FriendItem from './FriendItem';

const SidebarFriends = ({userData}: {userData: IUser}) => {
  const dispatch = useDispatch();

  const [inputSearch, setInputSearch] = useState<string>('');
  const [searchBy, setSearchBy] = useState<number>(0);
  const [searchList, setSearchList] = useState<IUser []>([]);
  const [showFriends, setShowFriends] = useState<boolean>(true);
  const [showSearchResuls, setShowSearchResuls] = useState<boolean>(false);

  const searchFriends = async() => {
    if (searchBy === 1 && inputSearch.length === 0) return;

    const respUsersInfo: IRequest<IUser[] | IUser> = await requester({
      url: 'http://localhost:4002/whatsapp/fetchUser',
      params: {[searchBy === 0 ? 'userName' : 'idUser']: inputSearch}
    });
    if (!respUsersInfo.success) {
      setSearchList([]);
      setShowSearchResuls(false);
      dispatch(enqueueAlert({alertData: {alertType: EAlert.error}}));
      return;
    };
    
    let tmpSearchList:IUser[] = [];
    let friendIds = new Set(userData.friendList?.map(item => item.id) || []);
    friendIds.add(userData.id);
    if (searchBy === 0) {
      for (let user of respUsersInfo.response as IUser[]) {
        if (!friendIds.has(user.id)) tmpSearchList.push(user);
      }
    } else {
      const { id } = respUsersInfo.response as IUser;
      if (!friendIds.has(id)) tmpSearchList = [respUsersInfo.response as IUser];
    }

    if (tmpSearchList.length === 0) {
      setSearchList([]);
      setShowSearchResuls(false);
      setInputSearch('');
      dispatch(enqueueAlert({alertData: {alertType: EAlert.info, message: 'No hay resultados'}}));
      return;
    }

    setSearchList([...tmpSearchList]);
    setShowSearchResuls(tmpSearchList.length > 0 ? true : false);
  }

  return (
    <div className='flex flex-col w-[370px] h-full bg-white'>
      <div className="flex items-center mx-4 my-2 px-4 py-2 gap-x-4 bg-uiBG rounded-lg">
        <i className={`fi fi-br-search text-gray-500 mr-2 text-[14px] `}/>
        <input 
          className='w-full appearance-none text-[14px] text-righ focus:outline-none bg-transparent text-gray-700'
          type='search'
          value={inputSearch}
          placeholder='Buscar un usuario.'
          onChange={(e) => setInputSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchFriends()}
        />
      </div>

      <div className='relative flex mx-4 p-1 rounded-lg bg-gray-200 mb-2'>
        <button
          className='w-1/2 py-1 rounded-md text-gray-700 bg-transparent z-10'
          onClick={() => setSearchBy(0)}
        >
          Buscar por nombre
        </button>

        <button
          className='w-1/2 py-1 rounded-md text-gray-700 bg-transparent z-10'
          onClick={() => setSearchBy(1)}
        >
          Buscar por ID
        </button>

        <motion.div 
          className='absolute w-[49%] h-[31.8px] p-2 rounded-md bg-white z-0'
          animate={{
            x: searchBy === 0 ? 0 : 165,
            transition: {
              ease: 'easeInOut',
              duration: 0.15
            }
          }}
        />
      </div>

      <div className="flex flex-col h-[489px] overflow-y-scroll">
        <DropdownContainer
          arrayOfItems={userData.friendList!}
          Children={FriendItem}
          childrenProps={{
            enableAcceptRejectButton: false,
            enableAddButton: false,
            showOptions: true,
          }}
          label='Mis amigos'
          setShowContainer={setShowFriends}
          showContainer={showFriends}
        />

        <DropdownContainer
          arrayOfItems={searchList}
          Children={FriendItem}
          childrenProps={{
            enableAcceptRejectButton: false,
            enableAddButton: true,
            showOptions: false
          }}
          label='Resultados de busqueda'
          setShowContainer={setShowSearchResuls}
          showContainer={showSearchResuls}
        />
      </div>
    </div>
  )
}

export default SidebarFriends