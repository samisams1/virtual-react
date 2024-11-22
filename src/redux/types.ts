// Action Types
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE';

export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';

export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';

// Category Interface
export interface Category {
  id: number;
  name: string;
  subcategories: SubcategoryCategory[];
}
export interface SubcategoryCategory {
  id: number;
  name: string;
}

// Action Interfaces
interface FetchCategoriesRequestAction {
  type: typeof FETCH_CATEGORIES_REQUEST;
}

interface FetchCategoriesSuccessAction {
  type: typeof FETCH_CATEGORIES_SUCCESS;
  payload: Category[];
}

interface FetchCategoriesFailureAction {
  type: typeof FETCH_CATEGORIES_FAILURE;
  payload: string;
}

interface CreateCategoryRequestAction {
  type: typeof CREATE_CATEGORY_REQUEST;
}

interface CreateCategorySuccessAction {
  type: typeof CREATE_CATEGORY_SUCCESS;
  payload: Category;
}

interface CreateCategoryFailureAction {
  type: typeof CREATE_CATEGORY_FAILURE;
  payload: string;
}

interface UpdateCategoryRequestAction {
  type: typeof UPDATE_CATEGORY_REQUEST;
}

interface UpdateCategorySuccessAction {
  type: typeof UPDATE_CATEGORY_SUCCESS;
  payload: Category;
}

interface UpdateCategoryFailureAction {
  type: typeof UPDATE_CATEGORY_FAILURE;
  payload: string;
}

interface DeleteCategoryRequestAction {
  type: typeof DELETE_CATEGORY_REQUEST;
}

interface DeleteCategorySuccessAction {
  type: typeof DELETE_CATEGORY_SUCCESS;
  payload: number; // ID of the deleted category
}

interface DeleteCategoryFailureAction {
  type: typeof DELETE_CATEGORY_FAILURE;
  payload: string;
}

// Combine Action Types
export type CategoryActionTypes =
  | FetchCategoriesRequestAction
  | FetchCategoriesSuccessAction
  | FetchCategoriesFailureAction
  | CreateCategoryRequestAction
  | CreateCategorySuccessAction
  | CreateCategoryFailureAction
  | UpdateCategoryRequestAction
  | UpdateCategorySuccessAction
  | UpdateCategoryFailureAction
  | DeleteCategoryRequestAction
  | DeleteCategorySuccessAction
  | DeleteCategoryFailureAction;

// Subcategory Type
export interface Subcategory {
  id: number;
  name: string;
  categoryId: number; // Assuming subcategories are linked to categories
}

// Action Types
export const FETCH_SUBCATEGORIES_REQUEST = 'FETCH_SUBCATEGORIES_REQUEST';
export const FETCH_SUBCATEGORIES_SUCCESS = 'FETCH_SUBCATEGORIES_SUCCESS';
export const FETCH_SUBCATEGORIES_FAILURE = 'FETCH_SUBCATEGORIES_FAILURE';

export const CREATE_SUBCATEGORY_REQUEST = 'CREATE_SUBCATEGORY_REQUEST';
export const CREATE_SUBCATEGORY_SUCCESS = 'CREATE_SUBCATEGORY_SUCCESS';
export const CREATE_SUBCATEGORY_FAILURE = 'CREATE_SUBCATEGORY_FAILURE';

export const UPDATE_SUBCATEGORY_REQUEST = 'UPDATE_SUBCATEGORY_REQUEST';
export const UPDATE_SUBCATEGORY_SUCCESS = 'UPDATE_SUBCATEGORY_SUCCESS';
export const UPDATE_SUBCATEGORY_FAILURE = 'UPDATE_SUBCATEGORY_FAILURE';

export const DELETE_SUBCATEGORY_REQUEST = 'DELETE_SUBCATEGORY_REQUEST';
export const DELETE_SUBCATEGORY_SUCCESS = 'DELETE_SUBCATEGORY_SUCCESS';
export const DELETE_SUBCATEGORY_FAILURE = 'DELETE_SUBCATEGORY_FAILURE';

