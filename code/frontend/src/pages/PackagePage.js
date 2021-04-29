import React, {useEffect, useState} from "react";
import {Layout, Table, Space, Input, Select, Row, Col, Button, Modal} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {useHandleFilterPackages} from "../hooks/PackageHooks";
import PackageSideMenu from "../components/PackageSideMenu/PackageSideMenu";
import PageFooter from "../components/PageFooter/PageFooter";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import CreatePackageForm from "../components/PackageForms/CreatePackageForm";
import AddProductForm from "../components/PackageForms/AddProductForm";
import GanttTimeline from "../components/GanttTimeline/GanttTimeline";

const {Content, Sider} = Layout;
const {Search} = Input;
const {Option} = Select;
const {Column} = Table;

const PackagePage = () => {
    const {path} = useRouteMatch();

    const [query, setQuery] = useState("");
    const [isCreatePackageModalVisible, setIsCreatePackageModalVisible] = useState(false);
    const [isAddProductModalVisible, setIsAddProductModalVisible] = useState(false);

    const [handleFilterPackages, {packages, filtering}] = useHandleFilterPackages();

    useEffect(() => {
        handleFilterPackages();
    }, []);

    const onSearch = (queryValue) => {
        setQuery(queryValue);
        handleFilterPackages(queryValue);
    };

    const onSelectProductType = () => {
        handleFilterPackages(query);
    };

    return (
        <>
            <Layout style={{minHeight: "100vh"}}>
                <NavigationBar defaultSelected="/package"/>
                <Layout style={{height: "100%"}}>
                    <Sider style={{width: 512}}>
                        <PackageSideMenu/>
                    </Sider>
                    <Content>
                        <Switch>
                            <Route exact path={`${path}`}>
                                <Row style={{margin: "2em 0"}} gutter={{lg: 32}}>
                                    <Col lg={12}>
                                        <Search placeholder="Search for packages"
                                                allowClear
                                                enterButton="Search"
                                                size="large"
                                                onSearch={onSearch}
                                                loading={filtering}/>
                                    </Col>
                                    <Col>
                                        <Select defaultValue="Product Group 1" size="large"
                                                onSelect={onSelectProductType}>
                                            <Option value="Product Group 1">Product Group 1</Option>
                                            <Option value="Product Group 2">Product Group 2</Option>
                                            <Option value="Product Group 3">Product Group 3</Option>
                                        </Select>
                                    </Col>
                                    <Col>
                                        <Button size="large"
                                                onClick={() => setIsCreatePackageModalVisible(true)}>
                                            Create
                                        </Button>
                                    </Col>
                                </Row>
                                <Table expandable={{
                                    expandedRowRender: record => (
                                        <p style={{margin: 0}}>{record.description}</p>
                                    ),
                                    rowExpandable: record => record.name !== "Not Expandable"
                                }} dataSource={packages} rowKey="id">
                                    <Column title="Name" dataIndex="name" key="name"/>
                                    <Column title="What Is Included" dataIndex="what_is_included"
                                            key="what_is_included"/>
                                    <Column title="Available" dataIndex="available" key="available"/>
                                    <Column title="Edit"
                                            key="action"
                                            render={() => {
                                                return <Space size="middle">
                                                    <a>Edit</a>
                                                </Space>
                                            }}/>
                                    <Column title="Add"
                                            key="action"
                                            render={() => (
                                                <Space size="middle">
                                                    <a onClick={() => {
                                                        setIsAddProductModalVisible(true);
                                                    }}>
                                                        Add
                                                    </a>
                                                </Space>
                                            )}/>
                                </Table>
                            </Route>
                            <Route exact path={`${path}/calendar`}>
                                <GanttTimeline/>
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
                <PageFooter/>
            </Layout>
            <Modal title="Register a package " visible={isCreatePackageModalVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsCreatePackageModalVisible(false);
                   }}>
                <CreatePackageForm/>
            </Modal>
            <Modal title="Add a product " visible={isAddProductModalVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsAddProductModalVisible(false);
                   }}>
                <AddProductForm/>
            </Modal>
        </>

    );
}

export default PackagePage;
