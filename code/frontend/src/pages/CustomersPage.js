import React, {useEffect, useState} from "react";
import {Button, Col, Layout, Row, Spin, Table, Tag, Space, Typography, Input} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {useCustomersList} from "../hooks/CustomersHooks";
const {Content} = Layout;
import PageFooter from "../components/PageFooter/PageFooter";
const {Title} = Typography;
const {Search} = Input;

const CustomersPage = () => {
    const customers = useCustomersList();
    console.log(customers);

    const props = {
        bordered: true,
        loading: false,
        pagination: { position: "bottom" },
        size: "default",
        title: undefined,
        showHeader: true,
        rowSelection: {},
        scroll: { y: 240 }
      };

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
        }, {
            title: "Customer code",
            dataIndex: "customer_code",
        },
        {
            title: "Nationality",
            dataIndex: "nationality_code",
        }
    
    
    ]

    const onSearch = value => console.log(value);
      
    return (

        <Layout style={{minHeight: "100vh"}}>
            
             {/* Top navigation bar */}
             <NavigationBar defaultSelected="/customer"/>


            {/* Content body */}
            <Content style={{padding: "90px 16px"}}>
                <Row justify="center">
                    
                    <Col span={18}>

                    <Row>
                        <Col span={20}> <Title level={4}>Customer List</Title></Col>
                        <Col span={4}> <Search placeholder="search" onSearch={onSearch} style={{ width: 175 }} /></Col>
                    </Row>
                    <Table {...props} dataSource={customers} columns={columns} rowKey={(row) => row.id}/>
                    </Col>
                </Row>
            </Content>

            <PageFooter/>
        </Layout>
    );

}

export default CustomersPage;