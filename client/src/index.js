import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App dispatch={store.dispatch} />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
