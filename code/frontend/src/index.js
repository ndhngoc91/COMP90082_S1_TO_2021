import React from "react";
import ReactDOM from "react-dom";
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import CustomersPage from "./pages/CustomersPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import HistoryPage from "./pages/HistoryPage";
import OrderPage from "./pages/OrderPage";
import CalendarPage from "./pages/CalendarPage";
import BookingManagementPage from "./pages/BookingManagementPage";
import PackageManagementPage from "./pages/PackageManagementPage";
import CheckOutPage from "./pages/CheckOutPage";
import UserAccountPage from "./pages/UserAccountPage";
import LoginPage from "./pages/LoginPage";
import UserCreatePage from "./pages/UserCreatePage";
import AdminCreatePage from "./pages/AdminCreatePage";

// CSS
import CategoryPage from "./pages/CategoryPage";
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
                        <Route path="/login" exact component={LoginPage}/>
                        <Route path="/history" exact component={HistoryPage} requiredRoles={[
                            USER_ROLE.CUSTOMER
                        ]}/>
                        <Route path="/order" exact component={OrderPage} requiredRoles={[
                            USER_ROLE.CUSTOMER
                        ]}/>
                        <AuthRoute path="/booking-management" exact Component={BookingManagementPage} requiredRoles={[
                            USER_ROLE.ADMIN
                        ]}/>
                        <AuthRoute path="/calendar" exact Component={CalendarPage} requiredRoles={[
                            USER_ROLE.CUSTOMER,
                            USER_ROLE.ADMIN
                        ]}/>
                        <AuthRoute path="/package-management" exact Component={PackageManagementPage} requiredRoles={[
                            USER_ROLE.ADMIN
                        ]}/>
                        <Route path="/productList" exact component={ProductListPage}/>
                        <Route path="/products/:productCode*" exact component={ProductDetailsPage}/>
                        <Route path="/orders/:orderId" exact component={OrderDetailsPage}/>
                        <Route path="/productCategories/:id" exact component={CategoryPage}/>
                        <Route path="/checkout" exact component={CheckOutPage}/>
                        <Route path="/customers" exact component={CustomersPage}/>
                        {/*new add*/}
                        <Route path="/profile" exact component={UserAccountPage}/>
                        <Route path="/user-create" exact component={UserCreatePage}/>
                        <Route path="/admin-create" exact component={AdminCreatePage}/>
                        <Route exact path="*" render={() => <Redirect to="/"/>}/>
                    </Switch>
                </BrowserRouter>
            </div>
        </StoreContext.Provider>,
        document.getElementById("root")
    );
});
