import React from "react";
import {Button, Col, Image, Row, Typography} from "antd";
import rockyValleyBanner from "../../assets/banner-internal.svg";
import rockyValleyLogo from "../../assets/rocky_valley.svg";
import {HistoryOutlined, ShopOutlined, ShoppingOutlined, UserSwitchOutlined} from "@ant-design/icons";

const {Title, Text} = Typography;

const HomePageCustomerView = () => {
    return <>
        <Row>
            <Image src={rockyValleyBanner} width={"100%"} preview={false}/>
        </Row>
        <div style={{textAlign: "center", marginTop: "0vh", padding: "2em 0"}}>
            <Image src={rockyValleyLogo} preview={false} width={"700px"}/>
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
                        <UserSwitchOutlined/> Easy Ordering
                    </Title>
                    <Text type="secondary">
                        Easy Ordering
                    </Text>
                </Col>
            </Row>
        </div>
    </>;
};

export default HomePageCustomerView;
