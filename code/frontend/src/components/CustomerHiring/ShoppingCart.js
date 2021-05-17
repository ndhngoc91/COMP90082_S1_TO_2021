import React, {useEffect, useState }  from 'react';
import { DatePicker, Row, Col, Alert, Button, Table, Form, Input, Select } from "antd";


const ShoppingCart = (props) => {


    const loadingOrders = props.loadingOrders;
    const setLoadingOrders = props.setLoadingOrders;
    const packagesItem = props.packagesItem;
    const setOrders = props.setOrders;
    const orders = props.orders;
    const message = props.message;
    const setPackageItem = props.setPackageItem;
    const selectedCategory = props.selectedCategory;
    const dates = props.dates;


    useEffect(() => {
        
        if (loadingOrders){  
            setOrders(generateOrder(packagesItem)); 
            setLoadingOrders(false);
        }
    }, [loadingOrders])


     // Generate order based on package item, add customer info and selected extra for each order
     const generateOrder = (packagesItem) => {
        var n = 1;

        var orders = [];
        for (let i = 0; i < packagesItem.length; i++ ){
            let p = packagesItem[i];
            for (let j = 0; j < p.Quantity; j ++){
                orders[n - 1] = {'package_id':p.PackageId, 'key': n, 'Name': p.Name, 'Type': p.Type, 'Package Price': p.Price, 'AgeGroup': p.Age, 'Extras': p.Extras, 'customerInfo': '', selectedExtras: []};
                n ++ ;
            }    
        }
        return orders;
    };


    const handleDelete = (key) => {

        var newOrders = [];
        var newPackagesItem = [];
        for (var i = 0; i < orders.length; i++){
            if (orders[i].key !== key){
                newOrders.push(orders[i]);
            }
        }
        setOrders(newOrders);
       
    }

    const columns2 = [
        { title: 'Package No.', dataIndex: 'key', key: 'no.' },
        { title: 'Package Name', dataIndex: 'Name', key: 'name' },
        { title: 'Type name', dataIndex: 'Type', key: 'type' },
        { title: 'Package Price', dataIndex: 'Package Price', key: 'price' },
        { title: 'Age group', dataIndex: 'AgeGroup', key: 'age' },
        {
            title: 'Action',
            dataIndex: 'operation',
            render: (_, record) => {
                return <Button onClick={e => handleDelete(record.key)}>Delete</Button>
                },
          },
    ];
    // For customer info, change one of their information
    const changeInfo = (key, val, customerInfo) => {

        if(key == 'firstName') {
            return { 'firstName': val, 'lastName': customerInfo.lastName, 'dob':customerInfo.dob, 
                     'skierLevel': customerInfo.skierLevel, 'height': customerInfo.height, 
                     'weight': customerInfo.weight, 'shoeSize': customerInfo.shoeSize, 
                     'tyreSize':customerInfo.tyreSize }
        }
        if(key == 'lastName') {
            return { 'firstName': customerInfo.firstName, 'lastName': val, 'dob':customerInfo.dob, 
                     'skierLevel': customerInfo.skierLevel, 'height': customerInfo.height, 
                     'weight': customerInfo.weight, 'shoeSize': customerInfo.shoeSize, 
                     'tyreSize':customerInfo.tyreSize }
        }
        if(key == 'dob') {
            return { 'firstName': customerInfo.firstName, 'lastName': customerInfo.lastName, 'dob': val, 
                     'skierLevel': customerInfo.skierLevel, 'height': customerInfo.height, 
                     'weight': customerInfo.weight, 'shoeSize': customerInfo.shoeSize, 
                     'tyreSize':customerInfo.tyreSize }
        }
        if(key == 'skierLevel') {
            return { 'firstName': customerInfo.firstName, 'lastName': customerInfo.lastName, 'dob':customerInfo.dob, 
                     'skierLevel': val, 'height': customerInfo.height, 'weight': customerInfo.weight, 
                     'shoeSize': customerInfo.shoeSize, 'tyreSize':customerInfo.tyreSize }
        }
        if(key == 'height') {
            return { 'firstName': customerInfo.firstName, 'lastName': customerInfo.lastName, 'dob':customerInfo.dob, 
                     'skierLevel': customerInfo.skierLevel, 'height': val, 'weight': customerInfo.weight, 
                     'shoeSize': customerInfo.shoeSize, 'tyreSize':customerInfo.tyreSize }
        }
        if(key == 'weight') {
            return { 'firstName': customerInfo.firstName, 'lastName': customerInfo.lastName, 'dob':customerInfo.dob, 
                     'skierLevel': customerInfo.skierLevel, 'height': customerInfo.height, 
                     'weight': val, 'shoeSize': customerInfo.shoeSize, 'tyreSize':customerInfo.tyreSize }
        }
        if(key == 'shoeSize') {
            return { 'firstName': customerInfo.firstName, 'lastName': customerInfo.lastName, 'dob':customerInfo.dob, 
                     'skierLevel': customerInfo.skierLevel, 'height': customerInfo.height, 
                     'weight': customerInfo.weight, 'shoeSize': val, 'tyreSize':customerInfo.tyreSize }
        }
        if(key == 'tyreSize') {
            return { 'firstName': customerInfo.firstName, 'lastName': customerInfo.lastName, 'dob':customerInfo.dob, 
                     'skierLevel': customerInfo.skierLevel, 'height': customerInfo.height, 
                     'weight': customerInfo.weight, 'shoeSize': customerInfo.shoeSize, 'tyreSize': val}
        }
    }

   


    // Include customer information & selected extras
    const extandCart = (record) => {

        const extrasCol = [
            { title: 'Extra Name', dataIndex: 'extra_name', key: 'name' },
            { title: 'Extra Price', dataIndex: 'extra_price', key: 'price' },
        ];

        const extra = record.Extras;


        for (var i = 0; i < extra.length; i++){
            extra[i].key = extra[i].extra_id;
        }

        record.category_id = selectedCategory;
        record.start_date = dates[0].format('YYYY-MM-DD');
        record.end_date = dates[1].format('YYYY-MM-DD');
        record.user_id = record.key;

       

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                record.selectedExtras  = selectedRows;
                record.selected_extra_id = selectedRowKeys;
            },
            hideSelectAll: true
          };


        return (

        <Col span={18} offset={4}>

            <Form layout="vertical">
                <Row>
                    <Col span={10}>
                        <Form.Item name={`firstname ${record.key}`} label="First Name"  rules={[{ required: true,},]}>
                            <Input placeholder="Please input your first name" onChange={e => record.customerInfo = changeInfo('firstName', e.target.value, record.customerInfo)} />
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item name={`lastname${record.key}`} label="Last Name" rules={[{ required: true,},]}>
                            <Input placeholder="Please input your last name" onChange={e =>  record.customerInfo = changeInfo('lastName', e.target.value, record.customerInfo)}/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={10}>
                        <Form.Item name={`dob${record.key}`} label="DOB" rules={[{ required: true,},]}>
                            <DatePicker  onChange={ (date, val) => {
                                                    record.customerInfo = changeInfo('dob', val, record.customerInfo);
                                                     }} />
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item name={`skierlevel${record.key}`} label="Skier Level (Req for Snow Hire Only)">
                            <Select placeholder="Select a option" initialvalues="|" 
                                    onChange={val => record.customerInfo = changeInfo('skierLevel', val, record.customerInfo)}>
                                <Select.Option value="|"> Cautious | </Select.Option>
                                <Select.Option value="||"> Moderate || </Select.Option>
                                <Select.Option value="|||"> Aggressive ||| </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={10}>
                        <Form.Item name={`height${record.key}`} label="Height - cm (Req for Snow Hire Only))">
                            <Select placeholder="Select a option" 
                                    onChange={val => record.customerInfo = changeInfo('height', val, record.customerInfo)}>
                                <Select.Option value="less or equal 148cm"> less or equal 148cm </Select.Option>
                                <Select.Option value="149 - 157 cm"> 149 - 157 cm </Select.Option>
                                <Select.Option value="158 - 166 cm"> 158 - 166 cm </Select.Option>
                                <Select.Option value="167 - 178 cm"> 167 - 178 cm </Select.Option>
                                <Select.Option value="179 - 194 cm"> 179 - 194 cm </Select.Option>
                                <Select.Option value="more than 195 cm"> more than 195 cm </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item name={`weight${record.key}`} label="Weight - kg (Req for Snow Hire Only))">
                            <Select placeholder="Select a option" 
                                    onChange={val => record.customerInfo = changeInfo('weight', val, record.customerInfo)}>
                                <Select.Option value="10-13kg"> 10-13kg </Select.Option>
                                <Select.Option value="14-17kg"> 14-17kg </Select.Option>
                                <Select.Option value="18-21kg"> 18-21kg </Select.Option>
                                <Select.Option value="22-25kg"> 22-25kg </Select.Option>
                                <Select.Option value="26-30kg"> 26-30kg </Select.Option>
                                <Select.Option value="31-35k"> 31-35kg </Select.Option>
                                <Select.Option value="36-41kg"> 36-41kg </Select.Option>
                                <Select.Option value="42-48kg"> 42-48kg </Select.Option>
                                <Select.Option value="49-57kg"> 49-57kg </Select.Option>
                                <Select.Option value="58-66kg"> 58-66kg </Select.Option>
                                <Select.Option value="67-78kg"> 67-78kg </Select.Option>
                                <Select.Option value="79-94kg"> 79-94kg </Select.Option>
                                <Select.Option value="95+kg"> 95+kg </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item name={`shoesize${record.key}`} label="Shoe Size - US (Req for Snow Hire Only)">
                            <Input placeholder="Please input your shoe size" 
                                   onChange={e => record.customerInfo = changeInfo('shoeSize', e.target.value, record.customerInfo)}/>
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item name={`tyresize${record.key}`} label="Tyre Size eg 215/65/15 (for Chain Hire)">
                            <Input placeholder="Please input your tyre size" 
                                   onChange={e => record.customerInfo = changeInfo('tyreSize', e.target.value, record.customerInfo)}/>
                        </Form.Item>
                    </Col>
                    
                </Row>                    
            </Form> 
            <Table dataSource={extra} rowSelection={rowSelection} columns={extrasCol} pagination={false}/>
        </Col>
        
    )}

   


    return (
        <Col span={24} className="step1-content">
                    {orders.length !== 0 ? 
                   
                    <Table  columns={columns2} 
                            dataSource={orders}
                            pagination={false}
                            expandable={{
                                expandedRowRender: record => extandCart(record)
                            }}>
                    </Table>

                    : "No Order"}

                    
                    <Alert message={message}/>
                    
                    
                    
                
            </Col>
    )
}


export default ShoppingCart;