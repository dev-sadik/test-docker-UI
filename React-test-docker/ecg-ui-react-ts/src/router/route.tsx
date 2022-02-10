import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoaderComponent from "../components/loader/loader";
import PrivateRoute from "./privateRoute";
const Login = React.lazy(() => import("../screens/authentication/login/login"));
const Signup = React.lazy(() =>
  import("../screens/authentication/signup/signup")
);
const ForgotPassword = React.lazy(()=> import("../screens/authentication/forgot-password/forgotPassword"));
const Dashboard = React.lazy(() => import("../screens/dashboard/userDashboard"));
const AdminDashboard = React.lazy(() =>
  import("../screens/admin-dashboard/admin-dashboard")
);
const Profile = React.lazy(() => import("../screens/profile/profile"));
export default class RouterComponent extends React.Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<LoaderComponent/>}>
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/forgot-password/:token?/:authToken?" component={ForgotPassword} /> 
            <PrivateRoute path="/" component={Dashboard} exact />
            <PrivateRoute
              path="/admin-dashboard"
              component={AdminDashboard}
              exact
            />
            <PrivateRoute path="/profile" component={Profile} exact /> 
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
