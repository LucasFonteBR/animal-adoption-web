import { createAction, createReducer } from '@reduxjs/toolkit';
import { getUserAuth, setUserAuth } from '../../storage/AuthenticatorStorage';

const INITIAL_STATE = {
  currentUser: getUserAuth(),
};

export const loggedInUser = createAction('LOGGED_IN_USER');

export default createReducer(INITIAL_STATE, {
  [loggedInUser.type]: (state, action) => {
    const currentUser = action.payload;
    setUserAuth(JSON.stringify(currentUser));
    return { ...state, currentUser };
  },
});
