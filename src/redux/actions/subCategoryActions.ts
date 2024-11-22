import { Dispatch } from 'redux';
import {
  FETCH_SUBCATEGORIES_REQUEST,
  FETCH_SUBCATEGORIES_SUCCESS,
  FETCH_SUBCATEGORIES_FAILURE,
  CREATE_SUBCATEGORY_REQUEST,
  CREATE_SUBCATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_FAILURE,
  UPDATE_SUBCATEGORY_REQUEST,
  UPDATE_SUBCATEGORY_SUCCESS,
  UPDATE_SUBCATEGORY_FAILURE,
  DELETE_SUBCATEGORY_REQUEST,
  DELETE_SUBCATEGORY_SUCCESS,
  DELETE_SUBCATEGORY_FAILURE,
  Subcategory, // Ensure you have a Subcategory type defined
  SubcategoryActionTypes,
} from '../types';
import { API_URL } from '@/services/api';

// Fetch Subcategories
export const fetchSubcategories = () => {
  return async (dispatch: Dispatch<SubcategoryActionTypes>) => {
    dispatch({ type: FETCH_SUBCATEGORIES_REQUEST });

    try {
      const response = await fetch(`${API_URL}subCategory`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data: Subcategory[] = await response.json();
      dispatch({ type: FETCH_SUBCATEGORIES_SUCCESS, payload: data });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      dispatch({ type: FETCH_SUBCATEGORIES_FAILURE, payload: errorMessage });
    }
  };
};

// Create Subcategory
export const createSubcategory = (subcategory: Omit<Subcategory, 'id'>) => {
  return async (dispatch: Dispatch<SubcategoryActionTypes>) => {
    dispatch({ type: CREATE_SUBCATEGORY_REQUEST });

    try {
      const response = await fetch(`${API_URL}subCategory/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subcategory),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const newSubcategory: Subcategory = await response.json();
      dispatch({ type: CREATE_SUBCATEGORY_SUCCESS, payload: newSubcategory });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      dispatch({ type: CREATE_SUBCATEGORY_FAILURE, payload: errorMessage });
    }
  };
};

// Update Subcategory
export const updateSubcategory = (subcategory: Subcategory) => {
  return async (dispatch: Dispatch<SubcategoryActionTypes>) => {
    dispatch({ type: UPDATE_SUBCATEGORY_REQUEST });

    try {
      const response = await fetch(`${API_URL}/subcategory/${subcategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subcategory),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const updatedSubcategory: Subcategory = await response.json();
      dispatch({ type: UPDATE_SUBCATEGORY_SUCCESS, payload: updatedSubcategory });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      dispatch({ type: UPDATE_SUBCATEGORY_FAILURE, payload: errorMessage });
    }
  };
};

// Delete Subcategory
export const deleteSubcategory = (id: number) => {
  return async (dispatch: Dispatch<SubcategoryActionTypes>) => {
    dispatch({ type: DELETE_SUBCATEGORY_REQUEST });

    try {
      const response = await fetch(`${API_URL}/subcategory/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Network response was not ok');
      dispatch({ type: DELETE_SUBCATEGORY_SUCCESS, payload: id });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      dispatch({ type: DELETE_SUBCATEGORY_FAILURE, payload: errorMessage });
    }
  };
};