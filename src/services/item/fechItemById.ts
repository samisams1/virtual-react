// src/hooks/useFetchItemBySubcategoryId.ts
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchItemById } from '@/redux/actions/itemActions';

export const useFetchItemById = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, currentItem, error } = useSelector((state: RootState) => state.item);

  useEffect(() => {
    if (id) {
      dispatch(fetchItemById(id));
    }
  }, [dispatch, id]);

  return { loading, currentItem, error };
};
