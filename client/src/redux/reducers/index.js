import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import snackbarReducer from './SnackbarReducer';

export default combineReducers({
  snackbar: snackbarReducer,
  user: userReducer
});
