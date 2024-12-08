import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';

import authReducer from "@/redux/reducer/auth.reducer";
import discoverReducer from "@/redux/reducer/discover.reducer";
import siteDetailReducer from "@/redux/reducer/site-detail.reducer";
import newSiteReducer from "@/redux/reducer/new-site.reducer";
import teamJourneyReducer from "@/redux/reducer/team-journey.reducer";
import { apiSlice } from "@/api/apiSlice";


const persistConfig = {
    key: 'root',
    storage: storageSession,  // muốn lưu vào local storage thì thay storageSession thành storage
    whitelist: ['auth', 'siteDetail', 'teamJourney'] // muốn chỉ lưu thg nào thì bỏ vào whitelist
};

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    discover: discoverReducer,
    siteDetail: siteDetailReducer,
    newSite: newSiteReducer,
    teamJourney: teamJourneyReducer,
}); 

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export const persistor = persistStore(store)