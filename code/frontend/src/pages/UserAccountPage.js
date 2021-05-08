import {Layout} from 'antd';
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import UserProfileSideMenu from "../components/UserProfileSideMenu";
import Navigator from "../components/NavigationBar/NavigationBar";
import Order from "../components/Order/Order";
import Friend from "../components/Friend/Friend";
import PageFooter from "../components/PageFooter/PageFooter";
import UserProfileForm from "../components/UserProfileForm/UserProfileForm";


const {Header, Sider, Content} = Layout;

const UserAccountPage = () => {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Header>
                <Navigator defaultSelected='/center'/>
            </Header>
            <BrowserRouter>
                <Layout>
                    <Sider style={{backgroundColor: '#FFFFFF'}}>
                        <UserProfileSideMenu/>
                    </Sider>
                    <Content style={{padding: "1em", backgroundColor: '#FFFFFF'}}>
                        <Switch>
                            <Route path='/center/order' component={Order}/>
                            <Route path='/center/friend' component={Friend}/>
                            <Route path='/center/profile' component={UserProfileForm}/>
                        </Switch>
                    </Content>
                </Layout>
            </BrowserRouter>
            <PageFooter/>
        </Layout>
    );
}

export default UserAccountPage
