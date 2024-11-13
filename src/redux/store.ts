import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './features/sidebar/sidebarConfigSlice';
import modalReducer from './features/sidebar/modalConfig';
import updateConfigSlice from './features/sidebar/updateFlag';
import api from './api/apiSlice';
// import registrationConfigSlice from './features/auth/registrationConfigSlice';
import authconfigSlice from './features/auth/authconfig.slice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    sidebar: sidebarReducer,
    modal: modalReducer,
    auth: authconfigSlice,
    updateConfig: updateConfigSlice,
    // user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
