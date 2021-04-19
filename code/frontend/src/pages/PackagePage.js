import React from "react";
import {Layout, Table, Space} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {usePackages} from "../hooks/PackageHooks";
import PackageSideMenu from "../components/PackageSideMenu/PackageSideMenu";
import PageFooter from "../components/PageFooter/PageFooter";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from "../components/BigCalendar/BigCalendar";

const {Column} = Table;
const {Content, Sider} = Layout;

const PackagePage = () => {
    const {path} = useRouteMatch();

    const [packages] = usePackages();

    return (
        <Layout style={{height: "100vh"}}>
            <NavigationBar defaultSelected="/package"/>
            <Layout style={{height: "100%"}}>
                <Sider style={{width: 512}}>
                    <PackageSideMenu/>
                </Sider>
                <Content>
                    <Switch>
                        <Route exact path={`${path}`}>
                            <Table dataSource={packages} rowKey="id">
                                <Column title="Name" dataIndex="name" key="name"/>
                                <Column title="What Is Included" dataIndex="what_is_included" key="what_is_included"/>
                                <Column title="Available" dataIndex="available" key="available"/>
                                <Column title="Edit"
                                        key="action"
                                        render={() => {
                                            return <Space size="middle">
                                                <a>Edit</a>
                                            </Space>
                                        }}/>
                                <Column title="Delete"
                                        key="action"
                                        render={() => (
                                            <Space size="middle">
                                                <a>Delete</a>
                                            </Space>
                                        )}/>
                            </Table>
                        </Route>
                        <Route exact path={`${path}/calendar`}>
                            <BigCalendar/>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
            <PageFooter/>
        </Layout>
    );
}

export default PackagePage;
