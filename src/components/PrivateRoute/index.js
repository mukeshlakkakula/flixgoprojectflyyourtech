import React from "react";
import { Route, Outlet, Navigate } from "react-router-dom";
import { account } from "../config/appwriteConfig";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Check if the user is authenticated
    account.get().then(
      (response) => {
        setIsAuthenticated(true);
        setLoading(false);
      },
      (error) => {
        setIsAuthenticated(false);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default PrivateRoute;
