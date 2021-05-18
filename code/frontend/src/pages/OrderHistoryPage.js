import React, {useEffect} from "react";
import {Col, Layout, Row, Space, Table, Input} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {useHandleOrders} from "../hooks/OrderHooks";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";

const {Content} = Layout;
const {Column} = Table;
const {Search} = Input;

const OrderHistoryPage = () => {
    const {authStore: {userRole}} = useStores();
    const [handleFilterOrders, handleCancelOrder, {orders, filtering}] = useHandleOrders();

    useEffect(() => {
        handleFilterOrders();
    }, []);

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
                                }
                            />
                            <Column title="Start Date" dataIndex="start_date"/>
                            <Column title="End Date" dataIndex="end_date"/>
                            <Column title="Description" dataIndex="description"/>
                            <Column title="Status" dataIndex="status"/>
                            {(userRole === USER_ROLE.STAFF || userRole === USER_ROLE.CUSTOMER) &&
                             <Column title="Action" key="action" render={(text, record) => (
                                <Space size="middle">
                                    {userRole === USER_ROLE.STAFF && <a>Edit</a>}
                                    {record.status !== "Cancelled" &&
                                        <a onClick={() => handleCancelOrder(record.id)}>
                                            Withdraw
                                        </a>
                                    }
                                </Space>
                            )}/>}
                        </Table>
                    </Content>
                </Layout>
            </Layout>
        </>

    );
};

export default OrderHistoryPage;
