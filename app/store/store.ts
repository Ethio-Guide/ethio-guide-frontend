import { configureStore } from '@reduxjs/toolkit';
import { orgsApi } from '../services/orgsApi';

export const store = configureStore({
  reducer: {
    [orgsApi.reducerPath]: orgsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(orgsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
