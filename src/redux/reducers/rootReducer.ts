// src/reducers/rootReducer.ts

/*import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import subcategoryReducer from './subCategoryReducer';
import itemReducer from './itemReducer';
import cartReducer from './cartReducer';
const rootReducer = combineReducers({
  category:categoryReducer,
  subCategory:subcategoryReducer,
  item:itemReducer,
  cart:cartReducer,
});

export default rootReducer;*/
// src/reducers/rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import categoryReducer from './categoryReducer';
import subCategoryReducer from './subCategoryReducer';
import itemReducer from './itemReducer';
import cartReducer from './cartReducer';
import ordersReducer from './orderReducer';
import usersReducer from './userReducer';
import { loginReducer } from './loginReducer';
import currentReducer from './currentUserReducer';

const rootReducer = combineReducers({
    category: categoryReducer,
    subCategory: subCategoryReducer,
    item: itemReducer,
    cart: cartReducer,
    order: ordersReducer,
    user:usersReducer,
    login:loginReducer,
    currentUser:currentReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;