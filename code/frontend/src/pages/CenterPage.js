import { Layout } from 'antd';
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import LeftMenu from "../components/account/LeftMenu";
import Order from "../components/account/Order";
import Friend from "../components/account/Friend";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import Din from "../components/account/Din";
import Information from "../components/account/Information";
import Other from "../components/account/Other";


const { Header, Footer, Sider, Content } = Layout;

class CenterPage extends React.Component{

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header>
                    <NavigationBar defaultSelected='/center'/>
                </Header>
                <BrowserRouter>
                    <Layout>
                        <Sider style={{backgroundColor: '#FFFFFF' }}>
                            <LeftMenu/>
                        </Sider>
                        <Content style={{backgroundColor: '#FFFFFF' }}>
                            <Switch>
                                <Route path='/center/order'  component={Order}/>
                                <Route path='/center/friend'  component={Friend}/>
                                <Route path='/center/din'  component={Din}/>
                                <Route path='/center/information'  component={Information}/>
                                <Route path='/center/other'  component={Other}/>
                                <Redirect to='/center/order'/>
                            </Switch>
                        </Content>
                    </Layout>
                </BrowserRouter>

                <Footer style={{ textAlign: 'center' }}> SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
            </Layout>
        )//end return
    }
}

export default CenterPage