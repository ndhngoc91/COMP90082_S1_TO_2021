import React, {useState} from "react";
import {Layout, Table, Space, Input, Select, Row, Col, Button, Modal} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {usePackages} from "../hooks/PackageHooks";
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
    const [isCreatePackageModalVisible, setIsCreatePackageModalVisible] = useState(false);
    const [isAddProductModalVisible, setIsAddProductModalVisible] = useState(false);

    const showCreatePackageModal = () => {
        setIsCreatePackageModalVisible(true);
    };

    const hideCreatePackageModal = () => {
        setIsCreatePackageModalVisible(false);
    };

    const showAddProductModal = () => {
        setIsAddProductModalVisible(true);
    };

    const handleOkForAddProductModal = () => {
        setIsAddProductModalVisible(false);
    };

    const handleCancelForAddProductModal = () => {
        setIsAddProductModalVisible(false);
    };

    const [packages] = usePackages();

    const {path} = useRouteMatch();

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
                                        <Search
                                            placeholder="Search for packages"
                                            allowClear
                                            enterButton="Search"
                                            size="large"
                                        />
                                    </Col>
                                    <Col>
                                        <Select defaultValue="Product Group 1" size="large">
                                            <Option value="Product Group 1">Product Group 1</Option>
                                            <Option value="Product Group 2">Product Group 2</Option>
                                            <Option value="Product Group 3">Product Group 3</Option>
                                        </Select>
                                    </Col>
                                    <Col>
                                        <Button size="large" onClick={showCreatePackageModal}>Create</Button>
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
                                    <Column title="Add Product"
                                            key="action"
                                            render={() => (
                                                <Space size="middle">
                                                    <a onClick={showAddProductModal}>Add Product</a>
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
                   footer={null} closable={false} onCancel={hideCreatePackageModal}>
                <CreatePackageForm/>
            </Modal>
            <Modal title="Add a product " visible={isAddProductModalVisible}
                   onOk={handleOkForAddProductModal} closable={false}
                   onCancel={handleCancelForAddProductModal}>
                <AddProductForm/>
            </Modal>
        </>

    );
}

export default PackagePage;
