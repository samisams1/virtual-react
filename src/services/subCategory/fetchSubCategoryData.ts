// src/hooks/fetchSubcategories.ts
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '@/redux/store';
import { fetchSubcategories } from '@/redux/actions';
import { RootState } from '@/redux/reducers/rootReducer';

export const useFetchSubCategoryData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, subcategories, error } = useSelector((state: RootState) => state.subCategory);

  useEffect(() => {
    dispatch(fetchSubcategories());
  }, [dispatch]);

  return { loading, subcategories, error };
};