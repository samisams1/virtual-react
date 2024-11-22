// subCategoryReducer.ts

import {
    Subcategory,
    SubcategoryActionTypes,
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
  } from '../types';
  
  interface SubcategoryState {
    loading: boolean;
    subcategories: Subcategory[];
    error: string | null;
  }
  
  const initialState: SubcategoryState = {
    loading: false,
    subcategories: [],
    error: null,
  };
  
  const subcategoryReducer = (
    state = initialState,
    action: SubcategoryActionTypes
  ): SubcategoryState => {
    switch (action.type) {
      case FETCH_SUBCATEGORIES_REQUEST:
        return { ...state, loading: true, error: null };
  
      case FETCH_SUBCATEGORIES_SUCCESS:
        return { ...state, loading: false, subcategories: action.payload };
  
      case FETCH_SUBCATEGORIES_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case CREATE_SUBCATEGORY_REQUEST:
        return { ...state, loading: true, error: null };
  
      case CREATE_SUBCATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          subcategories: [...state.subcategories, action.payload],
        };
  
      case CREATE_SUBCATEGORY_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case UPDATE_SUBCATEGORY_REQUEST:
        return { ...state, loading: true, error: null };
  
      case UPDATE_SUBCATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          subcategories: state.subcategories.map((subcategory) =>
            subcategory.id === action.payload.id ? action.payload : subcategory
          ),
        };
  
      case UPDATE_SUBCATEGORY_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case DELETE_SUBCATEGORY_REQUEST:
        return { ...state, loading: true, error: null };
  
      case DELETE_SUBCATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          subcategories: state.subcategories.filter(
            (subcategory) => subcategory.id !== action.payload
          ),
        };
  
      case DELETE_SUBCATEGORY_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default subcategoryReducer;