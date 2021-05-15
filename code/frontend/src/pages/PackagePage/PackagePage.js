import React from "react";
import {Col, Button, Image, Layout, Row, Space, Typography} from "antd";
import {BrowserRouter, Switch, useHistory} from "react-router-dom";
import NavigatorBar from "../../components/NavigationBar/NavigationBar";
import bikePhoto from "../../assets/bike.png";
import {usePackagePageStyles} from "./styles";

const {Title} = Typography;
const {Content} = Layout;

const PackagePage = () => {
    const history = useHistory();

    const {packageItemCls} = usePackagePageStyles();

    const goToPackageDetailsPage = () => {
        history.push("/package-details");
    };

    return (
        <Layout style={{minHeight: "100vh"}}>
            <NavigatorBar/>
            <BrowserRouter>
                <Layout>
                    <Content style={{padding: "3em", backgroundColor: "#FFFFFF"}}>
                        <Row justify="space-between" gutter={[80, 40]}>
                            <Col span={6}>
                                <Space className={packageItemCls} direction="vertical">
                                    <Image style={{width: "100%"}} src={bikePhoto} preview={false}/>
                                    <Title level={4}>Beginner Ski Package - Adult</Title>
                                    <Space>
                                        <Button type="primary" onClick={goToPackageDetailsPage}>
                                            View More Details
                                        </Button>
                                        <Button>
                                            Shop Now
                                        </Button>
                                    </Space>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space className={packageItemCls} direction="vertical">
                                    <Image style={{width: "100%"}} src={bikePhoto} preview={false}/>
                                    <Title level={4}>Beginner Ski Package - Adult</Title>
                                    <Space>
                                        <Button type="primary">
                                            View More Details
                                        </Button>
                                        <Button>
                                            Shop Now
                                        </Button>
                                    </Space>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space className={packageItemCls} direction="vertical">
                                    <Image style={{width: "100%"}} src={bikePhoto} preview={false}/>
                                    <Title level={4}>Beginner Ski Package - Adult</Title>
                                    <Space>
                                        <Button type="primary">
                                            View More Details
                                        </Button>
                                        <Button>
                                            Shop Now
                                        </Button>
                                    </Space>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space className={packageItemCls} direction="vertical">
                                    <Image style={{width: "100%"}} src={bikePhoto} preview={false}/>
                                    <Title level={4}>Beginner Ski Package - Adult</Title>
                                    <Space>
                                        <Button type="primary">
                                            View More Details
                                        </Button>
                                        <Button>
                                            Shop Now
                                        </Button>
                                    </Space>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space className={packageItemCls} direction="vertical">
                                    <Image style={{width: "100%"}} src={bikePhoto} preview={false}/>
                                    <Title level={4}>Beginner Ski Package - Adult</Title>
                                    <Space>
                                        <Button type="primary">
                                            View More Details
                                        </Button>
                                        <Button>
                                            Shop Now
                                        </Button>
                                    </Space>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space className={packageItemCls} direction="vertical">
                                    <Image style={{width: "100%"}} src={bikePhoto} preview={false}/>
                                    <Title level={4}>Beginner Ski Package - Adult</Title>
                                    <Space>
                                        <Button type="primary">
                                            View More Details
                                        </Button>
                                        <Button>
                                            Shop Now
                                        </Button>
                                    </Space>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space className={packageItemCls} direction="vertical">
                                    <Image style={{width: "100%"}} src={bikePhoto} preview={false}/>
                                    <Title level={4}>Beginner Ski Package - Adult</Title>
                                    <Space>
                                        <Button type="primary">
                                            View More Details
                                        </Button>
                                        <Button>
                                            Shop Now
                                        </Button>
                                    </Space>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space className={packageItemCls} direction="vertical">
                                    <Image style={{width: "100%"}} src={bikePhoto} preview={false}/>
                                    <Title level={4}>Beginner Ski Package - Adult</Title>
                                    <Space>
                                        <Button type="primary">
                                            View More Details
                                        </Button>
                                        <Button>
                                            Shop Now
                                        </Button>
                                    </Space>
                                </Space>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </BrowserRouter>
        </Layout>
    );
};

export default PackagePage;
