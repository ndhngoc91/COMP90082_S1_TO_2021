import React from "react";
import {
    Button, Layout, Col, Row, Space, Steps, Divider, Result
} from "antd";
import NavigatorBar from "../../components/NavigationBar/NavigationBar";
import CheckoutProgressBar from "../../components/CheckoutProgressBar/CheckoutProgressBar";
import {useStores} from "../../stores";
import {useFinishPageStyles} from "./styles";
import {observer} from "mobx-react-lite";
import * as pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {exportReceipt} from "../../utils/ReceiptExporter";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const {Content} = Layout;

const FinishPage = observer(() => {
    const {
        authStore: {firstName, lastName},
        shoppingCartStore: {cartItems, totalCost}
    } = useStores();

    const printReceipt = () => {
        exportReceipt({
            customerName: `${firstName} ${lastName}`,
            cartItems: cartItems,
            totalCost: totalCost
        });
    };

    const {fullWidthCls} = useFinishPageStyles();

    return <Layout style={{minHeight: "100vh"}}>
        <NavigatorBar/>
        <Layout>
            <Content style={{padding: "3em", backgroundColor: "#FFFFFF"}}>
                <Row justify="space-between" gutter={80}>
                    <Col span={18}>
                        <CheckoutProgressBar current={2}/>
                        <Divider/>
                        <Result status="success"
                                title="Successfully Ordered!"
                                subTitle="Order number: 2017182818828182881."/>
                    </Col>
                    <Col span={6}>
                        <Space direction="vertical" className={fullWidthCls}>
                            <Button className={fullWidthCls} type="primary" size="large"
                                    onClick={printReceipt}>
                                Print Receipt
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Content>
        </Layout>
    </Layout>;
});

export default FinishPage;
