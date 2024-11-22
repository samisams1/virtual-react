import { Dispatch } from 'redux';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  Category,
  CategoryActionTypes,
} from '../types';
import { API_URL } from '@/services/api';

// Fetch Categories
export const fetchCategories = () => {
  return async (dispatch: Dispatch<CategoryActionTypes>) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });

    try {
      const response = await fetch(`${API_URL}category`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data: Category[] = await response.json();
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
    } catch (error) {
      // Type assertion here
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: errorMessage });
    }
  };
};

// Create Category
export const createCategory = (category: Omit<Category, 'id'>) => {
  return async (dispatch: Dispatch<CategoryActionTypes>) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    try {
      const response = await fetch(`${API_URL}category/createCategory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const newCategory: Category = await response.json();
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: newCategory });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: errorMessage });
    }
  };
};
// Update Category
export const updateCategory = (category: Category) => {
  return async (dispatch: Dispatch<CategoryActionTypes>) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });

    try {
      const response = await fetch(`${API_URL}/category/${category.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const updatedCategory: Category = await response.json();
      dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: updatedCategory });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      dispatch({ type: UPDATE_CATEGORY_FAILURE, payload: errorMessage });
    }
  };
};

// Delete Category
export const deleteCategory = (id: number) => {
  return async (dispatch: Dispatch<CategoryActionTypes>) => {
    dispatch({ type: DELETE_CATEGORY_REQUEST });

    try {
      const response = await fetch(`${API_URL}/category/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Network response was not ok');
      dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: id });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      dispatch({ type: DELETE_CATEGORY_FAILURE, payload: errorMessage });
    }
  };
  
};
