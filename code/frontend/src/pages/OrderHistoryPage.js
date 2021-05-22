import React, {useEffect} from "react";
import {Col, Layout, Row, Space, Table, Input} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {useHandleOrders, useHandleRetrieveOrderWithDetails} from "../hooks/OrderHooks";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";
import {OrderStatus} from "../consts/OrderStatus";

const {Content} = Layout;
const {Column} = Table;
const {Search} = Input;

const OrderHistoryPage = () => {
    const {authStore: {userRole}, hiringEquipmentRegister: {pickupOrder}} = useStores();
    const [handleFilterOrders, handleCancelOrder, {orders, filtering}] = useHandleOrders();

    useEffect(() => {
        handleFilterOrders();
    }, []);

    const [handleRetrieveOrderWithDetails, {orderWithDetails}] = useHandleRetrieveOrderWithDetails();

    useEffect(() => {
        if (orderWithDetails) {
            pickupOrder(orderWithDetails);
        }
    }, [orderWithDetails])

    return (
        <>
            <Layout style={{minHeight: "100vh"}}>
                <NavigationBar/>
                <Layout style={{height: "100%"}}>
                    <Row style={{margin: "2em 0"}} gutter={{lg: 24}}>
                        <Col lg={8}>
                            <Search placeholder="Search for orders"
                                    allowClear
                                    enterButton="Search"
                                    loading={filtering}
                                    size="large" onSearch={value => handleFilterOrders(value)}/>
                        </Col>
                    </Row>
                    <Content>
                        <Table dataSource={orders} loading={filtering}>
                            <Column title="Order ID" dataIndex="id"/>
                            <Column title="Customer Name"
                                    dataIndex="customer_first_name"
                                    render={(text, record) =>
                                        <span>{record.customer_last_name}, {text}</span>
                                    }/>
                            <Column title="Start Date" dataIndex="start_date"/>
                            <Column title="End Date" dataIndex="end_date"/>
                            <Column title="Description" dataIndex="description"/>
                            <Column title="Status" dataIndex="status"/>
                            <Column title="Cancel" key="action" render={(value, order) => {
                                return <Space size="middle">
                                    {order.status !== OrderStatus.CANCELLED ?
                                        <a onClick={() => handleCancelOrder(order.id)}>
                                            Cancel
                                        </a> : '---'}
                                </Space>;
                            }}/>
                            {userRole === USER_ROLE.STAFF &&
                            <Column title="Pick up" key="action" render={(value, order) => {
                                return <Space size="middle">
                                    {order.status === OrderStatus.NEW ?
                                        <a onClick={() => handleRetrieveOrderWithDetails(order.id)}>
                                            Pick Up
                                        </a> : '---'}
                                </Space>;
                            }}/>}
                        </Table>
                    </Content>
                </Layout>
            </Layout>
        </>

    );
};

export default OrderHistoryPage;
