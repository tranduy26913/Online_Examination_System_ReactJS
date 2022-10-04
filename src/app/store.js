import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from "../slices/authSlice";
import themeReducer from '../slices/themeSlice'
import questionReducer from '../slices/questionSlice'
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
  blacklist: ['question'],
  stateReconciler: autoMergeLevel2
}

const questionPersistConfig = {
  key: 'question',
  version: 1,
  storage: storageSession,
}

const rootReducer = combineReducers({
   auth: authReducer,
   theme:themeReducer,
   breadcrumb:breadcrumbReducer,
   answerSheet:answerSheetReducer,
   question: persistReducer(questionPersistConfig, questionReducer),
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
