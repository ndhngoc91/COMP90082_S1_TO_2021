import React, {useEffect, useState} from "react";
import {Col, Layout, Spin, Row, Table, Typography, Input, Space, Button, Switch, Tooltip, Select} from "antd";
import { useCustomers } from "../../hooks/CustomerHooks";
const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const {Option} = Select;


const UserList = () => {

    const [data,setData] =useState([]);

    for (let i = 0; i < 100; ++i) {
        if(i<50){
            data.push({
                key: i,
                username: 'Screem',
                firstName: 'iOS',
                lastName: 'Jack',
                gender:"female",
                email: '2014-12-24 23:12:00',
                isDisabled:true,
            });
        }else{
            data.push({
                key: i,
                username: 'Screem',
                firstName: 'iOS',
                lastName: 'Jack',
                gender:'male',
                email: '2014-12-24 23:12:00',
            });
        }
    }

    const columns = [
        {
            title:"User Name",
            dataIndex:"username",
            key:"username",
            width:"15%",
        },
        {
            title:"First Name",
            dataIndex:"firstName",
            key:"firstName",
            width:"20%"
        },
        {
            title:"Last Name",
            dataIndex:"lastName",
            key:"lastName",
            width:"20%"
        },
        {
            title:"Gender",
            dataIndex:"gender",
            key:"gender",
            width:"15%",
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
            title:"Email",
            dataIndex:"email",
            key:"email",
            width:"20%",
            ellipsis:false,
            render: (email) => (
                <Tooltip placement="topLeft" title={email}>
                    {email}
                </Tooltip>),
        },
        {
            title:"Is Disabled",
            dataIndex:"isDisabled",
            key:"isDisabled",
            width:"15%",
            render: (text, record,index) => {
                return <Space size="middle">
                    <Select
                        name="isDisabled"
                        value={record.isDisabled}
                        style={{width:'80px'}}
                        onChange={(value) => {
                            console.log('Record: ');
                            console.log(record);
                            console.log('text: ');
                            console.log(text);
                            console.log('index: ');
                            console.log(index);
                            setIsDisabled(value);
                        }}>
                        <Option key="0" value="true">true</Option>
                        <Option key="1" value="false">false</Option>
                    </Select>
                </Space>

                /*
                <Space size="middle">
                    <Select
                        name="isDisabled"
                        value={isDisabled}
                        style={{width:'80px'}}
                        onChange={(value) => {
                            console.log(record);
                            setIsDisabled(value);
                        }}>
                        <Option key="0" value="true">true</Option>
                        <Option key="1" value="false">false</Option>
                    </Select>
                </Space>
                 */

            }
        },
    ];

    const [
        getCustomers,
        setPageCurrent,
        setSearchQuery,
        { loading, customers, totalCustomers, pageSize, pageCurrent, searchQuery }
    ] = useCustomers();

    const [isDisabled, setIsDisabled] = useState(false);

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
                    <Col span={18}>
                        <Row>
                            <Col span={20}>
                                <Title level={4}>Customer List</Title>
                            </Col>
                            <Col span={4}>
                                <Search
                                    placeholder="search"
                                    onSearch={handleSearch}
                                    onChange={handleSearchInputChange}
                                />
                            </Col>
                        </Row>
                        {loading ?
                            <Spin size="large" /> :
                            <Table
                                size='large'
                                dataSource={data}
                                columns={columns}
                                scroll={{ y: 1300 }}
                                bordered
                                showHeader
                                rowKey={
                                    record => {
                                        record.id
                                    }
                                }
                                onRow={(records,index) =>{
                                    return{
                                        onClick: event => {
                                            console.log(records)
                                            console.log(index)
                                        }
                                    };
                                }}
                                pagination={pagination}
                            >
                            </Table>
                        }
                    </Col>
                </Row>
            </Content>

        </>
    );
}

export default UserList;