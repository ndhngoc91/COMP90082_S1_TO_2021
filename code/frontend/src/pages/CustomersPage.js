import React, {useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Col, Layout, Spin, Row, Table, Typography, Input, Radio, Button} from "antd";
import PageFooter from "../components/PageFooter/PageFooter";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { useCustomers } from "../hooks/CustomerHooks";
const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;


const CustomersPage = () => {
    const [
        getCustomers,
        setPageCurrent,
        setSearchQuery,
        { loading, customers, totalCustomers, pageSize, pageCurrent, searchQuery }
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

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
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
        },
        // {
        //     title: "Add to Hiring List",
        //     render: () => <a href="/hiringForm"> Add</a>,
        // }

    ];

    const [selectedCustomer, setSelectedCustomer] = useState("");


    const rowSelection = {
        // onChange: (selectedRowKeys, selectedRows) => {
        //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        // },
        onSelect: (record, selected, selectedRows) => {
          //console.log(selectedRows[0]);
          setSelectedCustomer(selectedRows[0]);
        },
        type: "radio",
      };

    


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
            <NavigationBar defaultSelected="/customers" />
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
                        </Row>
                        {loading ?
                            <Spin size="large" /> :
                            <Table
                                dataSource={customers}
                                columns={columns}
                                rowKey={
                                    (row) => row.id
                                }
                                bordered
                                showHeader
                                pagination={pagination}
                                rowSelection = {rowSelection}
                            />
                        }
                        <Row>
                        <Link to={{
                            pathname: '/hiringForm',
                            state: selectedCustomer
                            }}>Add</Link>
                        </Row>
                    </Col>
                </Row>
                
            </Content>
            <PageFooter />
        </Layout>
    );
}

export default CustomersPage;
