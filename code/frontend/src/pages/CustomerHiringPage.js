import React from "react";
import {Layout} from "antd";
import CustomerHiringForm from "../components/CustomerHiringForm";

const { Content } = Layout;

const CustomerHiringPage = () => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content style={{ margin: "90px 16px" }}>
                <CustomerHiringForm/>
            </Content>
        </Layout>
    )
};

export default CustomerHiringPage;