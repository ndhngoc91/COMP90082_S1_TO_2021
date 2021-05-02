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
import {useCategories} from "../hooks/CategoryHooks";
import {useSkillLevels} from "../hooks/SkillLevelHooks";

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

    const categories = useCategories();
    const skillLevels = useSkillLevels();

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
                                <Row style={{margin: "2em 0"}} gutter={{lg: 24}}>
                                    <Col lg={12}>
                                        <Search placeholder="Search for packages"
                                                allowClear
                                                enterButton="Search"
                                                size="large"
                                                onSearch={onSearch}
                                                loading={filtering}/>
                                    </Col>
                                    <Col lg={4}>
                                        <Select defaultValue="Select Category" size="large"
                                                onSelect={onSelectProductType} style={{width: "100%"}}>
                                            {categories.map(category => {
                                                return (
                                                    <Option value={category.id}>{category.name}</Option>
                                                );
                                            })}
                                        </Select>
                                    </Col>
                                    <Col lg={4}>
                                        <Select defaultValue="Select Skill Level" size="large"
                                                onSelect={onSelectProductType} style={{width: "100%"}}>
                                            {skillLevels.map(skillLevel => {
                                                return (
                                                    <Option value={skillLevel.id}>{skillLevel.name}</Option>
                                                );
                                            })}
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
                                    <Column title="Name" dataIndex="name" key="name" width="50%"/>
                                    <Column title="Sell Code" dataIndex="sellcode" key="available" width="45%"/>
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
