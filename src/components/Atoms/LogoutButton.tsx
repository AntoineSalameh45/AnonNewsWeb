import { useDispatch } from 'react-redux';
import { logout } from '../../store/user/userSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button onClick={handleLogout} className='bg-[#950101aa] rounded p-1 absolute right-4'>Logout</button>
  );
};

export default LogoutButton;
