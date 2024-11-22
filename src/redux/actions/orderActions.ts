export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

import { API_URL } from '@/services/api';

// Action Types
interface FetchOrdersRequestAction {
  type: typeof FETCH_ORDERS_REQUEST;
}

interface FetchOrdersSuccessAction {
  type: typeof FETCH_ORDERS_SUCCESS;
  payload: Order[]; // Replace 'any' with your specific order type
}

interface FetchOrdersFailureAction {
  type: typeof FETCH_ORDERS_FAILURE;
  payload: string; // Assuming the error is a string
}

// Define your Order type
export interface Order {
  id: number; // Unique identifier for the order
  items: string[]; // List of items in the order
  totalAmount: number; // Total amount for the order
  quantity: number; // Quantity of items ordered
  status: string; // Status of the order
  created_by: number; // ID of the user who created the order
  approved_by: number; // ID of the user who approved the order
  price: number; // Price per item
  name:string
}

// Combine Action Types
export type OrderActionTypes =
  | FetchOrdersRequestAction
  | FetchOrdersSuccessAction
  | FetchOrdersFailureAction;

// Action Creators
export const fetchOrdersRequest = (): FetchOrdersRequestAction => ({
  type: FETCH_ORDERS_REQUEST,
});

export const fetchOrdersSuccess = (orders: Order[]): FetchOrdersSuccessAction => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders,
});

export const fetchOrdersFailure = (error: string): FetchOrdersFailureAction => ({
  type: FETCH_ORDERS_FAILURE,
  payload: error,
});

// Example Thunk for Fetching Orders
import { Dispatch } from 'redux';

export const fetchOrders = () => {
  return async (dispatch: Dispatch<OrderActionTypes>) => {
    dispatch(fetchOrdersRequest());
    try {
      const response = await fetch(`${API_URL}orders`); // Update with your actual API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Order[] = await response.json();

      dispatch(fetchOrdersSuccess(data));
    } catch (error: unknown) {
      // Type assertion to handle the error
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch(fetchOrdersFailure(errorMessage));
    }
  };
};