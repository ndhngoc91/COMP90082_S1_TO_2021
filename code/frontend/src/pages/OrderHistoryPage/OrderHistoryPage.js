import React, {useEffect} from "react";
import {Col, Layout, Row, Space, Table, Input, notification, Typography, Button, Tag} from "antd";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import {useHandleOrders, useHandleRetrieveOrderWithDetails} from "../../hooks/OrderHooks";
import {useStores} from "../../stores";
import {USER_ROLE} from "../../consts/UserRole";
import {OrderStatus} from "../../consts/OrderStatus";
import {useOrderHistoryPageStyles} from "./styles";
import {observer} from "mobx-react-lite";
import {ContainerOutlined} from "@ant-design/icons";

const {Content} = Layout;
const {Column} = Table;
const {Search} = Input;
const {Link, Text} = Typography;

const OrderHistoryPage = observer(() => {
    const {authStore: {userRole}, hiringEquipmentRegister: {order, pickupOrder}} = useStores();
    const [handleFilterOrders, handleCancelOrder, {orders, filtering}] = useHandleOrders();

    useEffect(() => {
        handleFilterOrders();
    }, []);

    const [handleRetrieveOrderWithDetails, {orderWithDetails}] = useHandleRetrieveOrderWithDetails();

    useEffect(() => {
        if (orderWithDetails) {
            const recipientMap = {};
            orderWithDetails.details.forEach(detail => {
                const recipientId = detail["recipient_id"];
                const recipient = detail["recipient"];

                const productGroups = [];
                detail["product_groups"].map(productGroup => {
                    productGroups.push({
                        id: productGroup["id"],
                        name: productGroup["name"]
                    });
                });

                recipientMap[recipientId] = {
                    productGroups: productGroups,
                    selectedProducts: [],
                    recipient: recipient
                }
            });
            pickupOrder(orderWithDetails, recipientMap);
            notification.info({message: `Selected ${orderWithDetails["order"]["id"]}`, placement: "bottomRight"});
        }
    }, [orderWithDetails])

    const {menuBarCls} = useOrderHistoryPageStyles();

    return (
        <>
            <Layout style={{minHeight: "100vh"}}>
                <NavigationBar/>
                <Layout style={{height: "100%"}}>
                    <Row className={menuBarCls} justify="space-between">
                        <Col span={8}>
                            <Search placeholder="Search for orders"
                                    allowClear
                                    enterButton="Search"
                                    loading={filtering}
                                    size="large" onSearch={value => handleFilterOrders(value)}/>
                        </Col>
                        <Link href="/product-management">
                            <Button icon={<ContainerOutlined/>} type="link" size="large">
                                Go Handling {order.order.id}
                            </Button>
                        </Link>
                    </Row>
                    <Content>
                        <Table dataSource={orders} loading={filtering}>
                            <Column title="Order ID" dataIndex="id"/>
                            <Column title="Customer Name"
                                    dataIndex="customer_first_name"
                                    render={(text, record) =>
                                        <Text strong>{record.customer_last_name}, {text}</Text>
                                    }/>
                            <Column title="Start Date" dataIndex="start_date"/>
                            <Column title="End Date" dataIndex="end_date"/>
                            <Column title="Description" dataIndex="description"/>
                            <Column title="Status" dataIndex="status"
                                    render={value => <Tag color={value === "New" || value === "Done" ? "green" : "red"}
                                                          style={{fontSize: "1em"}}>{value}</Tag>}/>
                            <Column title="Cancel" key="action" render={(value, order) => {
                                return <Space size="middle">
                                    {order.status !== OrderStatus.CANCELLED ?
                                        <Button onClick={() => handleCancelOrder(order.id)} size="large">
                                            Cancel
                                        </Button> : "---"}
                                </Space>;
                            }}/>
                            {userRole === USER_ROLE.STAFF &&
                            <Column title="Handle" key="action" render={(value, order) => {
                                return <Space size="middle">
                                    {order.status === OrderStatus.NEW ?
                                        <Button type="primary" onClick={() => handleRetrieveOrderWithDetails(order.id)}
                                                size="large">
                                            Handle
                                        </Button> : "---"}
                                </Space>;
                            }}/>}
                        </Table>
                    </Content>
                </Layout>
            </Layout>
        </>

    );
});

export default OrderHistoryPage;
