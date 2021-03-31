import React from "react";
import ImageViewer from "../components/ImageViewer";
import NavigationBar from "../components/NavigationBar";
import ModelMetadata from "../components/ModelMetadata";
import {
    Layout,
    Row,
    Col,
    Tabs,
    InputNumber,
    Statistic,
    Button,
    Typography,
    Spin,
    notification,
    Card,
} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {useProductInfo, useProductMetaData} from "../hooks/ProductHooks";
import {useHistory, useParams} from "react-router-dom";
import {useStores} from "../stores";

const {Content, Footer} = Layout;
const {TabPane} = Tabs;
const {Title} = Typography;

const ProductDetailsPage = () => {
    const {productCode} = useParams();
    const history = useHistory();

    const productInfo = useProductInfo(productCode);
    const productMetaData = useProductMetaData(productCode);

    const {cartStore} = useStores();

    // Event Handler for Product Quantity Change
    const onQuantityChange = (value) => {
        productInfo.quantity = value;
    }

    // Event Handler for Checkout Button
    const checkOutClicked = () => {
        cartStore.readdProduct(productInfo);
        notification.success({
            message: "Product was successfully added to the cart",
            placement: "topRight"
        });
    }

    if (sessionStorage.getItem("user")) {
        if (productInfo == null) {
            return (
                <Layout style={{minHeight: "100vh"}}>

                    {/* Top navigation bar */}
                    <NavigationBar history={history} defaultSelected={null}/>


                    {/* Main Content */}
                    <Content style={{padding: "100px 100px"}}>
                        <div style={{marginTop: "150px"}}>

                            <Row gutter={[32, 32]}>
                                <Col flex={9}/>
                                <Col flex={0}> <Spin size="large"/> </Col>
                                <Col flex={9}/>
                            </Row>
                        </div>
                    </Content>

                    {/* Footer */}
                    <Footer style={{position: "sticky", bottom: "0", textAlign: "center"}}>SQUIZZ ©2020 Created by
                        SQ-Wombat and SQ-Koala</Footer>
                </Layout>
            )
        }

        const {imageList} = productInfo;
        productInfo.quantity = 1;
        productInfo.IsHolyOakes = (imageList && imageList.find(image => image.is3DModelType === "Y")) != null;

        return (
            <Layout style={{minHeight: "100vh"}}>
                <NavigationBar defaultSelected="/product"/>
                <div style={{marginTop: "50px"}}>
                    <Content style={{padding: "50px 50px"}}>
                        <Card style={{borderRadius: "1.25rem"}} hoverable={true}>

                            {/* Title */}
                            <Row gutter={[16, 16]}>
                                <Col flex={7}>
                                    <Title data-testid="title" level={2} style={{
                                        marginLeft: "120px",
                                        fontFamily: "sans-serif"
                                    }}>{productInfo.productName}</Title>
                                </Col>
                            </Row>

                            <Row gutter={[16, 16]}>
                                <Col flex={9}>
                                    <ImageViewer height={500} width={600} imageList={productInfo.imageList}/>
                                </Col>
                                <Col flex={3}>
                                    <div style={{backgroundColor: "whiteSmoke", borderRadius: "5%"}}>

                                        <div style={{padding: 20}}>
                                            <Statistic title="Total Price (AUD)" value={productInfo.price} prefix="$"
                                                       precision={2}/>
                                        </div>
                                        <div style={{paddingLeft: 20}}>
                                            <span> Quantity: </span>
                                            <InputNumber min={1} max={100} defaultValue={1}
                                                         onChange={onQuantityChange}/>
                                        </div>
                                        <div style={{paddingLeft: 20}}>
                                            <p>In Stock Quantity: {productInfo.stockQuantity}</p>
                                        </div>
                                        <div style={{padding: 20}}>
                                            <Button icon={<ShoppingCartOutlined/>} onClick={checkOutClicked}>Add to
                                                cart</Button>
                                        </div>

                                    </div>
                                </Col>
                            </Row>
                            <div style={{padding: "25px 16px"}}>
                                <Row gutter={[16, 16]} style={{minHeight: 250}}>
                                    <Col flex={1}>
                                        <Tabs defaultActiveKey="1">
                                            <TabPane tab="Description" key="1">
                                                <div data-testid="descriptionTab">
                                                    {productInfo.description1 === "" || productInfo.description1 == null
                                                        ?
                                                        "Coming Soon"
                                                        :
                                                        <div
                                                            dangerouslySetInnerHTML={{__html: productInfo.description1}}/>}
                                                </div>
                                            </TabPane>
                                            <TabPane tab="Specification" key="2">
                                                <div data-testid="specificationTab">
                                                    {productInfo.description2 === "" || productInfo.description2 == null
                                                        ?
                                                        "Coming Soon"
                                                        :
                                                        <div
                                                            dangerouslySetInnerHTML={{__html: productInfo.description2}}/>}
                                                </div>
                                            </TabPane>
                                            {productMetaData &&
                                            <TabPane tab="Parameter" key="3">
                                                <Row gutter={[16, 16]}>
                                                    <ModelMetadata metadata={productMetaData}/>
                                                </Row>
                                            </TabPane>}
                                            <TabPane tab="Downloads" key="4">
                                                Coming Soon
                                            </TabPane>
                                        </Tabs>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Content>
                </div>
                <Footer style={{textAlign: "center"}}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
            </Layout>
        );
    }

    history.push("/login")
    return "error";

}

export default ProductDetailsPage;
