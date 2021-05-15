import React from "react";
import {Route, Redirect} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";

const AuthRoute = observer(({path, exact = false, Component, requiredRoles = []}) => {
    const {authStore: {userRole}} = useStores();

    const useHasRequiredRole = requiredRoles.includes(userRole);

    return (
        <Route path={path} exact={exact} render={props => {
            if (useHasRequiredRole) {
                return <Component {...props}/>;
            } else {
                if (userRole === USER_ROLE.GUEST) {
                    return <Redirect to={{
                        pathname: "/login"
                    }}/>;
                } else {
                    return <Redirect to={{
                        pathname: "/"
                    }}/>;
                }
            }
        }}/>
    );
});

export default AuthRoute;
