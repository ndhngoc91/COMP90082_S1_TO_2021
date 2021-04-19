import React from "react";
import {
    Button,
    Col,
    Layout,
    notification,
    PageHeader,
    Row,
    Spin,
    Statistic,
} from "antd";

const {Content, Footer} = Layout;
import {ShoppingCartOutlined} from "@ant-design/icons";
import HistoryProduct from "../components/HistoryProduct";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {useHistory, useLocation} from "react-router-dom";
import {useProducts} from "../hooks/ProductHooks";
import {useStores} from "../stores";
import PageFooter from "../components/PageFooter/PageFooter";


const OrderDetailsPage = () => {
    const location = useLocation();
    const history = useHistory();

    const order = location.state.order;
    const {lines} = order;
    const totalPrice = lines.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const {cartStore: {readdOrders}} = useStores();

    // When viewing a past order, we first retrieve the product data
    // for each product in the order. This information is needed to
    // be able to readd the entire order, or invividual products, back
    // to the cart
    const [products, {loading}] = useProducts(...lines);

    // Button to readd entire order to cart
    const readdButton = (
        <Button
            icon={<ShoppingCartOutlined/>}
            type="primary"
            onClick={() => handleClick()}
        >
            Add Order To Cart
        </Button>
    )

    // Handles click of readd button
    const handleClick = () => {
        readdOrders(products);
        notification.success({
            message: "Order was successfully readded to the cart",
            placement: "topRight"
        });
    }

    return (
        <Layout style={{minHeight: "100vh"}}>

            {/* Top navigation bar */}
            <NavigationBar history={history} defaultSelected={null}/>

            {/* Content body */}
            <Content style={{padding: "80px 16px"}}>
                <Row justify="center">
                    <Col span={18}>
                        <PageHeader style={{
                            borderRadius: "1.25rem",
                            boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                            marginBottom: 32
                        }}
                                    title={`Order ID: ${order.id}`}
                                    ghost={false}
                                    onBack={() => history.push("/history")}
                                    extra={readdButton}>
                            <Statistic
                                title="Total Price (Ex GST)"
                                prefix="$"
                                value={totalPrice}
                                precision={2}
                                style={{
                                    margin: "0 32px",
                                }}
                            />
                        </PageHeader>
                        {!loading && products.map(product => <HistoryProduct key={product.id} product={product}/>)}
                    </Col>
                </Row>
                {loading &&
                <Row style={{marginTop: 16}} justify="center" align="middle">
                    <Spin size="large"/>
                </Row>}
            </Content>

            <Footer><PageFooter/></Footer>
        </Layout>
    );
}

export default OrderDetailsPage;
