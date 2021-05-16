import React from "react";
import {Col, Button, Image, Layout, Row, Space, Typography} from "antd";
import {BrowserRouter} from "react-router-dom";
import NavigatorBar from "../../components/NavigationBar/NavigationBar";
import {usePackagePageStyles} from "./styles";
import {usePackages} from "../../hooks/PackageHooks";
import PageFooter from "../../components/PageFooter/PageFooter";

const {Title, Link} = Typography;
const {Content} = Layout;

const PackagePage = () => {
    const [packages] = usePackages();

    const {packageItemCls} = usePackagePageStyles();

    return (
        <Layout style={{minHeight: "100vh"}}>
            <NavigatorBar/>
            <BrowserRouter>
                <Layout>
                    <Content style={{padding: "3em"}}>
                        <Row justify="space-between" gutter={[80, 40]}>
                            {packages.map(package_ => {
                                return <Col span={6}>
                                    <Space className={packageItemCls} direction="vertical">
                                        <Image style={{width: "100%", minWidth: "238px"}}
                                               src={package_["image_url"]}
                                               preview={false}/>
                                        <Title level={4}>{package_["name"]}</Title>
                                        <Space>
                                            <Link href={`/package-details/${package_["id"]}`}>
                                                <Button type="primary">
                                                    View Details
                                                </Button>
                                            </Link>
                                            <Button>
                                                Add to Shopping Cart
                                            </Button>
                                        </Space>
                                    </Space>
                                </Col>;
                            })}
                        </Row>
                    </Content>
                    <PageFooter/>
                </Layout>
            </BrowserRouter>
        </Layout>
    );
};

export default PackagePage;
