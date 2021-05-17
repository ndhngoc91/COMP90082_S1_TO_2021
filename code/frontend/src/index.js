import React from "react";
import ReactDOM from "react-dom";
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CalendarPage from "./pages/CalendarPage";
import BookingManagementPage from "./pages/BookingManagementPage";
import PackageManagementPage from "./pages/PackageManagementPage";
import UserAccountPage from "./pages/UserAccountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import UserManagementPage from "./pages/UserManagementPage";
import PackagePage from "./pages/PackagePage/PackagePage";
import PackageDetailsPage from "./pages/PackageDetailsPage";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";

// CSS
import "antd/dist/antd.css";
import "./index.css";
import {createStore, StoreContext} from "./stores";
import AuthRoute from "./navigation/AuthRole";
import {USER_ROLE} from "./consts/UserRole";

createStore().then(store => {
    ReactDOM.render(
        <StoreContext.Provider value={store}>
            <div className="App" style={{height: "100%", width: "100%"}}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <AuthRoute path="/login" exact Component={LoginPage} requiredRoles={[
                            USER_ROLE.GUEST
                        ]}/>
                        <AuthRoute path="/register" exact Component={RegisterPage} requiredRoles={[
                            USER_ROLE.STAFF,
                            USER_ROLE.CUSTOMER,
                            USER_ROLE.GUEST
                        ]}/>
                        <AuthRoute path="/register-as-a-admin" exact Component={AdminRegisterPage} requiredRoles={[
                            USER_ROLE.GUEST
                        ]}/>
                        <AuthRoute path="/profile" Component={UserAccountPage} requiredRoles={[
                            USER_ROLE.CUSTOMER
                        ]}/>
                        <AuthRoute path="/packages" Component={PackagePage} requiredRoles={[
                            USER_ROLE.CUSTOMER,
                            USER_ROLE.GUEST
                        ]}/>
                        <AuthRoute path="/package-details/:packageId" Component={PackageDetailsPage} requiredRoles={[
                            USER_ROLE.CUSTOMER,
                            USER_ROLE.GUEST
                        ]}/>
                        <AuthRoute path="/shopping-cart" Component={ShoppingCartPage} requiredRoles={[
                            USER_ROLE.CUSTOMER,
                            USER_ROLE.GUEST
                        ]}/>
                        <AuthRoute path="/user-management" exact Component={UserManagementPage} requiredRoles={[
                            USER_ROLE.STAFF
                        ]}/>
                        <AuthRoute path="/booking-management" exact Component={BookingManagementPage} requiredRoles={[
                            USER_ROLE.STAFF
                        ]}/>
                        <AuthRoute path="/calendar" exact Component={CalendarPage} requiredRoles={[
                            USER_ROLE.CUSTOMER,
                            USER_ROLE.STAFF
                        ]}/>
                        <AuthRoute path="/package-management" exact Component={PackageManagementPage} requiredRoles={[
                            USER_ROLE.STAFF
                        ]}/>
                        <AuthRoute path="/order-history" exact Component={OrderHistoryPage} requiredRoles={[
                            USER_ROLE.CUSTOMER,
                            USER_ROLE.STAFF
                        ]}/>
                        <Route exact path="*" render={() => <Redirect to="/"/>}/>
                    </Switch>
                </BrowserRouter>
            </div>
        </StoreContext.Provider>,
        document.getElementById("root")
    );
});
