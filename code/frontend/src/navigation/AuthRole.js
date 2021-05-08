import React from "react";
import {Route, Redirect} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";

const AuthRoute = observer(({path, exact = false, Component, requiredRoles = [...Object.values(USER_ROLE)]}) => {
    const {authStore: {authenticated, userRole}} = useStores();

    const useHasRequiredRole = requiredRoles && requiredRoles.length > 0 ? requiredRoles.includes(userRole) : true;

    return (
        <Route path={path} exact={exact} render={props => {
            if (authenticated && useHasRequiredRole) {
                return <Component {...props}/>;
            } else {
                return <Redirect to={{
                    pathname: "/login"
                }}/>;
            }
        }}/>
    );
});

export default AuthRoute;
