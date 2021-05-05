import React from "react";
import 'antd/dist/antd.css'
import {Route,Redirect,Switch} from "react-router-dom";
import InformationDetail from "./InformationDetail";



class Information extends React.Component{

    render() {
        return (
            <Switch>
                <Route exact path="/center/profile" component={InformationDetail} />
                <Redirect to="/center/profile" />
            </Switch>
        )//end return
    }
}

export default Information