import React from 'react';
import { Router } from '@reach/router';
import NotFound from '../components/pages/NotFound';
import Home from '../components/pages/Home';
import Dashboard from '../components/pages/Dashboard';
import AccountSettings from '../components/pages/AccountSettings';

const PrivateRoutes = ({ signOut }) => {
  console.log(signOut);

  return (
    <Router>
      <Home path='/home' />
      <Dashboard path='/dashboard' />
      <AccountSettings path='/account' />
      <NotFound default />
    </Router>
  );
};

export default PrivateRoutes;

// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect
// } from 'react-router-dom';
// import Navbar from '../components/layout/Navbar';
// import Home from '../components/pages/Home';
// import Dashboard from '../components/pages/Dashboard';
// import AccountSettings from '../components/pages/AccountSettings';
// import NotFound from '../components/pages/NotFound';

// const PrivateRoutes = ({ signedInUser }) => {
//   console.log(signedInUser);

//   return (
//     <>
//       <Switch>
//         <Route
//           exact
//           path='/home'
//           component={Home}
//           signedInUser={signedInUser}
//         />
//         <Route exact path='/dashboard' component={Dashboard} />
//         <Route exact path='/account' component={AccountSettings} />
//         <Route component={NotFound} />
//       </Switch>
//     </>
//   );
// };

// export default PrivateRoutes;

// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import Preloader from '../components/layout/Preloader';

// const PrivateRoute = ({ signedInUser, component: Component, ...rest }) => {
//   console.log(signedInUser);

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (!signedInUser) {
//           return (
//             <>
//               {/* <Preloader /> */}
//               <Redirect to='/signin' />
//             </>
//           );
//         } else if (signedInUser) {
//           return <Component {...props} />;
//         }
//       }}
//     />
//   );
// };

// export default PrivateRoute;
