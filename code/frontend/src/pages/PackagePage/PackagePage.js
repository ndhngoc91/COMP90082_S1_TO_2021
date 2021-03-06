import React, {useEffect, useState} from "react";
import {Button, Col, Card, Image, Layout, Row, Select, Typography, Divider, Statistic, Tag} from "antd";
import {BrowserRouter} from "react-router-dom";
import {usePackages} from "../../hooks/PackageHooks";
import {useCategories} from "../../hooks/CategoryHooks";
import NavigatorBar from "../../components/NavigationBar/NavigationBar";
import PageFooter from "../../components/PageFooter/PageFooter";
import imageComing from "../../assets/imageComing.png";
import {usePackagePageStyles} from "./styles";
import {
    CaretRightOutlined,
    LikeOutlined
} from "@ant-design/icons";


const {Meta} = Card;
const {Link} = Typography;
const {Content} = Layout;
const {Option} = Select;


const PackagePage = () => {
    const categories = useCategories();
    const [packages] = usePackages();
    const [filteredPackages, filterPackages] = useState(packages);

    useEffect(() => {
        filterPackages(packages);
    }, [packages])

    const onSelectCategory = (selectedCategoryId) => {
        if (selectedCategoryId > 0) {
            filterPackages(packages.filter((p) => p.category_id === selectedCategoryId));
        } else {
            filterPackages(packages);
        }
    };

    const {contentCls} = usePackagePageStyles();

    return (
        <Layout style={{minHeight: "100vh"}}>
            <NavigatorBar/>
            <BrowserRouter>
                <Layout>
                    <Content className={contentCls}>
                        <Row style={{marginBottom: 30}}>
                            <Col lg={4}>
                                <Select defaultValue={-1} size="large"
                                        onSelect={onSelectCategory} style={{width: "100%"}}>
                                    <Option key={0} value={-1}>Select Category</Option>
                                    {categories.map((category, index) => {
                                        return (
                                            <Option key={`category_${index}`}
                                                    value={category.id}>{category.name}</Option>
                                        );
                                    })}
                                </Select>
                            </Col>
                        </Row>
                        <Row justify="space-between" gutter={[32, 32]}>
                            {filteredPackages.map(package_ => {
                                return <Col span={6}>
                                    <Card key={`package_${package_["id"]}`}
                                          style={{width: "100%"}}
                                          cover={
                                              <Image style={{width: "100%", minHeight: "238px"}}
                                                     src={package_["image_url"]}
                                                     fallback={imageComing}
                                                     preview={false}
                                                     placeholder={true}/>
                                          }>
                                        <Meta title={package_["name"]}/>
                                        <Divider/>
                                        <Row justify="space-between">
                                            <Link href={`/package-details/${package_["id"]}`}>
                                                <Button type="link" size="large"
                                                        icon={<CaretRightOutlined/>}>
                                                    View Details
                                                </Button>
                                            </Link>
                                            <Row align="middle">
                                                <Tag color="green" style={{fontSize: "1em"}}>Available</Tag>
                                            </Row>
                                            <Statistic value={Math.floor(Math.random() * 500)}
                                                       prefix={<LikeOutlined/>}/>
                                        </Row>
                                    </Card>
                                </Col>
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
