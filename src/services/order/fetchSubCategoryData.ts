// src/hooks/fetchOrders.ts
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/reducers/rootReducer';
import { fetchOrders } from '@/redux/actions';

export const useFetchOrderData = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, orders, error } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchOrders()); // Dispatch the action
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        // Additional error handling can be done here
      }
    };

    fetchData();
  }, [dispatch]);

  return { loading, orders, error };
};