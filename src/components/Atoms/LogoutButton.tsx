import { useDispatch } from 'react-redux';
import { logout } from '../../store/user/userSlice';

const LogoutButton = ({showButton}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!showButton) {
    return null;
  }

  return (
    <button onClick={handleLogout} className='bg-[#950101aa] rounded p-1 absolute right-4'>Logout</button>
  );
};

export default LogoutButton;
