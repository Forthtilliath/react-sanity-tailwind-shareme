import { combineReducers, configureStore } from '@reduxjs/toolkit';

import pinsSlice from './pinsSlice';

const rootReducer = combineReducers({
  pins: pinsSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
