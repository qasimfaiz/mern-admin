import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/auth/authSlice';
import orderReducer from './features/orders/orderSlice';
import productReducer from './features/product/productSlice';
import userReducer from './features/user/userSlice';
import adminReducer from './features/admin/adminSlice';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth', 'other'], // Specify the reducers you want to persist
};

const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  product: productReducer,
  user: userReducer,
  admin: adminReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

// export const persistor = persistStore(store);

export default store;
