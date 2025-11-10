import { configureStore } from '@reduxjs/toolkit';

// Placeholder store - add slices as needed
export const store = configureStore({
  reducer: {
    // Add reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
