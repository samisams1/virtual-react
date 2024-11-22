import { Dispatch } from 'redux';
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  CREATE_ITEM_REQUEST,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_FAILURE,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  Item, // Adjust this import to reflect your item type
  ItemActionTypes,
  FETCH_ITEM_BY_SUBCATEGORY_REQUEST,
  FETCH_ITEM_BY_SUBCATEGORY_SUCCESS,
  FETCH_ITEM_BY_SUBCATEGORY_FAILURE,
  FETCH_ITEM_BY_ID_REQUEST,
  FETCH_ITEM_BY_ID_SUCCESS,
  FETCH_ITEM_BY_ID_FAILURE,
} from '../types';
import { API_URL } from '@/services/api';

// Fetch Items
export const fetchItems = () => {
  return async (dispatch: Dispatch<ItemActionTypes>) => {
    dispatch({ type: FETCH_ITEMS_REQUEST });

    try {
      const response = await fetch(`${API_URL}product`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data: Item[] = await response.json();
      dispatch({ type: FETCH_ITEMS_SUCCESS, payload: data });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      dispatch({ type: FETCH_ITEMS_FAILURE, payload: errorMessage });
    }
  };
};

// Create Item
export const createItem = (formData: FormData) => {
  return async (dispatch: Dispatch<ItemActionTypes>) => {
    dispatch({ type: CREATE_ITEM_REQUEST });

    try {
      const response = await fetch(`${API_URL}product/create`, {
        method: 'POST',
        body: formData, // Use formData directly
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const newItem: Item = await response.json();
      dispatch({ type: CREATE_ITEM_SUCCESS, payload: newItem });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      dispatch({ type: CREATE_ITEM_FAILURE, payload: errorMessage });
    }
  };
};

// Update Item
export const updateItem = (item: Item) => {
  return async (dispatch: Dispatch<ItemActionTypes>) => {
    dispatch({ type: UPDATE_ITEM_REQUEST });

    try {
      const response = await fetch(`${API_URL}/item/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const updatedItem: Item = await response.json();
      dispatch({ type: UPDATE_ITEM_SUCCESS, payload: updatedItem });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      dispatch({ type: UPDATE_ITEM_FAILURE, payload: errorMessage });
    }
  };
};

// Delete Item
export const deleteItem = (id: number) => {
  return async (dispatch: Dispatch<ItemActionTypes>) => {
    dispatch({ type: DELETE_ITEM_REQUEST });

    try {
      const response = await fetch(`${API_URL}/item/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Network response was not ok');
      dispatch({ type: DELETE_ITEM_SUCCESS, payload: id });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      dispatch({ type: DELETE_ITEM_FAILURE, payload: errorMessage });
    }
  };
};


/*export const fetchItemsBySubcategoryId = (subcategoryId: number) => {
  return async (dispatch: Dispatch<ItemActionTypes>) => {
      dispatch({ type: FETCH_ITEM_BY_SUBCATEGORY_REQUEST });

      try {
          const response = await fetch(`${API_URL}product`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          dispatch({ type: FETCH_ITEM_BY_SUBCATEGORY_SUCCESS, payload: data });
      } catch (error) {
          const errorMessage = (error as Error).message || 'An unknown error occurred';
          dispatch({ type: FETCH_ITEM_BY_SUBCATEGORY_FAILURE, payload: errorMessage });
      }
  };
};
*/
//

export const fetchItemById = (id: number) => async (dispatch: any) => {
  dispatch({ type: FETCH_ITEM_BY_ID_REQUEST });

  try {
    const response = await fetch(`${API_URL}product/product/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Item = await response.json(); // Ensure this is a single Item
    dispatch({ type: FETCH_ITEM_BY_ID_SUCCESS, payload: data }); // Dispatch the single Item
  } catch (error) {
    const errorMessage = (error as Error).message || 'An unknown error occurred';
          dispatch({ type: FETCH_ITEM_BY_ID_FAILURE, payload: errorMessage });
  }
};
//
export const fetchItemsBySubcategoryId =  (subcategoryId: number) => {
  return async (dispatch: Dispatch<ItemActionTypes>) => {
    dispatch({ type: FETCH_ITEM_BY_SUBCATEGORY_REQUEST });

    try {
      const response = await fetch(`${API_URL}product/subcategory/${subcategoryId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      dispatch({ type: FETCH_ITEM_BY_SUBCATEGORY_SUCCESS, payload: data });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
          dispatch({ type: FETCH_ITEM_BY_SUBCATEGORY_FAILURE, payload: errorMessage });
    }
  };
};