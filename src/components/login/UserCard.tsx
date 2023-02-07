import { IUser } from '../../interfaces/interfaces'

const UserCard = ({userData, handleSelectUser}: {userData: IUser, handleSelectUser: (user: IUser) => void}) => {
  return (
    <button 
      className='p-3 rounded-md text-center bg-white cursor-pointer transition hover:bg-gray-100'
      onClick={() => handleSelectUser(userData)}
    >
      <p>{userData.name}</p>
      <p>{userData.email}</p>
      <p>{userData.id}</p>
    </button>
  )
}

export default UserCard