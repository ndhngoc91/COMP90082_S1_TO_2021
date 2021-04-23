import React, {useEffect, useState} from "react";
import {Button, Col, Layout, Row, Spin, Table, Tag, Space, Typography, Input} from "antd";
import PageFooter from "../components/PageFooter/PageFooter";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import axios from "axios";
const {Content} = Layout;
const {Title} = Typography;
const {Search} = Input;


const CustomersPage = () => {

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

    const [customers, setCustomers] = useState([]);
    const [searched_customers, setSearchedCustomers] = useState([]);
    const [loadSearch, setLoadSearch] = useState(false);

    useEffect(() => {

        axios.get("http://localhost:8000/customers",{
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
                /* Add key for each object */
                for (var i = 0; i < response.data.length; i++) {
                    response.data[i]["key"] = i;
                }
                setCustomers(response.data);
             });

        
    }, []);



    const handleSearch = (value, event) => {
        axios.get(`http://127.0.0.1:8000/customers/search/${value}/1`,{
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
            let customers = response.data.items;
            let pages_num = response.data.total_pages;
            console.log(pages_num);

            for (var i = 0; i < response.data.length; i++) {
                customers[i]["key"] = i;
            }
            setSearchedCustomers(customers);
            
            setLoadSearch(true);
            
        });
    }

    const handleChange = event => {
        if (event.target.value === "") {
            setLoadSearch(false);
        }
    }

    const customerTable = <Table {...props} dataSource={customers} columns={columns} rowKey={(row) => row.id}/>;

    const searchResult = <Table {...props} dataSource={searched_customers} columns={columns} rowKey={(row) => row.id}/>;

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
                        <Col span={4}> 
                        <Search placeholder="search" onSearch={handleSearch} onChange={handleChange} style={{ width: 175 } } />                        
                        </Col>
                    </Row>
                    
                    {/* <Table {...props} dataSource={customers} columns={columns} rowKey={(row) => row.id}/> */}
                    { loadSearch ? searchResult : customerTable }
                    </Col>
                </Row>
            </Content>
            <PageFooter/>

        </Layout>
    );
}

    


   

export default CustomersPage;