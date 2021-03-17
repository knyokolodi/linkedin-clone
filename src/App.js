import React, { useEffect } from 'react';
import { login, logout, selectUser } from './features/userSlice';
import './App.css';
import Feed from './Feed/Feed';
import { useSelector } from 'react-redux';
import Login from './Login/Login';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Register from './Register/Register';

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    LoginOrLogout();
  }, []);

  const LoginOrLogout = async () => {
    try {
      const userAuth = await auth.onAuthStateChanged();
      if (userAuth) {
        dispatch(
          login({
            fullName: userAuth.fullName,
            email: userAuth.email,
            uid: userAuth.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    } catch (error) {}
  };

  return (
    <div className='app'>
      <Router>
        <PrivateRoute exact path='/feed' component={Feed} />
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Register} />
      </Router>
    </div>
  );
};

export default App;
