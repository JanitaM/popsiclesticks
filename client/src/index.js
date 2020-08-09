import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// import rootReducer from './reducers';
import { Provider } from 'react-redux';
// const store = createStore(rootReducer);
import store from './store';
import App from './App';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
