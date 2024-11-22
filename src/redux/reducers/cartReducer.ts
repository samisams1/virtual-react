// cartReducer.ts

import { CartState, CartActionTypes, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from '../types';

const initialState: CartState = {
    items: [],
};

const cartReducer = (state = initialState, action: CartActionTypes): CartState => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        case UPDATE_QUANTITY:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                ),
            };
        default:
            return state;
    }
};

export default cartReducer;