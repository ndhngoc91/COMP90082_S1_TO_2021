import React, {useEffect, useState} from "react";
import {Col, Layout, Spin, Row, Table, Typography, Input, Button, Tooltip} from "antd";
import {useCustomers} from "../../hooks/CustomerHooks";

const {Content} = Layout;
const {Title} = Typography;
const {Search} = Input;

const initialData = []
for (let i = 0; i < 100; ++i) {
    if (i % 2 === 0) {
        initialData.push({
            key: i,
            userName: 'Screem',
            firstName: 'iOS',
            lastName: 'Jack',
            gender: "female",
            email: '2014-12-24 23:12:00',
            isEnabled: true,
        });
    } else {
        initialData.push({
            key: i,
            userName: 'Screem',
            firstName: 'iOS',
            lastName: 'Jack',
            gender: 'male',
            email: '2014-12-24 23:12:00',
            isEnabled: false,
        });
    }
}


const UserList = () => {
    const [data, setData] = useState(initialData);
    const [isAddCustomerModelVisible, setIsAddCustomerModelVisible] = useState(false);
    const [isEditCustomerVisible, setIsEditCustomerModelVisible] = useState(false);
    const [editFormFieldValues, setEditFormFieldValues] = useState({});

    const columns = [
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
            width: "15%",
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
            width: "20%"
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
            width: "20%"
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            width: "15%",
            filters: [
                {
                    text: 'female',
                    value: 'female',
                },
                {
                    text: 'male',
                    value: 'male',
                },
            ],
            onFilter: (value, record) => record.gender.indexOf(value) === 0,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "20%",
            ellipsis: false,
            render: (email) => (
                <Tooltip placement="topLeft" title={email}>
                    {email}
                </Tooltip>),
        },
        {
            title: "Is Enable",
            dataIndex: "isEnabled",
            key: "isEnabled",
            width: "15%",
            render: (isEnabled, record, index) => {
                return <Button
                    type="primary"
                    style={{width: '100px'}}
                    onClick={(event) => {
                        data[index].isEnabled = !isEnabled;
                        setData([...data]);
                    }}>
                    {isEnabled ? "Enable" : "Disable"}
                </Button>;
                /*
                <Space size="middle">
                    <Button icon={<EditOutlined/>} type="default"
                            onClick={() => {
                                console.log(values);
                                setEditFormFieldValues(values);
                                setIsEditCustomerModelVisible(true);
                            }}>
                        <span>Edit</span>
                    </Button>
                </Space>
                *  */
            }
        },
    ];

    const [
        getCustomers,
        setPageCurrent,
        setSearchQuery,
        {loading, customers, totalCustomers, pageSize, pageCurrent, searchQuery}
    ] = useCustomers();

    useEffect(() => {
        getCustomers();
    }, [pageCurrent, searchQuery])

    const handleSearch = value => {
        setPageCurrent(1);
        setSearchQuery(value);
    }

    const handleSearchInputChange = event => {
        if (event.target.value === "") {
            setPageCurrent(1);
            setSearchQuery("");
        }
    }

    console.log(data[1].isEnabled);
    /*
    const columns = [
        {
            title: "User Name",
            dataIndex: "name",
        },
        {
            title: "First Name",
            dataIndex: "first_name",
        },
        {
            title: "Last Name",
            dataIndex: "last_name",
        },
        {
            title: "Phone No.",
            dataIndex: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Customer code",
            dataIndex: "customer_code",
        },
        {
            title: "Nationality",
            dataIndex: "nationality_code",
        }
    ];
    * */

    const pagination = {
        position: ["top"],
        total: totalCustomers,
        pageSize: pageSize,
        defaultCurrent: 1,
        current: pageCurrent,
        onChange: pageNumber => {
            setPageCurrent(pageNumber);
        },
        showSizeChanger: false
    }

    return (
        <>
            <Content>
                <Row justify="center">
                    <Col>
                        <Title level={2}>Customer List</Title>
                    </Col>
                </Row>
                {/*
                <Row style={{margin: "2em 0"}} gutter={{lg: 24}}>
                    <Col span={8}>
                        <Search placeholder="Search for customers"
                                allowClear
                                enterButton="Search"
                                size="large"
                                //onSearch={onSearch}
                                //loading={filtering}
                        />
                    </Col>
                    ///////////////////////////
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
                    ///////

                <Col span={4}>
                    <Button size="large"
                            onClick={() => setIsAddCustomerModelVisible(true)}>
                        Create
                    </Button>
                </Col>
                </Row>
                */}


                <Row justify="center">
                    <Col span={18}>
                        <Row>
                            <Col span={4}>
                                <Search
                                    placeholder="search"
                                    onSearch={handleSearch}
                                    onChange={handleSearchInputChange}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{margin: "2em 0"}} gutter={{lg: 24}}>
                    {loading ?
                        <Spin size="large"/> :
                        <Table
                            size='large'
                            dataSource={data}
                            columns={columns}
                            scroll={{y: 1300}}
                            bordered
                            showHeader
                            rowKey={
                                record => {
                                    record.id
                                }
                            }
                            // pagination={pagination}
                        >
                        </Table>
                    }
                </Row>
            </Content>
            {/*
            <Modal title="Register a customer " visible={isAddCustomerModelVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsAddCustomerModelVisible(false);
                   }}>
                <UserCreateForm/>
            </Modal>
             <Modal title="Edit a customer" visible={isEditCustomerVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsEditCustomerModelVisible(false);
                   }}>
                <EditUserForm fieldValues={editFormFieldValues}/>
            </Modal>
            */}


        </>
    );
}

export default UserList;
