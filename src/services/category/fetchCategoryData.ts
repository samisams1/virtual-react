// src/hooks/fetchCategoryData.ts
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '@/redux/actions'; // Adjust the import path
import { RootState,AppDispatch } from '@/redux/store';

export const useFetchCategoryData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, categories, error } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return { loading, categories, error };
};