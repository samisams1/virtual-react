import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/reducers/rootReducer';
import { fetchCurrentUser } from '@/redux/actions/currentUserActions';

export const useCurrentUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return { currentUser };
};