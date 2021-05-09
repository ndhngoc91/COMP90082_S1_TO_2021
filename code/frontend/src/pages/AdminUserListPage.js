import React, {useEffect, useState} from "react";
import {Col, Layout, Spin, Row, Table, Typography, Input, Space, Button, Modal} from "antd";
import PageFooter from "../components/PageFooter/PageFooter";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { useCustomers } from "../hooks/CustomerHooks";
import {DeleteRowOutlined, EditOutlined} from "@ant-design/icons";
import EditUserForm from "../components/AdminUserList/EditUserForm";
import AddUserForm from "../components/AdminUserList/AddUserForm";
import DeleteUserForm from "../components/AdminUserList/DeleteUserForm";
const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const {Column} = Table;


const AdminUserListPage = () => {
    const [
        getCustomers,
        setPageCurrent,
        setSearchQuery,
        { loading, customers, totalCustomers, pageSize, pageCurrent, searchQuery }
    ] = useCustomers();

    const [isAddUserModelVisible, setIsAddUserModelVisible] = useState(false);
    const [isEditUserVisible, setIsEditUserModelVisible] = useState(false);
    const [editFormFieldValues, setEditFormFieldValues] = useState({});
    const [isDeleteUserVisible, setIsDeleteUserModelVisible] = useState(false);
    const [deleteFormFieldValues, setDeleteFormFieldValues] = useState({});

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
        position: ["bottom"],
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
        <Layout style={{ minHeight: "100vh" }}>
            <NavigationBar defaultSelected="/users" />
            <Content style={{ margin: "90px 16px" }}>
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
                            <Col span={4}>
                                <Button size="large"
                                        onClick={() => setIsAddUserModelVisible(true)}
                                >
                                    Create
                                </Button>
                            </Col>
                            <Col span={4}>
                                <Button size="large"
                                        onClick={() => setIsEditUserModelVisible(true)}
                                >
                                    Edit
                                </Button>
                            </Col>
                            <Col span={4}>
                                <Button size="large"
                                        onClick={() => setIsDeleteUserModelVisible(true)}
                                >
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                        {loading ?
                            <Spin size="large" /> :
                            <Table
                                dataSource={customers}
                                /* columns={columns} */
                                rowKey={
                                    (row) => row.id
                                }
                                bordered
                                showHeader
                                pagination={pagination}
                            >
                                <Column title="User Name" dataIndex="name" key="name" width="16%"/>
                                <Column title="First Name" dataIndex="first_name" key="first_name" width="22%"/>
                                <Column title="Last Name" dataIndex="last_name" key="last_name" width="22%"/>
                                <Column title="Email" dataIndex="email" key="available" width="26%"/>
                                <Column title="Edit" key="edit_action" width="7%"
                                        render={values => {
                                            return <Space size="middle">
                                                <Button icon={<EditOutlined/>} type="default"
                                                        onClick={() => {
                                                            console.log(values);
                                                            values.products = values.what_is_included.split("-");
                                                            setEditFormFieldValues(values);
                                                            setIsEditUserModelVisible(true);
                                                        }}>
                                                    <span>Edit</span>
                                                </Button>
                                            </Space>
                                        }}/>
                                <Column title="Delete" key="delete_action" width="7%"
                                        render={values => {
                                            return <Space size="middle">
                                                <Button icon={<DeleteRowOutlined/>} type="default"
                                                        onClick={() => {
                                                            console.log(values);
                                                            setDeleteFormFieldValues(values);
                                                            setIsDeleteUserModelVisible(true);
                                                        }}>
                                                    <span>Delete</span>
                                                </Button>
                                            </Space>
                                        }}/>
                            </Table>
                        }
                    </Col>
                </Row>
            </Content>
            {/*<PageFooter />*/}
            <Modal title="Register a user " visible={isAddUserModelVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsAddUserModelVisible(false);
                   }}>
                <AddUserForm/>
            </Modal>
            <Modal title="Edit a user" visible={isEditUserVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsEditUserModelVisible(false);
                   }}>
                <EditUserForm fieldValues={editFormFieldValues}/>
            </Modal>
            <Modal title="Delete a user" visible={isDeleteUserVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsDeleteUserModelVisible(false);
                   }}>
                <DeleteUserForm fieldValues={deleteFormFieldValues}/>
            </Modal>
        </Layout>
    );
}

export default AdminUserListPage;