import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';

import authReducer from "@/redux/reducer/auth.reducer";
import { apiSlice } from "@/api/apiSlice";


const persistConfig = {
    key: 'root',
    storage: storageSession,  // muốn lưu vào local storage thì thay storageSession thành storage
    whitelist: ['auth'] // muốn chỉ lưu thg nào thì bỏ vào whitelist
};

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
}); 

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export const persistor = persistStore(store)