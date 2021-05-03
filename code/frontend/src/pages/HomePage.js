import React from "react";
import {useHistory} from "react-router-dom";

import {
    Button,
    Col,
    Layout,
    Row,
    Typography,
    Image
} from "antd";

import {
    HistoryOutlined,
    ShoppingOutlined,
    ShopOutlined,
    UserSwitchOutlined
} from "@ant-design/icons";

import rockyValleyBanner from "../assets/banner-internal.svg";

const {Content} = Layout;
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
            <Content style={{background: "#D8D8D5"}}>
                <Row style={{background: "#fff"}}>
                    <Image src={rockyValleyBanner} width={"100%"} preview={false}/>
                </Row>
                {/* HolySAS brand title and description */}
                <div style={{textAlign: "center", marginTop: "0vh", backgroundColor: "white", padding: "3em 0"}}>

                    <Title style={{fontSize: "3.5rem", marginBottom: "5vh"}} level={1}>Rocky Valley</Title>

                    <Row justify="center">
                        <Col span={16}>
                            <Title level={3} type="secondary ">
                                ONLINE CAFE ORDERING We now have online ordering at our cafe! Relaxed cafe offering
                                locally roasted coffee, smoothies, and milkshakes. A tempting assortment of cakes and
                                slices.
                            </Title>
                        </Col>
                    </Row>

                    <Row style={{marginTop: "7.5vh"}} justify="center">
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
                    </Row>

                    {/* Button links */}
                    <div style={{marginTop: "10vh"}}>
                        <Button type="primary"
                                size="large"
                                icon={<ShopOutlined/>}
                                onClick={() => handleClickGetStarted()}>
                            Order Online
                        </Button>
                        <Button type="secondary"
                                size="large"
                                icon={<HistoryOutlined/>}
                                style={{marginLeft: "1vw"}}
                                onClick={() => handleClickViewOrders()}>
                            Learn More
                        </Button>
                    </div>
                </div>
            </Content>

            <PageFooter/>
        </Layout>
    )
}

export default HomePage;
