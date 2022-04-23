import { configureStore } from '@reduxjs/toolkit';
import AlertReducer from './messages/AlertReducer';
import UserReducer from './user/UserReducer';
import LoadingReducer from './loading/LoadingReducer';

export default configureStore({
  reducer: {
    loading: LoadingReducer,
    user: UserReducer,
    alert: AlertReducer,
  },
});
