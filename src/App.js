import React from "react";
import { Route, Switch } from "react-router-dom";

import { Admin, Home, Login, PrivateRoute, PublicRoute, Register, NotFound, Meal } from "./components";

export default function App() {
  return (
    <Switch>
      <PublicRoute restricted component={Register} path="/register" exact />
      <PublicRoute restricted component={Login} path="/login" exact />
      <PrivateRoute isAdmin component={Admin} path="/admin" exact />
      <PrivateRoute isAdmin component={Meal} path="/meals" exact />

      <PrivateRoute component={Home} path="/" exact />
      <Route component={NotFound} />
    </Switch>
  );
}
