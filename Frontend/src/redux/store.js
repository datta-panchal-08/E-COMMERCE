import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import userSlice from './userSlice';

const persistConfig = {
    key:"root",
    storage,
    whitelist:["user"]
}

const persistedReducer = persistReducer(persistConfig,userSlice);

export const store = configureStore({
    reducer: {
       user:persistedReducer
    }, middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);