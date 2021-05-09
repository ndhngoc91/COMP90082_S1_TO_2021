import React, {useEffect, useState} from "react";
import {Col, Layout, Spin, Row, Table, Typography, Input, Space, Button, Modal} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { useCustomers } from "../hooks/CustomerHooks";
import {DeleteRowOutlined, EditOutlined} from "@ant-design/icons";
import EditAdminForm from "../components/AdminList/EditAdminForm";
import AddAdminForm from "../components/AdminList/AddAdminForm";
import DeleteAdminForm from "../components/AdminList/DeleteAdminForm";
const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const {Column} = Table;


const AdminListPage = () => {
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
                                <Title level={4}>Admin List</Title>
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
                                <Column title="User Name" dataIndex="name" key="name" width="15%"/>
                                <Column title="First Name" dataIndex="first_name" key="first_name" width="15%"/>
                                <Column title="Last Name" dataIndex="last_name" key="last_name" width="15%"/>
                                <Column title="Email" dataIndex="email" key="available" width="25%"/>
                                <Column title="Edit" key="edit_action" width="10%"
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
                                <Column title="Delete" key="delete_action" width="10%"
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
                <AddAdminForm/>
            </Modal>
            <Modal title="Edit a user" visible={isEditUserVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsEditUserModelVisible(false);
                   }}>
                <EditAdminForm fieldValues={editFormFieldValues}/>
            </Modal>
            <Modal title="Delete a user" visible={isDeleteUserVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsDeleteUserModelVisible(false);
                   }}>
                <DeleteAdminForm fieldValues={deleteFormFieldValues}/>
            </Modal>
        </Layout>
    );
}

export default AdminListPage;