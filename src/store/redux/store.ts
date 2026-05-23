import { configureStore } from '@reduxjs/toolkit';
import internshipsReducer from '@/features/internships/slice';

export const store = configureStore({
  reducer: {
    internships: internshipsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
