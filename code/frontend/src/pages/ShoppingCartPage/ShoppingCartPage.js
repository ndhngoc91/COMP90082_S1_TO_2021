import React from "react";
import {
    Button,
    Col,
    Descriptions,
    Divider,
    Image,
    Layout,
    Row,
    Space,
    Typography,
    DatePicker,
    Tag,
    notification
} from "antd";
import NavigatorBar from "../../components/NavigationBar/NavigationBar";
import {BrowserRouter, useHistory} from "react-router-dom";
import bikePhoto from "../../assets/packages/Ski Packages/Performance Package.png";
import {useStores} from "../../stores";
import {useShoppingCartPageStyles} from "./styles";
import {observer} from "mobx-react-lite";

const {Content} = Layout;
const {Title} = Typography;
const {RangePicker} = DatePicker;

const ShoppingCartPage = observer(() => {
    const history = useHistory();

    const {shoppingCartStore: {totalCost, cartItems, deleteCartItem}} = useStores();

    const {tagCls, fullWidthCls} = useShoppingCartPageStyles();

    return <Layout style={{minHeight: "100vh"}}>
        <NavigatorBar/>
        <BrowserRouter>
            <Layout>
                <Content style={{padding: "3em", backgroundColor: "#FFFFFF"}}>
                    <Row justify="space-between" gutter={80}>
                        <Col span={18}>
                            <Title level={2}>Shopping Cart</Title>
                            <Divider/>
                            <RangePicker renderExtraFooter={() => 'extra footer'} showTime/>
                            <Divider/>
                            {cartItems.map((cartItem, key) => {
                                return <div key={key}>
                                    <Row gutter={16}>
                                        <Col span={4}>
                                            <Image className={fullWidthCls} src={bikePhoto} preview={false}/>
                                        </Col>
                                        <Col span={16}>
                                            <Title level={3}>{cartItem.name}</Title>
                                            <Descriptions>
                                                <Descriptions.Item span={3}>
                                                    {cartItem.name}
                                                </Descriptions.Item>
                                            </Descriptions>
                                            <Title level={3}>Trail Type: {cartItem.trailTypeId}</Title>
                                            <Descriptions>
                                                <Descriptions.Item span={3}>
                                                    <Tag className={tagCls}
                                                         color="blue">{cartItem.quantity} item(s)</Tag>
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </Col>
                                        <Col span={2}>
                                            <Title level={1}>{cartItem.cost}$</Title>
                                        </Col>
                                        <Col span={2}>
                                            <Button size="large" onClick={() => deleteCartItem(cartItem.id)}>
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Divider/>
                                </div>
                            })}
                            <Row gutter={16}>
                                <Col span={4}>
                                </Col>
                                <Col span={16}>
                                </Col>
                                <Col span={4}>
                                    <Tag className={tagCls} color="green">
                                        Total Price: {totalCost}$
                                    </Tag>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={6}>
                            <Space direction="vertical" className={fullWidthCls}>
                                <Button className={fullWidthCls} type="primary" size="large" onClick={() => {
                                    notification.success({message: `Checking out: ${JSON.stringify(cartItems)}`});
                                }}>
                                    Proceed to checkout
                                </Button>
                                <Button className={fullWidthCls} size="large" onClick={() => {
                                    history.push("/packages");
                                }}>Continue booking</Button>
                            </Space>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </BrowserRouter>
    </Layout>;
});

export default ShoppingCartPage;
