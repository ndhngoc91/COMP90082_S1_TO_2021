import React, {useEffect} from "react";
import {Col, Layout, Row, Select, Space, Table, Tag, Input} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {useHandleFilterUsers} from "../hooks/UserHooks";

const {Content} = Layout;
const {Column} = Table;
const {Search} = Input;

const UserManagementPage = () => {
    const [handleFilterUsers, {users, filtering}] = useHandleFilterUsers();

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
                    </Row>
                    <Content>
                        <Table dataSource={users}>
                            <Column title="Username" dataIndex="username"/>
                            <Column title="First Name" dataIndex="first_name"/>
                            <Column title="Last Name" dataIndex="last_name"/>
                            <Column title="Phone" dataIndex="phone"/>
                            <Column title="Email" dataIndex="email"/>
                            <Column title="Gender" dataIndex="gender"/>
                            <Column title="Action" key="action" render={(text, record) => (
                                <Space size="middle">
                                    <a>Invite {record.name}</a>
                                    <a>Delete</a>
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
