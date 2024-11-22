// src/hooks/items.ts
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState,AppDispatch } from '@/redux/store';
import { fetchItems } from '@/redux/actions/itemActions';

export const useFetchItemData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, items, error } = useSelector((state: RootState) => state.item);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return { loading, items, error };
};