import {
  ItemActionTypes,
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
  Item,
  FETCH_ITEM_BY_SUBCATEGORY_REQUEST,
  FETCH_ITEM_BY_SUBCATEGORY_SUCCESS,
  FETCH_ITEM_BY_SUBCATEGORY_FAILURE,
  FETCH_ITEM_BY_ID_SUCCESS,
} from '../types';

interface ItemState {
  loading: boolean;
  items: Item[];
  error: string | null;
  currentItem: Item | null;  // Currently selected item, or null if not set

}

const initialState: ItemState = {
  loading: false,
  items: [],
  error: null,
  currentItem:  null, // Initialize currentItem to null
};



const itemReducer = (state = initialState, action: ItemActionTypes): ItemState => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
    case CREATE_ITEM_REQUEST:
    case UPDATE_ITEM_REQUEST:
    case DELETE_ITEM_REQUEST:
    case FETCH_ITEM_BY_SUBCATEGORY_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_ITEMS_SUCCESS:
      return { ...state, loading: false, items: action.payload };

    case CREATE_ITEM_SUCCESS:
      return { ...state, loading: false, items: [...state.items, action.payload] };

    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case FETCH_ITEM_BY_SUBCATEGORY_SUCCESS:
      return { ...state, loading: false, items: action.payload }; // Updated from loading: true
    case FETCH_ITEM_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          currentItem: action.payload, // Set currentItem to the fetched item
        };
  
    case FETCH_ITEMS_FAILURE:
    case CREATE_ITEM_FAILURE:
    case UPDATE_ITEM_FAILURE:
    case DELETE_ITEM_FAILURE:
    case FETCH_ITEM_BY_SUBCATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default itemReducer;

/*
import {
  ItemActionTypes,
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
  FETCH_ITEM_BY_ID_REQUEST,
  FETCH_ITEM_BY_ID_SUCCESS,
  FETCH_ITEM_BY_ID_FAILURE,
  Item,
} from '../types';

A

const itemReducer = (state = initialState, action: ItemActionTypes): ItemState => {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
    case CREATE_ITEM_REQUEST:
    case UPDATE_ITEM_REQUEST:
    case DELETE_ITEM_REQUEST:
    case FETCH_ITEM_BY_ID_REQUEST:
      return { ...state, loading: true, error: null }; // Set loading to true

    case FETCH_ITEMS_SUCCESS:
      return { ...state, loading: false, items: action.payload }; // Update items on success

    case CREATE_ITEM_SUCCESS:
      return { ...state, loading: false, items: [...state.items, action.payload] }; // Add new item

    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item // Update the specific item
        ),
      };

    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter(item => item.id !== action.payload), // Remove item
      };

    case FETCH_ITEM_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentItem: action.payload, // Set currentItem to the fetched item
      };

    case FETCH_ITEMS_FAILURE:
    case CREATE_ITEM_FAILURE:
    case UPDATE_ITEM_FAILURE:
    case DELETE_ITEM_FAILURE:
    case FETCH_ITEM_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload }; // Handle errors

    default:
      return state; // Return the current state if no action matches
  }
};

export default itemReducer;*/