// Action Interfaces
interface FetchSubcategoriesRequest {
  type: typeof FETCH_SUBCATEGORIES_REQUEST;
}

interface FetchSubcategoriesSuccess {
  type: typeof FETCH_SUBCATEGORIES_SUCCESS;
  payload: Subcategory[];
}

interface FetchSubcategoriesFailure {
  type: typeof FETCH_SUBCATEGORIES_FAILURE;
  payload: string;
}

interface CreateSubcategoryRequest {
  type: typeof CREATE_SUBCATEGORY_REQUEST;
}

interface CreateSubcategorySuccess {
  type: typeof CREATE_SUBCATEGORY_SUCCESS;
  payload: Subcategory;
}

interface CreateSubcategoryFailure {
  type: typeof CREATE_SUBCATEGORY_FAILURE;
  payload: string;
}

interface UpdateSubcategoryRequest {
  type: typeof UPDATE_SUBCATEGORY_REQUEST;
}

interface UpdateSubcategorySuccess {
  type: typeof UPDATE_SUBCATEGORY_SUCCESS;
  payload: Subcategory;
}

interface UpdateSubcategoryFailure {
  type: typeof UPDATE_SUBCATEGORY_FAILURE;
  payload: string;
}

interface DeleteSubcategoryRequest {
  type: typeof DELETE_SUBCATEGORY_REQUEST;
}

interface DeleteSubcategorySuccess {
  type: typeof DELETE_SUBCATEGORY_SUCCESS;
  payload: number; // id of the deleted subcategory
}

interface DeleteSubcategoryFailure {
  type: typeof DELETE_SUBCATEGORY_FAILURE;
  payload: string;
}

// Combine Action Types
export type SubcategoryActionTypes =
  | FetchSubcategoriesRequest
  | FetchSubcategoriesSuccess
  | FetchSubcategoriesFailure
  | CreateSubcategoryRequest
  | CreateSubcategorySuccess
  | CreateSubcategoryFailure
  | UpdateSubcategoryRequest
  | UpdateSubcategorySuccess
  | UpdateSubcategoryFailure
  | DeleteSubcategoryRequest
  | DeleteSubcategorySuccess
  | DeleteSubcategoryFailure;

// Define the Item interface with the specified fields
export interface Item {
  id: number;
  name: string;
  type: string;
  language: string;
  region: string;
  price: number;
  description: string;
  imageurl: string;
  zipFile:string;
  subcategoryId: number;
  make:string;
  disks:string;
  availability:string;
  os:string;
  
}

// Define action types
export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';

export const CREATE_ITEM_REQUEST = 'CREATE_ITEM_REQUEST';
export const CREATE_ITEM_SUCCESS = 'CREATE_ITEM_SUCCESS';
export const CREATE_ITEM_FAILURE = 'CREATE_ITEM_FAILURE';

export const UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const UPDATE_ITEM_FAILURE = 'UPDATE_ITEM_FAILURE';

export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';


// Action Types for Products
export const FETCH_ITEM_BY_SUBCATEGORY_REQUEST = 'FETCH_PRODUCTS_BY_SUBCATEGORY_REQUEST';
export const FETCH_ITEM_BY_SUBCATEGORY_SUCCESS = 'FETCH_PRODUCTS_BY_SUBCATEGORY_SUCCESS';
export const FETCH_ITEM_BY_SUBCATEGORY_FAILURE = 'FETCH_PRODUCTS_BY_SUBCATEGORY_FAILURE';

export const FETCH_ITEM_BY_ID_REQUEST = 'FETCH_PRODUCTS_BY_ID_REQUEST';
export const FETCH_ITEM_BY_ID_SUCCESS = 'FETCH_PRODUCTS_BY_ID_SUCCESS';
export const FETCH_ITEM_BY_ID_FAILURE = 'FETCH_PRODUCTS_BY_ID_FAILURE';


