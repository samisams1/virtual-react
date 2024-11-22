// src/hooks/useFetchItemBySubcategoryId.ts
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchItemsBySubcategoryId } from '@/redux/actions/itemActions';

export const useFetchProductsBySubcategoryId = (subcategoryId: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, items, error } = useSelector((state: RootState) => state.item);

  useEffect(() => {
    if (subcategoryId) {
      dispatch(fetchItemsBySubcategoryId(subcategoryId));
    }
  }, [dispatch, subcategoryId]);

  return { loading, items, error };
};