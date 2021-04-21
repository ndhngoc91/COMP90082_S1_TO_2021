import React, {useEffect, useState} from "react";
import {Button, Col, Layout, Row, Spin, Table, Tag, Typography} from "antd";
import NavigationBar from "../components/NavigationBar";
import {useCustomersList} from "../hooks/CustomersHooks";

const CustomersPage = () => {
    const customers = useCustomersList();

    return (

        <Layout>

             {/* Top navigation bar */}
             <NavigationBar defaultSelected="/customers"/>
                   
           
            <div>Customers</div>
                   
            <Table dataSource={customers}/>

        </Layout>


       
           
        
            

           

        

    );

}

export default CustomersPage;