// Define action types for items
interface FetchItemsRequestAction {
  type: typeof FETCH_ITEMS_REQUEST;
}

interface FetchItemsSuccessAction {
  type: typeof FETCH_ITEMS_SUCCESS;
  payload: Item[];
}

interface FetchItemsFailureAction {
  type: typeof FETCH_ITEMS_FAILURE;
  payload: string; // Error message
}

interface CreateItemRequestAction {
  type: typeof CREATE_ITEM_REQUEST;
}

interface CreateItemSuccessAction {
  type: typeof CREATE_ITEM_SUCCESS;
  payload: Item;
}

interface CreateItemFailureAction {
  type: typeof CREATE_ITEM_FAILURE;
  payload: string; // Error message
}

interface UpdateItemRequestAction {
  type: typeof UPDATE_ITEM_REQUEST;
}

interface UpdateItemSuccessAction {
  type: typeof UPDATE_ITEM_SUCCESS;
  payload: Item;
}

interface UpdateItemFailureAction {
  type: typeof UPDATE_ITEM_FAILURE;
  payload: string; // Error message
}

interface DeleteItemRequestAction {
  type: typeof DELETE_ITEM_REQUEST;
}

interface DeleteItemSuccessAction {
  type: typeof DELETE_ITEM_SUCCESS;
  payload: number; // ID of the deleted item
}

interface DeleteItemFailureAction {
  type: typeof DELETE_ITEM_FAILURE;
  payload: string; // Error message
}

// Action Interfaces for Fetching by Subcategory
interface FetchItemBySubcategoryRequestAction {
  type: typeof FETCH_ITEM_BY_SUBCATEGORY_REQUEST;
}

interface FetchItemBySubcategorySuccessAction {
  type: typeof FETCH_ITEM_BY_SUBCATEGORY_SUCCESS;
  payload: Item[];
}

interface FetchItemBySubcategoryFailureAction {
  type: typeof FETCH_ITEM_BY_SUBCATEGORY_FAILURE;
  payload: string;
}

// Action Interfaces for Fetching by Subcategory
interface FetchItemByIdRequestAction {
  type: typeof FETCH_ITEM_BY_ID_REQUEST;
}

interface FetchItemByIdSuccessAction {
  type: typeof FETCH_ITEM_BY_ID_SUCCESS;
  payload: Item;
}

interface FetchItemByIdFailureAction {
  type: typeof FETCH_ITEM_BY_ID_FAILURE;
  payload: string;
}


// Combine all action types
export type ItemActionTypes =
  | FetchItemsRequestAction
  | FetchItemsSuccessAction
  | FetchItemsFailureAction
  | CreateItemRequestAction
  | CreateItemSuccessAction
  | CreateItemFailureAction
  | UpdateItemRequestAction
  | UpdateItemSuccessAction
  | UpdateItemFailureAction
  | DeleteItemRequestAction
  | DeleteItemSuccessAction
  | DeleteItemFailureAction
  | FetchItemBySubcategoryRequestAction
  | FetchItemBySubcategorySuccessAction
  | FetchItemBySubcategoryFailureAction
  | FetchItemByIdRequestAction
  | FetchItemByIdSuccessAction
  | FetchItemByIdFailureAction;

// types.ts

export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: CartItem;
    [key: string]: any; // Index signature added
}

export interface UpdateQuantityAction {
    type: typeof UPDATE_QUANTITY;
    payload: { id: number; quantity: number };
    [key: string]: any; // Index signature added
}

export interface RemoveFromCartAction {
    type: typeof REMOVE_FROM_CART;
    payload: number; // ID of the item to remove
    [key: string]: any; // Index signature added
}

export interface ClearCartAction {
    type: typeof CLEAR_CART;
    [key: string]: any; // Index signature added
}

// Union of all action types
export type CartActionTypes = 
    | AddToCartAction
    | UpdateQuantityAction
    | RemoveFromCartAction
    | ClearCartAction;

// Define the CartState
export interface CartState {
    items: CartItem[];
}