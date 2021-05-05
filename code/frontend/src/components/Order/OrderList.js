import { Collapse,  Card, Space, Row, Col, Divider, Drawer} from 'antd';
import React from "react";
import 'antd/dist/antd.css'
import Table from "antd/es/table";
import {SearchOutlined} from "@ant-design/icons";

const { Panel } = Collapse;


const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:   {content}</p>
    </div>
);

class OrderList extends React.Component{
    state ={
        drawVisible:false,
        orderItem:[],
        orders:[
            {
                id: '1',
                name: 'Order 1',
                intro:'1',
                money:'1.1'
            },
            {
                id: '2',
                name: 'Order 2',
                intro:'2',
                money:'2.2'
            },
            {
                id: '3',
                name: 'Order 3',
                intro:'3',
                money:'3.3'
            },
            {
                id: '4',
                name: 'Order 4',
                intro:'4',
                money:'4.4'
            },
            {
                id: '5',
                name: 'Order 5',
                intro:'5',
                money:'5.5'
            },
            {
                id: '6',
                name: 'Order 6',
                intro:'6',
                money:'6.6'
            },
            {
                id: '7',
                name: 'Order 7',
                intro:'7',
                money:'7.7'
            },
            {
                id: '8',
                name: 'Order 8',
                intro:'8',
                money:'8.8'
            },
        ]
    }

    showDrawer = (item) => {
        this.setState({
            drawVisible: true,
            orderItem:item
        });
    };

    onClose = () => {
        this.setState({
            drawVisible: false,
        });
    };

    render() {
        const title = " Order"
        const  data =this.state.orders
        const orderItem = this.state.orderItem
        const columns = [
            {
                title: 'Order Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Intro',
                dataIndex: 'intro',
                key: 'intro',
            },
            {
                title: 'Action',
                key: 'action',
                render: (order) => (
                    <Space size="middle">
                        <a onClick={()=>this.showDrawer(order)} key={order.id}>
                            <SearchOutlined />
                            detail
                        </a>
                    </Space>
                ),
            },
        ];
        return (
            <div>
                <Card title={title}>
                    <Table columns={columns} dataSource={data} />
                </Card>


                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.drawVisible}
                >
                    <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                        Order Detail
                    </p>
                    <p className="site-description-item-profile-p">Personal</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Order Name" content={orderItem.name} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Intro"
                                content={orderItem.intro}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="money" content={orderItem.money} />
                        </Col>
                    </Row>
                    <Divider />
                </Drawer>
            </div>
        )//end return
    }
}

export default OrderList