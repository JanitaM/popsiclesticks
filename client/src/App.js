import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import SignIn from './components/pages/SignIn';
import NotFound from './components/pages/NotFound';
import Navbar from './components/layout/Navbar';
import './App.css';
import Landing from './components/pages/Landing';
// import { withAuthenticator } from '@aws-amplify/ui-react';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/landing' component={Landing} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

// export default withAuthenticator(App);
export default App;
