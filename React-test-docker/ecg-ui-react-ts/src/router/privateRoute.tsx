import React from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { userService } from "../services/userService";


const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  if (!Component) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps<{}>) =>
        userService.isLogin() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
