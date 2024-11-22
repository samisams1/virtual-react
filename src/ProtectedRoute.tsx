// components/ProtectedRoute.tsx

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/reducers/rootReducer';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const currentUser = useSelector((state: RootState) => state.currentUser); // Adjust according to your state shape

  return (
    <Route
      {...rest}
      element={
        currentUser ? (
          <Component />
        ) : (
          <Navigate to="/home" /> // Redirect to login if not authenticated
        )
      }
    />
  );
};

export default ProtectedRoute;