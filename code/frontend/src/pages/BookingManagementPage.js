import React from "react";
import {Layout, Space, Table, Tag} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const {Content} = Layout;
const {Column} = Table;

const BookingManagementPage = () => {
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    return (
        <>
            <Layout style={{minHeight: "100vh"}}>
                <NavigationBar/>
                <Layout style={{height: "100%"}}>
                    <Content>
                        <Table dataSource={data}>
                            <Column title="Booking Ref" dataIndex="name" key="name"/>
                            <Column title="Package" dataIndex="age" key="age"/>
                            <Column title="Address" dataIndex="address" key="address"/>
                            <Column title="Tags" dataIndex="tags" key="tags" render={tags => (
                                <>
                                    {tags.map(tag => {
                                        let color = tag.length > 5 ? 'geekblue' : 'green';
                                        if (tag === 'loser') {
                                            color = 'volcano';
                                        }
                                        return (
                                            <Tag color={color} key={tag}>
                                                {tag.toUpperCase()}
                                            </Tag>
                                        );
                                    })}
                                </>)}/>
                            <Column title="Action" key="action" render={(text, record) => (
                                <Space size="middle">
                                    <a>Invite {record.name}</a>
                                    <a>Delete</a>
                                </Space>
                            )}/>
                        </Table>
                    </Content>
                </Layout>
            </Layout>
        </>

    );
};

export default BookingManagementPage;
