import {Layout} from "antd";
import React from "react";
import {BrowserRouter, Route, Switch, useRouteMatch} from "react-router-dom";
import UserProfileSideMenu from "../components/UserProfileSideMenu";
import NavigatorBar from "../components/NavigationBar/NavigationBar";
import PageFooter from "../components/PageFooter/PageFooter";
import UserProfileForm from "../components/UserProfileForm/UserProfileForm";
import UserGroupList from "../components/UserGroupList/UserGroupList";
import OrderList from "../components/OrderList/OrderList";


const {Header, Sider, Content} = Layout;

const UserAccountPage = () => {
    const {path} = useRouteMatch();

    return (
        <Layout style={{minHeight: "100vh"}}>
            <Header>
                <NavigatorBar/>
            </Header>
            <BrowserRouter>
                <Layout>
                    <Sider style={{backgroundColor: "#FFFFFF"}}>
                        <UserProfileSideMenu/>
                    </Sider>
                    <Content style={{padding: "1em", backgroundColor: "#FFFFFF"}}>
                        <Switch>
                            <Route path={`${path}`} exact component={UserProfileForm}/>
                            <Route path={`${path}/orders`} component={OrderList}/>
                            <Route path={`${path}/user-groups`} component={UserGroupList}/>
                        </Switch>
                    </Content>
                </Layout>
            </BrowserRouter>
        </Layout>
    );
}

export default UserAccountPage
