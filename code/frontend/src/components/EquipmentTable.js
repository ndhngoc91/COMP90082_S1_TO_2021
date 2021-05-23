import React from "react";
import {Table, Space, InputNumber} from 'antd';

const columns = [
    {
        title: 'Picture',
        dataIndex: 'picture',
        key: 'picture',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (text, record) => (
            <InputNumber min={1} max={10} defaultValue={record.quantity} onChange={console.log}/>
        )
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Delete</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'Helmet',
        size: 'S',
        quantity: 1
    },
    {
        key: '2',
        name: 'Ski board',
        size: 'M',
        quantity: 2
    },
    {
        key: '3',
        name: 'Goggles',
        size: 'L',
        quantity: 1
    },
];

const EquipmentTable = () => {
    return (
        <Table columns={columns} dataSource={data}/>
    );
};

export default EquipmentTable;
