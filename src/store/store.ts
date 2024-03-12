import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {reducer} from './matchSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
};
const rootReducer = combineReducers({
  reducer,
});

const defaultMiddlewareConfig = {
  serializableCheck: false,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware(defaultMiddlewareConfig),
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
