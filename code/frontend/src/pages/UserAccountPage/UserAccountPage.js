import {Layout} from "antd";
import React from "react";
import {BrowserRouter, Route, Switch, useRouteMatch} from "react-router-dom";
import UserProfileSideMenu from "../../components/UserProfileForm/UserProfileSideMenu";
import NavigatorBar from "../../components/NavigationBar/NavigationBar";
import UserProfileForm from "../../components/UserProfileForm/UserProfileForm";
import UserGroupList from "../../components/UserGroupList/UserGroupList";
import AddressManagementTable from "../../components/UserProfileForm/AddressManagementTable";

const {Sider, Content} = Layout;

const UserAccountPage = () => {
    const {path} = useRouteMatch();

    return (
        <Layout style={{minHeight: "100vh"}}>
            <NavigatorBar/>
            <BrowserRouter>
                <Layout>
                    <Sider style={{backgroundColor: "#FFFFFF"}}>
                        <UserProfileSideMenu/>
                    </Sider>
                    <Content style={{padding: "1em", backgroundColor: "#FFFFFF"}}>
                        <Switch>
                            <Route path={`${path}`} exact component={UserProfileForm}/>
                            <Route path={`${path}/user-groups`} component={UserGroupList}/>
                            <Route path={`${path}/address`} component={AddressManagementTable}/>
                        </Switch>
                    </Content>
                </Layout>
            </BrowserRouter>
        </Layout>
    );
};

export default UserAccountPage
