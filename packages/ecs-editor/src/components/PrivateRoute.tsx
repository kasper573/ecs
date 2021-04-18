import { Route, RouteProps } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { PropsWithChildren, useEffect } from "react";
import { RouteComponentProps } from "react-router";

/**
 * A wrapper for Route that redirects to login with not authenticated.
 * The element passed in as children is what should be rendered when signed in.
 */
export const PrivateRoute = ({ children, ...routeProps }: RouteProps) => {
  return (
    <Route
      {...routeProps}
      render={(props) => <Auth0Redirect {...props}>{children}</Auth0Redirect>}
    />
  );
};

const Auth0Redirect = ({
  location,
  children,
}: PropsWithChildren<RouteComponentProps>) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);
  if (isAuthenticated) {
    return <>{children}</>;
  }
  return null;
};
