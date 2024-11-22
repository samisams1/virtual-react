// src/store.ts

import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

// Use the correct type for the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer as any);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
export type AppDispatch = typeof store.dispatch;