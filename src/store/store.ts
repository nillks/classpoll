import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import groupReducer from './group/groupSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    group: groupReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
