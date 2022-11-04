import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from "../slices/authSlice";
import settingReducer from '../slices/settingSlice'
import userReducer from '../slices/userSlice'
import breadcrumbReducer from 'slices/breadcrumbSlice'
import answerSheetReducer from 'slices/answerSheetSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import storageSession  from 'redux-persist/lib/storage/session'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['user'],
  //stateReconciler: autoMergeLevel2
}

const userPersistConfig = {
  key: 'user',
  version: 1,
  storage: storageSession,
}

const rootReducer = combineReducers({
   auth: authReducer,
   setting:settingReducer,
   breadcrumb:breadcrumbReducer,
   answerSheet:answerSheetReducer,
   user:userReducer,
   //user: persistReducer(userPersistConfig, userReducer),
   })
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
