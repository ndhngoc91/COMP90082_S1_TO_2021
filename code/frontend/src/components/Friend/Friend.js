import React from "react";
import {Route,Redirect,Switch} from "react-router-dom";
import FriendList from "./FriendList";


class Friend extends React.Component{

    render() {
        return (
            <Switch>
                <Route exact path="/center/friend" component={FriendList} />
                <Redirect to="/center/friend" />
            </Switch>
        )//end return
    }
}

export default Friend