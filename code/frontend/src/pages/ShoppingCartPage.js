import React from "react";
import {Button, Col, Descriptions, Divider, Image, Layout, Row, Space, Typography} from "antd";
import NavigatorBar from "../components/NavigationBar/NavigationBar";
import {BrowserRouter} from "react-router-dom";
import bikePhoto from "../assets/bike.png";

const {Content} = Layout;
const {Title} = Typography;

const ShoppingCartPage = () => {
    return <Layout style={{minHeight: "100vh"}}>
        <NavigatorBar/>
        <BrowserRouter>
            <Layout>
                <Content style={{padding: "3em", backgroundColor: "#FFFFFF"}}>
                    <Row justify="space-between" gutter={80}>
                        <Col span={18}>
                            <Title level={2}>Shopping Cart</Title>
                            <Divider/>
                            <Row gutter={16}>
                                <Col span={4}>
                                    <Image style={{width: "100%"}} src={bikePhoto} preview={false}/>
                                </Col>
                                <Col span={16}>
                                    <Title level={3}>Beginner Ski Package - Adult</Title>
                                    <Descriptions>
                                        <Descriptions.Item span={3}>
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
                                </Col>
                                <Col span={4}>
                                    <Title level={1}>$125</Title>
                                </Col>
                            </Row>
                            <Divider/>
                            <Row gutter={16}>
                                <Col span={4}>
                                    <Image style={{width: "100%"}} src={bikePhoto} preview={false}/>
                                </Col>
                                <Col span={16}>
                                    <Title level={3}>Beginner Ski Package - Adult</Title>
                                    <Descriptions>
                                        <Descriptions.Item span={3}>
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
                                </Col>
                                <Col span={4}>
                                    <Title level={1}>$125</Title>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={6}>
                            <Space direction="vertical" style={{width: "100%"}}>
                                <Button type="primary" size="large" style={{width: "100%"}}>Proceed to checkout</Button>
                                <Button size="large" style={{width: "100%"}}>Continue booking</Button>
                            </Space>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </BrowserRouter>
    </Layout>;
};

export default ShoppingCartPage;
