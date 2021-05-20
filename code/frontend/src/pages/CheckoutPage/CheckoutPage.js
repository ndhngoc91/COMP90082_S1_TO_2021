import React, {useState} from "react";
import {
    Button, Layout, Col, Row, Space, Table, Steps, Divider, Tag, Modal, notification
} from "antd";
import NavigatorBar from "../../components/NavigationBar/NavigationBar";
import {useHistory} from "react-router-dom";
import {useStores} from "../../stores";
import {useCheckoutPageStyles} from "./styles";
import {observer} from "mobx-react-lite";
import RecipientForm from "../../components/RecipientForms/RecipientForm";

const {Content} = Layout;
const {Step} = Steps;
const {Column} = Table;

const CheckoutPage = observer(() => {
    const [isRecipientFormVisible, setIsRecipientFormVisible] = useState(false);
    const [selectedCartItemId, setSelectedCartItemId] = useState(-1);

    const history = useHistory();

    const {
        shoppingCartStore: {cartItems, recipients, ableToCheckout}
    } = useStores();

    const onCheckoutButtonClick = () => {
        if (ableToCheckout) {
            history.push("/finish");
        } else {
            notification.error({message: "Please input enough recipients!"});
        }
    };

    const {fullWidthCls} = useCheckoutPageStyles();

    return <Layout style={{minHeight: "100vh"}}>
        <NavigatorBar/>
        <Layout>
            <Content style={{padding: "3em", backgroundColor: "#FFFFFF"}}>
                <Row justify="space-between" gutter={80}>
                    <Col span={18}>
                        <Steps progressDot current={1}>
                            <Step title="Booking"/>
                            <Step title="Input Contacts"/>
                            <Step title="Done"/>
                        </Steps>
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
                            <Button className={fullWidthCls} type="primary" size="large"
                                    onClick={onCheckoutButtonClick}>
                                Checkout
                            </Button>
                            <Button className={fullWidthCls} size="large" onClick={() => {
                                history.goBack();
                            }}>
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
