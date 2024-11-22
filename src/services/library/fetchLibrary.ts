// src/hooks/Library.ts
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/reducers/rootReducer';
import { fetchItems } from '@/redux/actions/itemActions';

export const useFetchLibraryData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, items, error } = useSelector((state: RootState) => state.item);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return { loading, items, error };
};