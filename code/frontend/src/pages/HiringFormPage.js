import React, {useEffect, useState }  from 'react'
import HiringForm from '../components/HiringForm';
import styled from 'styled-components';
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { DatePicker, InputNumber, Row, Col, Alert, Layout, Space, Steps, Button, Radio, Image, Table, Form, Input, Select } from "antd";
const { Content } = Layout;
const { Step } = Steps;
const { RangePicker } = DatePicker;
import "../assets/css/booking.css";
import { useCategories } from "../hooks/CategoryHooks";
import { handlePackages} from "../hooks/PackageHooks";
import { set } from 'mobx';

const HiringFormPage = (props) => {
    //console.log(props.location.state);


    // 1. Select rent period
    const [dates, setDates] = useState([]);
    const [value, setValue] = useState();
    const disabledDate = current => {
        if (!dates || dates.length === 0) {
          return false;
        }
       
        const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
        const tooShort = dates[0] && current.diff(dates[0], 'days') < 1;
        return tooEarly || tooLate || tooShort;
      };


    // 2. Select Category
    const categories = useCategories();
    const categoryOnChange = (event) => {
        // if (event.target.checked) {
        //     setSelectedCatogories(oldCategories => [...oldCategories, id]);
        // } else {
        //     setSelectedCatogories(selectedCategories.filter(oldId => oldId !== id)); 
        //
        console.log(event.target.value);
        setSelectedCatogory(event.target.value);
        
    }


    // 3. Select Packages
    const [
        {packages, rentPeriod, selectedCategory, loading },
        setRentPeriod,
        setSelectedCatogory,
        getPackages,
        setLoading
    ] = handlePackages();

    useEffect(() => {
        if (loading) {
            getPackages();
        }
    }, [loading])

    const columns = [
        { title: 'Package Name', dataIndex: 'package_name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
    ];

    const [packagesItem, setPackageItem] = useState([]);


    // Only change the quantity of a package type
    var changeQuantity = (quan, packageItem) => {
        return packageItem = {'PackageId': packageItem.PackageId, 'Name': packageItem.Name,'Type': packageItem.Type, 'Price': packageItem.Price, 'Age':packageItem.Age, 'Quantity': quan,  'Extras': packageItem.Extras};
    }

    // Handle Change on quantity
    const onChange = (id, val, name, type, price, age, extras) => {
        var same = 0;

        setPackageItem(oldPackages => {
           
            for (let i = 0; i < oldPackages.length; i ++){
                if (oldPackages[i].Name === name && oldPackages[i].Type == type){
                    oldPackages[i] = changeQuantity(val, oldPackages[i]);
                    same = 1;
                }
            }
            if (same === 0){
                return [...oldPackages, {'PackageId': id, 'Name': name, 'Type':type, 'Price': price, 'Age': age, 'Quantity':val, 'Extras': extras}]
            }else{
                return oldPackages
            }

        }, []);

    }

    // Shows Package Type and let customer edit the quantity they want
    const extandTable = (record) => {

        let types = record.types;
        
        for (var i = 0; i < types.length; i++){
            types[i].key = types[i].type_id;
        }

        const columns = [
            { title: 'Package Type', dataIndex: 'type_name', key: 'name' },
            
            {
                title: 'Action',
                dataIndex: 'operation',
                render: (_, type) => (

                    <InputNumber min={0} max={10} defaultValue={0} 
                    onChange={val => onChange(record.package_id, val, record.package_name, type.type_name, record.price, record.age_group_id, record.extras)}></InputNumber>

                  ),
              },
        ];
        
        return ( 
        <Col span={18} offset={4}>
            <p>{record.description}</p>
            <Table pagination={false} columns={columns} dataSource={types} expandable = {record => extandTable(record)}/>
        </Col>

    )};


    // 4. Shopping Cart & Extras
    const [loadingOrders, setLoadingOrders] = useState(false);

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
                return <Button onClick={e => console.log(e.target)}>Delete</Button>
                },
          },
    ];

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (loadingOrders){
            setOrders(generateOrder(packagesItem)); 
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

    const validateMessages = {
        required: '${label} is required!',
        // ...
    };


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

            <Form layout="vertical" validateMessages={validateMessages}>
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

                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                   

               
                                
            </Form> 
            <Table dataSource={extra} rowSelection={rowSelection} columns={extrasCol} pagination={false}/>
        </Col>
        
    )}

    const [message, setMessage] = useState("Please fill in First Name / Last Name / Birth Date");
    
    const submitInfo = (orders) => {

        let required = true;

        for (var i = 0; i < orders.length; i++){
            var cus = orders[i].customerInfo;
            if (cus === "" || cus.firstName === undefined || cus.lastName === undefined || cus.dob === undefined ){
                required = false;
                break;
            }
        }

        if (required){
            setMessage("Submit Successful");
        }else{
            setMessage("Please fill in First Name / Last Name / Birth Date");
        }
    }


   
    // All steps content
    const steps = [
        {
          title: 'Select Hiring Range',
          content:
          <div>
              <Col className="step1-content">
                  <Space size={20}>
                    <RangePicker
                        disabledDate={disabledDate}
                        onCalendarChange={val => {
                            setDates(val);
                            }}
                        onChange={val => {
                            setValue(val);
                            setRentPeriod(val[1].diff(val[0], 'days'));
                            }} >
                    </RangePicker>
                    {  (dates[0] != null && dates.length === 2 && dates[1] != null) ? 
                    <Alert message={`Renting Period: ${dates[0].format("YYYY-MM-DD")} - ${dates[1].format("YYYY-MM-DD")} `}/>: 
                    <Alert message={"Selected Dates Please"}></Alert> }
                </Space>
             </Col>
          </div>
            
        },
        {
          title: 'Select Category',
          content: /*<HiringForm selectedCustomer = {props.location.state}/>*/

           

            <Radio.Group layout="horizontal" onChange={e => categoryOnChange(e)}>
                  <Row className="step1-content">
                    {categories.map(category => (
                        
                        <Col key={category.id} span={6}>
                            <Image width={200} src={category.image_url}/>
                            <Radio value={category.id}>{category.name}</Radio>
                        </Col>
                
                    ))}
                 
                </Row>
            </Radio.Group>
          ,         
        },
        {
            title: 'Select Package',
            content: 
            <Col span={24} className="step1-content">
                    {packages.length !== 0 ? 
                    
                        <Table  columns={columns} 
                                dataSource={packages}
                                pagination={false}
                                expandable={{
                                    expandedRowRender: record => extandTable(record)
                                }}>
                        </Table>
                        
                    : "No Package Selected"}
                
            </Col>
        
          },
       
        {
          title: 'Complete Package Information',
          content: 
            <Col span={24} className="step1-content">
                    {packagesItem.length !== 0 ? 
                   
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
        },
      ];

   
  

    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };


   
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <NavigationBar defaultSelected="/hiringForm"/>
            <Content style={{ margin: "90px 16px"}}>
                <Row justify="center">
                    <Col span={18} offset={1}>
                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        
                        </Steps>

                        {/* Each Page Content */}
                        <div>
                            {steps[current].content}
                        </div>

                        {/* Each Page Button */}
                        <div className="steps-action">
                            {current === 0 && (
                            <Button type="primary" onClick={() => next()}>
                                Select Category
                            </Button>
                            )}
                            {current === 1 && (
                            <Button type="primary" onClick={() => { setLoading(true);
                                                                     next()}}>
                                Select Packages
                            </Button>
                            )}

                            {(current === 2) && (
                            <Button type="primary" onClick={() => { setLoadingOrders(true);
                                                                    next()}}>
                                Add to Shopping Cart
                            </Button>
                            )}


                            {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => { console.log(orders);
                                                                    submitInfo(orders)}}>
                                Submit
                            </Button>
                            )}
                            {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                Previous
                            </Button>
                            )}
                        </div>
                        
               
                    </Col>
                </Row>
            </Content>
            
        </Layout>
    );
}

export default HiringFormPage;