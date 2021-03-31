import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {Button, Col, Layout, Row, Spin, Table, Tag, Typography} from "antd";
import NavigationBar from "../components/NavigationBar";
import {useRecentOrders} from "../hooks/OrderHooks";

const {Content, Footer} = Layout;
const {Title} = Typography;

/**
 * HistoryPage is the component that contains the order history table.
 * It is the component that is rendered when the "Order History" button
 * is clicked on the top navigation bar.
 *
 * It is also responsible for being able to view a specific order.
 * When a "View Order" button is clicked in the "Manage" column of the table,
 * it redirects to and renders the "OrderDetailsPage" page for that specific order.
 *
 */
const HistoryPage = () => {
    const [orderId, setOrderId] = useState(null);    // The ID of the order to be viewed
    const [redirect, setRedirect] = useState(false); // Whether to redirect to view a specific order

    const history = useHistory();

    const [recentOrders, {loading}] = useRecentOrders();

    /**
     * Handles the click of the "View Order" button in a row
     * of the order history table. Sets the order ID, and
     * faciliates redirection to the corresponding order details page
     * @param {number} id order ID
     */
    const handleViewOrder = (id) => {
        setOrderId(id);
        setRedirect(true);
    }

    // Order history table columns
    const columns = [
        {
            title: "Order ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Total Products",
            dataIndex: "lines",
            key: "totalProducts",
            render: (lines) => lines.length
        },
        {
            title: "Date",
            dataIndex: "createdOnDate",
            key: "createdOnDate",
            render: (date) => {
                return new Date(date).toLocaleString("en-AU", {timeZone: "Australia/Melbourne"});
            }
        },
        {
            title: "Billing Contact",
            dataIndex: "billingContact",
            key: "billingContact"
        },
        {
            title: "Order Total (Ex GST)",
            dataIndex: "lines",
            key: "total",
            align: "right",
            render: (lines) => {
                const total = lines.reduce((acc, cur) => acc + cur.totalPrice, 0);
                return `\$${total.toFixed(2)}`;
            }
        },
        {
            title: "Status",
            dataIndex: "billStatus",
            key: "billStatus",
            align: "center",
            render: (status) => <Tag color="green">{status}</Tag>
        },
        {
            title: "Manage",
            align: "center",
            dataIndex: "id",
            key: "manage",
            render: (id) => <Button type="link" onClick={() => handleViewOrder(id)}>View Order</Button>
        }
    ]

    // If the user has chosen to view a specific order, redirect them
    // to the OrderDetailsPage, passing the specific order as props to the page
    if (redirect) {
        let pathname = `/orders/${orderId}`;
        console.log(`Trying to redirect to ${pathname}`);
        const order = recentOrders.find(order => order.id === orderId);
        return (
            <Redirect
                to={{
                    pathname: pathname,
                    state: {order: order}
                }}
            />
        );
    }

    // Check if authenticated before rendering the page
    if (!sessionStorage.getItem("user")) {
        history.push("/login");
    }

    // Otherwise, just render the order history table
    return (
        <Layout style={{minHeight: "100vh"}}>
            {/* Top navigation bar */}
            <NavigationBar defaultSelected="/history"/>

            {/* Content body */}
            <Content style={{padding: "90px 16px"}}>
                <Row justify="center">
                    <Col span={18}>
                        <Title level={4}>Recent Orders</Title>
                        {loading && <Spin/>}
                        <Table dataSource={recentOrders} columns={columns} rowKey={(row) => row.id}/>
                    </Col>
                </Row>
            </Content>

            {/* Footer */}
            <Footer style={{textAlign: "center"}}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
        </Layout>
    );
}

export default HistoryPage;
