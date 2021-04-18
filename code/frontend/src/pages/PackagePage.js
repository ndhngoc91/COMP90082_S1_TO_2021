import React from "react";
import {Layout, Table, Space} from "antd";

const {Column} = Table;
import NavigationBar from "../components/NavigationBar";
import {usePackages} from "../hooks/PackageHooks";

const {Content, Footer} = Layout;

const PackagePage = () => {
    const [packages] = usePackages();

    return (
        <Layout style={{minHeight: "100vh"}}>
            <NavigationBar defaultSelected="/package"/>
            <Content style={{padding: "90px 16px"}}>
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
            </Content>
            <Footer style={{textAlign: "center"}}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
        </Layout>
    );
}

export default PackagePage;
