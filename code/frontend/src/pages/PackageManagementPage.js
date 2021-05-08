import React, {useEffect, useState} from "react";
import {Layout, Table, Space, Input, Select, Row, Col, Button, Modal} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {useHandleFilterPackages} from "../hooks/PackageHooks";
import AddPackageForm from "../components/PackageForms/AddPackageForm";
import EditPackageForm from "../components/PackageForms/EditPackageForm";
import {EditOutlined} from "@ant-design/icons";
import {useAgeGroups} from "../hooks/AgeGroupHooks";
import {useCategories} from "../hooks/CategoryHooks";
import {useSkillLevels} from "../hooks/SkillLevelHooks";

const {Content} = Layout;
const {Search} = Input;
const {Option} = Select;
const {Column} = Table;

const PackageManagementPage = () => {
    const [query, setQuery] = useState("");
    const [selectedAgeGroupId, setSelectedAgeGroupId] = useState(-1);
    const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
    const [selectedSkillLevelId, setSelectedSkillLevelId] = useState(-1);

    const [isAddPackageModelVisible, setIsAddPackageModelVisible] = useState(false);
    const [isEditPackageVisible, setIsEditPackageModelVisible] = useState(false);
    const [editFormFieldValues, setEditFormFieldValues] = useState({});

    const ageGroups = useAgeGroups();
    const categories = useCategories();
    const skillLevels = useSkillLevels();

    const [handleFilterPackages, {packages, filtering}] = useHandleFilterPackages();

    useEffect(() => {
        handleFilterPackages();
    }, []);

    const onSearch = (queryValue) => {
        setQuery(queryValue);
    };

    const onSelectCategory = (selectedCategoryId) => {
        setSelectedCategoryId(selectedCategoryId);
    };

    const onSelectSkillLevel = (selectedSkillLevelId) => {
        setSelectedSkillLevelId(selectedSkillLevelId);
    };

    const onSelectAgeGroup = (selectedAgeGroupId) => {
        setSelectedAgeGroupId(selectedAgeGroupId);
    };

    useEffect(() => {
        const filterParams = {
            query: query
        };
        if (selectedCategoryId > 0) {
            filterParams.category_id = selectedCategoryId;
        }
        if (selectedSkillLevelId > 0) {
            filterParams.skill_level_id = selectedSkillLevelId;
        }
        if (selectedAgeGroupId > 0) {
            filterParams.age_group_id = selectedAgeGroupId;
        }
        handleFilterPackages(filterParams);
    }, [query, selectedAgeGroupId, selectedCategoryId, selectedSkillLevelId]);

    return (
        <>
            <Layout style={{minHeight: "100vh"}}>
                <NavigationBar defaultSelected="/package"/>
                <Layout style={{height: "100%"}}>
                    <Content>
                        <Row style={{margin: "2em 0"}} gutter={{lg: 24}}>
                            <Col lg={8}>
                                <Search placeholder="Search for packages"
                                        allowClear
                                        enterButton="Search"
                                        size="large"
                                        onSearch={onSearch}
                                        loading={filtering}/>
                            </Col>
                            <Col lg={4}>
                                <Select defaultValue={-1} size="large" value={selectedCategoryId}
                                        onSelect={onSelectCategory} style={{width: "100%"}}>
                                    <Option key={0} value={-1}>Select Category</Option>
                                    {categories.map((category, index) => {
                                        return (
                                            <Option key={index} value={category.id}>{category.name}</Option>
                                        );
                                    })}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <Select defaultValue={-1} size="large"
                                        value={selectedSkillLevelId}
                                        onSelect={onSelectSkillLevel} style={{width: "100%"}}>
                                    <Option key={0} value={-1}>Select Skill Level</Option>
                                    {skillLevels.map((skillLevel, index) => {
                                        return (
                                            <Option key={index} value={skillLevel.id}>{skillLevel.name}</Option>
                                        );
                                    })}
                                </Select>
                            </Col>
                            <Col lg={4}>
                                <Select defaultValue={-1} size="large"
                                        value={selectedAgeGroupId}
                                        onSelect={onSelectAgeGroup} style={{width: "100%"}}>
                                    <Option key={0} value={-1}>Select Age Group</Option>
                                    {ageGroups.map((ageGroup, index) => {
                                        return (
                                            <Option key={index} value={ageGroup.id}>{ageGroup.name}</Option>
                                        );
                                    })}
                                </Select>
                            </Col>
                            <Col>
                                <Button size="large"
                                        onClick={() => {
                                            setQuery("");
                                            setSelectedCategoryId(-1);
                                            setSelectedSkillLevelId(-1);
                                            setSelectedAgeGroupId(-1);
                                        }}>
                                    Clear
                                </Button>
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
                    </Content>
                </Layout>
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

export default PackageManagementPage;
