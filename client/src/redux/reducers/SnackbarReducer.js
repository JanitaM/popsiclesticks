import { SET_SNACKBAR } from '../actions/types';

const initialState = {
  snackbarOpen: false,
  snackbarType: 'success',
  snackbarMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      const { snackbarOpen, snackbarMessage, snackbarType } = action;
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarMessage
      };
    default:
      return state;
  }
};
