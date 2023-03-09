import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { ROLES } from "../../constants";
import { useJwtData } from "../../hooks";
import { AppLayout } from "../appLayout";

export const PrivateRoute = ({ component: Component, isAdmin, ...rest }) => {
  const [isLoading, isAuthenticated] = useJwtData();

  const role = useSelector(state => state.user.role);
  if (isLoading) {
    return (
      <div>
        <p>Initialising ...</p>
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated && role ? (
          isAdmin ? (
            role === ROLES.ADMIN ? (
              <AppLayout>
                <Component {...props} />
              </AppLayout>
            ) : (
              <Redirect to={{ pathname: "/404", state: { from: props.location } }} />
            )
          ) : (
            <AppLayout>
              <Component {...props} />
            </AppLayout>
          )
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        );
      }}
    />
  );
};
