import React, {useEffect, useState} from "react";
import {Col, Layout, Row, Space, Table, Input, notification, Button} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {useHandleEditProfile, useHandleFilterUsers} from "../hooks/UserHooks";

const {Content} = Layout;
const {Column} = Table;
const {Search} = Input;

const UserManagementPage = () => {
    const [handleFilterUsers, {users, filtering}] = useHandleFilterUsers();
    const tempData = JSON.parse(JSON.stringify(users));
    const [data, setData] = useState(tempData);
    const [handleEditProfile, {handling}] = useHandleEditProfile();

    useEffect(() => {
        handleFilterUsers();
    }, []);

    return (
        <>
            <Layout style={{minHeight: "100vh"}}>
                <NavigationBar/>
                <Layout style={{height: "100%"}}>
                    <Row style={{margin: "2em 0"}} gutter={{lg: 24}}>
                        <Col lg={8}>
                            <Search placeholder="Search for users"
                                    allowClear
                                    enterButton="Search"
                                    loading={filtering}
                                    size="large" onSearch={value => handleFilterUsers(value)}/>
                        </Col>
                        <Col lg={8}>
                            <Button size="large"
                                    onClick={() => {
                                        handleFilterUsers("");
                                    }}>
                                Clear
                            </Button>
                        </Col>
                    </Row>
                    <Content>
                        <Table dataSource={users} loading={filtering}>
                            <Column title="Username" dataIndex="username"/>
                            <Column title="First Name" dataIndex="first_name"/>
                            <Column title="Last Name" dataIndex="last_name"/>
                            <Column title="Phone" dataIndex="phone"/>
                            <Column title="Email" dataIndex="email"/>
                            <Column title="Gender" dataIndex="gender"/>
                            <Column title="DIN" dataIndex="din"/>
                            <Column title="User Role" key="user_type_id" dataIndex="user_type_id"
                                    render={(user_type_id, record, index) => (
                                        <Space size="middle">
                                            <a
                                                key = "user_type_id"
                                                onClick={() => {
                                                    let bool_value;
                                                    let final_Value;
                                                    if (user_type_id === 1){
                                                        bool_value = true;
                                                    }else if (user_type_id === 2){
                                                        bool_value = false;
                                                    }
                                                    let temp = !bool_value;
                                                    if (temp){
                                                        final_Value = 1;
                                                    }else if (temp == false){
                                                        final_Value = 2;
                                                    }
                                                    /*console.log("user_type_id",user_type_id)
                                                    console.log("final_Value",final_Value)
                                                    console.log("users",users)*/
                                                    users[index].user_type_id = final_Value;
                                                    setData([...data]);
                                                    console.log("users",users[index])
                                                    handleEditProfile(users[index], () => {
                                                        notification.success({message: "Change user role successfully!"});
                                                    }, () => {
                                                        notification.error({message: "Failed to change user role!"});
                                                    })
                                                }}
                                            >
                                                {user_type_id === 1 ? "Customer" : "Staff"}
                                            </a>
                                        </Space>
                                    )}/>

                            <Column title="Action" key="is_enabled" dataIndex="is_enabled"
                                    render={(is_enabled, record, index) => (
                                        <Space size="middle">
                                            {/*<a>Disable</a>*/}
                                            <a
                                                onClick={(event) => {
                                                    let bool_value;
                                                    let final_boolValue;
                                                    if (is_enabled === 1){
                                                        bool_value = true;
                                                    }else if (is_enabled === 0){
                                                        bool_value = false;
                                                    }
                                                    let temp = !bool_value;
                                                    if (temp){
                                                        final_boolValue = 1;
                                                    }else if (temp == false){
                                                        final_boolValue = 0;
                                                    }
                                                    console.log("is_enabled",is_enabled)
                                                    console.log("final_boolValue",final_boolValue)
                                                    console.log("users",users)
                                                    users[index].is_enabled = final_boolValue;
                                                    setData([...data]);
                                                    console.log("users",users[index])
                                                    handleEditProfile(users[index], () => {
                                                        notification.success({message: "Change account access right successfully!"});
                                                    }, () => {
                                                        notification.error({message: "Failed to edit account access right!"});
                                                    })
                                                }}
                                                loading = {handling}
                                            >
                                                {is_enabled === 1 ? "Enable" : "Disable"}
                                            </a>
                                        </Space>
                                    )}/>

                        </Table>
                    </Content>
                </Layout>
            </Layout>
        </>

    );
};

export default UserManagementPage;
