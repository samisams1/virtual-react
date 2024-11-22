// hooks/useLogout.ts

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/redux/actions/loginAction';
import { AppDispatch } from '@/redux/store';

const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/home'); // Redirect to the login page after logout
  };

  return handleLogout; // Return the logout function
};

export default useLogout;