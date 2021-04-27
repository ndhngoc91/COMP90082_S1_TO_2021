import React from "react";
import ReactDOM from "react-dom";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ProductListPage from "./pages/ProductListPage";
import ChooseCustomerPage from "./pages/ChooseCustomerPage";
import CustomersPage from "./pages/CustomersPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import HistoryPage from "./pages/HistoryPage";
import OrderPage from "./pages/OrderPage";
import PackagePage from "./pages/PackagePage";
import CheckOutPage from "./pages/CheckOutPage";
import HiringFormPage from './pages/HiringFormPage';
import HiringPaymentResultPage from './pages/HiringPaymentResultPage';

// CSS
import CategoryPage from "./pages/CategoryPage";
import "antd/dist/antd.css";
import "./index.css";
import {createStore, StoreContext} from "./stores";

createStore().then(store => {
    ReactDOM.render(
        <StoreContext.Provider value={store}>
            <BrowserRouter>
                <div className="App" style={{height: "100%", width: "100%"}}>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/history" exact component={HistoryPage}/>
                    <Route path="/order" exact component={OrderPage}/>
                    <Route path="/package" component={PackagePage}/>
                    <Route path="/create" exact component={CreatePage}/>
                    <Route path="/choose" exact component={ChooseCustomerPage}/>
                    <Route path="/productList" exact component={ProductListPage}/>
                    <Route path="/products/:productCode*" exact component={ProductDetailsPage}/>
                    <Route path="/orders/:orderId" exact component={OrderDetailsPage}/>
                    <Route path="/productCategories/:id" exact component={CategoryPage}/>
                    <Route path="/checkout" exact component={CheckOutPage}/>
                    <Route path="/hiringForm" exact component={HiringFormPage}/>
                    <Route path="/hiringPaymentResult" exact component={HiringPaymentResultPage}/>
                    <Route path="/customers" exact component={CustomersPage}/>
                </div>
            </BrowserRouter>
        </StoreContext.Provider>,
        document.getElementById("root")
    );
});
