import React, {useEffect, useState} from "react";
import {Layout, Table, Space, Input, Select, Row, Col, Button, Modal} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {useHandleFilterPackages} from "../hooks/PackageHooks";
import PackageSideMenu from "../components/PackageSideMenu/PackageSideMenu";
import PageFooter from "../components/PageFooter/PageFooter";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import AddPackageForm from "../components/PackageForms/AddPackageForm";
import EditPackageForm from "../components/PackageForms/EditPackageForm";
import GanttTimeline from "../components/GanttTimeline/GanttTimeline";
import {EditOutlined} from "@ant-design/icons";

const {Content, Sider} = Layout;
const {Search} = Input;
const {Option} = Select;
const {Column} = Table;

const PackagePage = () => {
    const {path} = useRouteMatch();

    const [query, setQuery] = useState("");
    const [isAddPackageModelVisible, setIsAddPackageModelVisible] = useState(false);
    const [isEditPackageVisible, setIsEditPackageModelVisible] = useState(false);
    const [editFormFieldValues, setEditFormFieldValues] = useState({});

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
                                                onClick={() => setIsAddPackageModelVisible(true)}>
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
                                    <Column title="Name" dataIndex="name" key="name" width="25%"/>
                                    <Column title="What Is Included" dataIndex="what_is_included"
                                            key="what_is_included" width="35%"/>
                                    <Column title="Available" dataIndex="available" key="available" width="35%"/>
                                    <Column title="Edit" key="action" width="5%"
                                            render={values => {
                                                return <Space size="middle">
                                                    <Button icon={<EditOutlined/>} type="default"
                                                            onClick={() => {
                                                                console.log(values);
                                                                values.products = values.what_is_included.split("-");
                                                                setEditFormFieldValues(values);
                                                                setIsEditPackageModelVisible(true);
                                                            }}>
                                                        <span>Edit</span>
                                                    </Button>
                                                </Space>
                                            }}/>
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
            <Modal title="Register a package " visible={isAddPackageModelVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsAddPackageModelVisible(false);
                   }}>
                <AddPackageForm/>
            </Modal>
            <Modal title="Edit a package" visible={isEditPackageVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsEditPackageModelVisible(false);
                   }}>
                <EditPackageForm fieldValues={editFormFieldValues}/>
            </Modal>
        </>

    );
}

export default PackagePage;
