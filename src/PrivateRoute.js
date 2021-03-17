import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectUser } from './features/userSlice';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const user = useSelector(selectUser);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!user ? <RouteComponent {...routeProps} /> : <Redirect to='login' />
      }
    />
  );
};

export default PrivateRoute;
