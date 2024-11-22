// src/hooks/users.ts
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '@/redux/store';
import { fetchUsers } from '@/redux/actions';
import { RootState } from '@/redux/reducers/rootReducer';

export const useFetchUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, users, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return { loading, users, error };
};