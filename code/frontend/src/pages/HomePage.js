import React from "react";
import {useHistory} from "react-router-dom";

import {
    Button,
    Col,
    Layout,
    Row,
    Typography
} from "antd";

import {
    CodepenOutlined,
    HistoryOutlined,
    ShoppingOutlined,
    ShopOutlined,
    UserSwitchOutlined
} from "@ant-design/icons";

const {Content, Footer} = Layout;
const {Text, Title} = Typography;

import NavigationBar from "../components/NavigationBar/NavigationBar";
import PageFooter from "../components/PageFooter/PageFooter";

const HomePage = () => {
    const history = useHistory();

    const handleClickGetStarted = () => {
        history.push("/productList#1");

    }
    const handleClickViewOrders = () => {
        history.push("/history");
    }

    return (
        <Layout style={{minHeight: "100vh"}}>
            {/* Top navigation bar */}
            <NavigationBar defaultSelected="/"/>

            {/* Content body */}
            <Content style={{padding: "80px 80px", background: " #fff", margin: "10vh 20vh", borderRadius: "1.25rem"}}>

                {/* HolySAS brand title and description */}
                <div style={{textAlign: "center", marginTop: "0vh"}}>
                    <Title style={{fontSize: "3.5rem", marginBottom: "5vh"}} level={1}>HolySAS</Title>
                    <Row justify="center">
                        <Col span={16}>
                            <Title level={3} type="secondary ">
                                Welcome to HolySAS, home of your favourite products.
                                We offer the latest air management solutions from Holyoake,
                                and your favourite wholesale products from PJ SAS.
                            </Title>
                        </Col>
                    </Row>

                    <Row style={{marginTop: "7.5vh"}} gutter={[24, 8]} justify="center">
                        <Col span={8}>
                            <Title level={4}>
                                <ShoppingOutlined/> Variety of Products
                            </Title>
                            <Text type="secondary">
                                View a wide range of products from both Holyoake Air Management Solutions
                                and PJ SAS Trading
                            </Text>
                        </Col>
                        <Col span={8}>
                            <Title level={4}>
                                <UserSwitchOutlined/> Customer Level Pricing
                            </Title>
                            <Text type="secondary">
                                View personalized customer-level pricing based on the selected customer
                            </Text>
                        </Col>
                        <Col span={8}>
                            <Title level={4}>
                                <CodepenOutlined/> In-Browser 3D Models
                            </Title>
                            <Text type="secondary">
                                Interact with and view the parameters of in-browser rendered 3D models, for Holyoake
                                diffusers
                            </Text>
                        </Col>
                    </Row>

                    {/* Button links */}
                    <div style={{marginTop: "10vh"}}>
                        <Button
                            type="primary"
                            size="large"
                            icon={<ShopOutlined/>}
                            onClick={() => handleClickGetStarted()}
                        >
                            Get Started
                        </Button>
                        <Button
                            type="secondary"
                            size="large"
                            icon={<HistoryOutlined/>}
                            style={{marginLeft: "1vw"}}
                            onClick={() => handleClickViewOrders()}
                        >
                            View Orders
                        </Button>
                    </div>
                </div>
            </Content>

            <PageFooter/>
        </Layout>
    )
}

export default HomePage;
