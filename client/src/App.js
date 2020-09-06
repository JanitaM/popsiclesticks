import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import Navbar from './components/layout/Navbar';
import './App.css';
import { navigate } from '@reach/router';

const App = () => {
  const [signedInUser, setSignedInUser] = useState(undefined);

  const [signInForm, setSignInForm] = useState({
    username: '',
    password: ''
  });

  async function signIn(e) {
    e.preventDefault();

    try {
      console.log(signInForm);
      const user = await Auth.signIn(signInForm.username, signInForm.password);

      console.log(user);

      setSignedInUser(user);
      navigate('/home');
      // console.log(await Auth.currentAuthenticatedUser());
    } catch (error) {
      console.log(error);
    }
  }

  function signOut() {
    try {
      Auth.signOut({ global: true }).then(() => setSignedInUser(undefined));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      const user = await Auth.currentAuthenticatedUser();
      setSignedInUser(user);
      console.log(signedInUser);
    })();
  }, []);

  if (!signedInUser) {
    return (
      <>
        <Navbar signedInUser={signedInUser} />
        <PublicRoutes
          signIn={signIn}
          setSignInForm={setSignInForm}
          signInForm={signInForm}
        />
      </>
    );
  }

  return (
    <>
      <Navbar signedInUser={signedInUser} />
      <PrivateRoutes signOut={signOut} />
    </>
  );

  // return (
  //   <Router>
  //     <>
  //       <Navbar />
  //       <Switch>
  //         <Route exact path='/' component={Landing} />
  //         <Route exact path='/register' component={Register} />
  //         <Route
  //           // component={SignInPage}
  //           exact
  //           path='/signin'
  //           render={(props) => (
  //             <SignInPage
  //               {...props}
  //               signInForm={signInForm}
  //               setSignInForm={setSignInForm}
  //               signIn={signIn}
  //             />
  //           )}
  //         />

  //         {/* <Route exact path='/home'>
  //           {signedInUser ? <Redirect to='/home' /> : <SignInPage />}
  //         </Route> */}
  //         <Route
  //           exact
  //           path='/home'
  //           // component={Home}
  //           render={(props) => (
  //             <Home
  //               {...props}
  //               signedInUser={signedInUser}
  //               setSignedInUser={setSignedInUser}
  //             />
  //           )}
  //         />

  //         <Route
  //           exact
  //           path='/dashboard'
  //           // component={Dashboard}
  //           render={(props) => (
  //             <Dashboard {...props} signedInUser={signedInUser} />
  //           )}
  //         />

  //         <Route
  //           exact
  //           path='/account'
  //           // component={AccountSettings}
  //           render={(props) => (
  //             <AccountSettings {...props} signedInUser={signedInUser} />
  //           )}
  //         />

  //         <Route component={NotFound} />
  //       </Switch>
  //     </>
  //   </Router>
  // );
};

export default App;
