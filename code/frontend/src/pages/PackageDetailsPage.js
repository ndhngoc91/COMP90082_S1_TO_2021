import React, {useState} from "react";
import NavigatorBar from "../components/NavigationBar/NavigationBar";
import {BrowserRouter, useHistory} from "react-router-dom";
import {Button, Col, Descriptions, Image, Layout, Row, Space, Typography} from "antd";
import bikePhoto from "../assets/bike.png";

const {Content} = Layout;
const {Title} = Typography;

const PackageDetailsPage = () => {
    const history = useHistory();

    const goToShoppingCart = () => {
        history.push("/shopping-cart");
    };

    return <Layout style={{minHeight: "100vh"}}>
        <NavigatorBar/>
        <BrowserRouter>
            <Layout>
                <Content style={{padding: "3em", backgroundColor: "#FFFFFF"}}>
                    <Row justify="space-between" gutter={80}>
                        <Col span={12}>
                            <Image style={{width: "100%"}} src={bikePhoto} preview={false}/>
                        </Col>
                        <Col span={12}>
                            <Space direction="vertical">
                                <Title level={2}>Beginner Ski Package - Adult</Title>
                                <Descriptions bordered>
                                    <Descriptions.Item label="Status" span={3}>
                                        Available
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Summary" span={3}>
                                        Ski Package includes Ski's, Boots and Poles, for Downhill, XC Classic, or BC
                                        skiing.
                                        <br/>
                                        Skis and Boards are perfect for the novice skier.
                                        <br/>
                                        Downhill Boots range from rear entry to buckle.
                                        <br/>
                                        XC Boots and bindings use NNN System.
                                        <br/>
                                        BC Boots are 75mm and binding are cable binding.
                                    </Descriptions.Item>
                                </Descriptions>
                                <Space>
                                    <Button type="primary" onClick={goToShoppingCart}>Add to Cart</Button>
                                </Space>
                            </Space>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </BrowserRouter>
    </Layout>
};

export default PackageDetailsPage;
