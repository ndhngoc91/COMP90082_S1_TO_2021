import {Layout} from "antd";
import React from "react";
import {BrowserRouter, Route, Switch, useRouteMatch} from "react-router-dom";
import UserManageSideMenu from "../components/UserManageSideMenu";
import NavigatorBar from "../components/NavigationBar/NavigationBar";
import AdminProfileForm from "../components/AdminProfileForm/AdminProfileForm";
import AdminCreateForm from "../components/AccountCreateForm/AdminCreateForm";


const {Sider, Content} = Layout;

const UserManagePage = () => {
    const {path} = useRouteMatch();

    return (
        <Layout style={{minHeight: "100vh"}}>
            <NavigatorBar/>
            <BrowserRouter>
                <Layout>
                    <Sider style={{backgroundColor: "#FFFFFF"}}>
                        <UserManageSideMenu/>
                    </Sider>
                    <Content style={{padding: "1em", backgroundColor: "#FFFFFF"}}>
                        <Switch>
                            <Route path={`${path}`} exact component={AdminProfileForm}/>
                            <Route path={`${path}/admin-create`} component={AdminCreateForm}/>
                        </Switch>
                    </Content>
                </Layout>
            </BrowserRouter>
        </Layout>
    );
};

export default UserManagePage
