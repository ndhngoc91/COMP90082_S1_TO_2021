import React, {useEffect, useState} from "react";
import {Button, Col, Layout, Row, Spin, Table, Tag, Space, Typography, Input, Pagination, Divider} from "antd";
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


    const [currPage, setCurrPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
   

    const handleSearch = value => {

        axios.get(`http://127.0.0.1:8000/customers/search/${value}/${currPage}`,{
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {            
            let customers = response.data.items;
            //let pageSize = response.data.page_items;
            let totalCustomers = response.data.total_items;
            
            for (var i = 0; i < response.data.length; i++) {
                customers[i]["key"] = i;
            }
            setSearchedCustomers(customers);
            setLoadSearch(true);
            //setPageSize(pageSize);
            setTotalCustomers(totalCustomers);
            setSearchValue(value);
            console.log("search");
            console.log(currPage);
            
        });
    }

  

    const handleChange = event => {
        if (event.target.value === "") {
            setLoadSearch(false);
        }
    }


    const handlePaginationChange = pageNumber => {
        setCurrPage(pageNumber);
        handleSearch(searchValue)
      }

   
    const customerPagination = {
        defaultCurrent: 1,
        defaultPageSize: 4
    };

    const [pageSize, setPageSize] = useState([]);
    const [totalCustomers, setTotalCustomers] = useState([]);

    const resultPagination = {
        defaultCurrent: 1,
        current: currPage,
        onChange: handlePaginationChange,
        pageSize: 2,
        total: totalCustomers
    };

  


    const customerTable = (
        <>
            <Table {...props} dataSource={customers} pagination={customerPagination} columns={columns} rowKey={(row) => row.id}/>
        </>
    );

    const searchResult = (
        <>
        <Table {...props} dataSource={searched_customers} pagination={resultPagination} columns={columns} rowKey={(row) => row.id}/>

        </>
    
    );

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
                    
                    {loadSearch ? searchResult : customerTable}
                    
                    </Col>
                </Row>
            </Content>
            <PageFooter/>

        </Layout>
    );
}

    


   

export default CustomersPage;