import React from "react";
import 'antd/dist/antd.css'
import {Route,Redirect,Switch} from "react-router-dom";
import OrderList from "./OrderList";



class Order extends React.Component{

    render() {
        return (
            <Switch>
                <Route exact path="/center/order" component={OrderList} />
                <Redirect to="/center/order" />
            </Switch>
        )//end return
    }
}

export default Order