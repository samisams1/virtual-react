// cartActions.ts

import {
  ADD_TO_CART,
  UPDATE_QUANTITY,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CartItem,
  CartActionTypes,
} from '../types';

export const addToCart = (item: CartItem): CartActionTypes => ({
  type: ADD_TO_CART,
  payload: item,
});

export const updateQuantity = (id: number, quantity: number): CartActionTypes => ({
  type: UPDATE_QUANTITY,
  payload: { id, quantity },
});

export const removeFromCart = (id: number): CartActionTypes => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const clearCart = (): CartActionTypes => ({
  type: CLEAR_CART,
});