import { configureStore } from '@reduxjs/toolkit';
import workerReducer from './workerSlice';

export const store = configureStore({
  reducer: {
    workers: workerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
