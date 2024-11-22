import { OrderActionTypes, FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE, Order } from '../actions/orderActions'; // Adjust the import path as necessary

interface OrdersState {
  loading: boolean;
  orders: Order[];
  error: string | null;
}

const initialState: OrdersState = {
  loading: false,
  orders: [],
  error: null,
};

const ordersReducer = (state = initialState, action: OrderActionTypes): OrdersState => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;