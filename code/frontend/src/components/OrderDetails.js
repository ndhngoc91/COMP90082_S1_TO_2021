import React, {useState, useEffect} from "react";
import axios from "axios";
import {
    Button,
    Col,
    notification,
    PageHeader,
    Row,
    Spin,
    Statistic,
} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import HistoryProduct from "./HistoryProduct";
import {useStores} from "../stores";


const OrderDetails = ({order, onBack}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const {lines} = order;
    const totalPrice = lines.reduce((acc, cur) => acc + cur.totalPrice, 0);

    const {cartStore: {readdOrders}} = useStores();

    // When viewing a past order, we first retrieve the product data
    // for each product in the order. This information is needed to
    // be able to readd the entire order, or invividual products, back
    // to the cart
    useEffect(() => {
        const fetchProduct = async (line) => {
            const {productCode} = line;
            const response = await axios.get(`http://127.0.0.1:8000/products/${productCode}`, {
                headers: {"Content-Type": "application/JSON; charset=UTF-8"}
            });
            console.log(response);
            const product = {...response.data.data, ...line};
            setProducts(prev => [...prev, product]);
        }

        (async () => {
            await Promise.all(lines.map(line => fetchProduct(line)));
            setLoading(false);
        })();

    }, []);


    // Button to readd entire order to cart
    const readdButton = (
        <Button
            icon={<ShoppingCartOutlined/>}
            type="primary"
            onClick={() => handleClick()}
        >
            Add Order To Cart
        </Button>
    );

    // Handles click of readd button
    const handleClick = () => {
        readdOrders(products);
        notification.success({
            message: "Order was successfully readded to the cart",
            placement: "topLeft"
        });
    };

    return (
        <>
            <Row justify="center">
                <Col span={18}>
                    <PageHeader
                        style={{
                            borderRadius: "1.25rem",
                            boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                            marginBottom: 32
                        }}
                        title={`Order ID: ${order.id}`}
                        ghost={false}
                        onBack={() => onBack()}
                        extra={readdButton}
                    >
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
        </>
    )
}

export default OrderDetails;
