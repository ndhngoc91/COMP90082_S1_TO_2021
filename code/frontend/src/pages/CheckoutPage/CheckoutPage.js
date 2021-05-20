import React, {useState} from "react";
import {
    Button, Layout, Col, Row, Space, Table, Divider, Tag, Modal, notification
} from "antd";
import NavigatorBar from "../../components/NavigationBar/NavigationBar";
import CheckoutProgressBar from "../../components/CheckoutProgressBar/CheckoutProgressBar";
import {useHistory} from "react-router-dom";
import {useStores} from "../../stores";
import {useCheckoutPageStyles} from "./styles";
import {observer} from "mobx-react-lite";
import RecipientForm from "../../components/RecipientForms/RecipientForm";
import {useHandleAddOrder} from "../../hooks/OrderHooks";

const {Content} = Layout;
const {Column} = Table;

const CheckoutPage = observer(() => {
    const [isRecipientFormVisible, setIsRecipientFormVisible] = useState(false);
    const [selectedCartItemId, setSelectedCartItemId] = useState(-1);

    const [handleAddOrder, {handling}] = useHandleAddOrder();

    const {
        shoppingCartStore: {cartItems, recipients, ableToCheckout, orderPostData, isCheckedOut, checkout}
    } = useStores();

    const history = useHistory();

    if (isCheckedOut) {
        history.push("/finish");
    }

    const onCheckoutButtonClick = () => {
        if (ableToCheckout) {
            handleAddOrder(orderPostData, () => {
                checkout();
                history.push("/finish");
            });
        } else {
            notification.error({message: "Please input enough recipients!"});
        }
    };

    const onGoBackButtonClick = () => {
        history.push("/shopping-cart");
    }

    const {fullWidthCls} = useCheckoutPageStyles();

    return <Layout style={{minHeight: "100vh"}}>
        <NavigatorBar/>
        <Layout>
            <Content style={{padding: "3em", backgroundColor: "#FFFFFF"}}>
                <Row justify="space-between" gutter={80}>
                    <Col span={18}>
                        <CheckoutProgressBar current={1}/>
                        <Divider/>
                        <Table dataSource={cartItems} rowKey={record => {
                            return record["id"];
                        }} pagination={false}>
                            <Column title="Name" dataIndex="name"/>
                            <Column title="Trail Type" render={record => {
                                return record.trailType.name;
                            }}/>
                            <Column title="Extra items" render={record => {
                                return <>
                                    {record.extraItems.map((extraItem, key) => {
                                        if (extraItem.selected) {
                                            return <Tag color="green" key={key}>{extraItem.name}</Tag>
                                        }
                                    })}
                                </>;
                            }}/>
                            <Column title="Action"
                                    render={record => {
                                        const cartItemId = record["id"];
                                        return <Space size="middle">
                                            <a onClick={() => {
                                                setIsRecipientFormVisible(true);
                                                setSelectedCartItemId(cartItemId);
                                            }}>
                                                {recipients[cartItemId] === undefined ? "Add Recipient" : "Edit Recipient"}
                                            </a>
                                        </Space>;
                                    }}/>
                        </Table>
                    </Col>
                    <Col span={6}>
                        <Space direction="vertical" className={fullWidthCls}>
                            <Button className={fullWidthCls} type="primary" size="large" loading={handling}
                                    onClick={onCheckoutButtonClick}>
                                Checkout
                            </Button>
                            <Button className={fullWidthCls} size="large" onClick={onGoBackButtonClick}>
                                Go back
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Content>
        </Layout>
        <Modal title="Add Recipient" visible={isRecipientFormVisible}
               footer={null} closable={false}
               onCancel={() => {
                   setIsRecipientFormVisible(false);
               }}>
            <RecipientForm cartItemId={selectedCartItemId} onClose={() => setIsRecipientFormVisible(false)}/>
        </Modal>
    </Layout>;
});

export default CheckoutPage;
