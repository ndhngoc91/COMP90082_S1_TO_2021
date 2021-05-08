import {Layout} from 'antd';
import React from "react";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import LeftMenu from "../components/LeftMenu";
import Navigator from "../components/NavigationBar/NavigationBar";
import Order from "../components/Order/Order";
import Friend from "../components/Friend/Friend";
import Information from "../components/Information/Information";
import PageFooter from "../components/PageFooter/PageFooter";


const {Header, Footer, Sider, Content} = Layout;

class UserAccountPage extends React.Component {

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Header>
                    <Navigator defaultSelected='/center'/>
                </Header>
                <BrowserRouter>
                    <Layout>
                        <Sider style={{backgroundColor: '#FFFFFF'}}>
                            <LeftMenu/>
                        </Sider>
                        <Content style={{backgroundColor: '#FFFFFF'}}>
                            <Switch>
                                <Route path='/center/order' component={Order}/>
                                <Route path='/center/friend' component={Friend}/>
                                <Route path='/center/profile' component={Information}/>
                            </Switch>
                        </Content>
                    </Layout>
                </BrowserRouter>
                <PageFooter/>
            </Layout>
        )//end return
    }
}

export default UserAccountPage
