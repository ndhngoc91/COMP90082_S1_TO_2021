import React, {useEffect, useState }  from 'react'
import HiringForm from '../components/HiringForm';
import styled from 'styled-components';
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { DatePicker, InputNumber, Row, Col, Alert, Layout, Space, Steps, Button, Checkbox, Image, Table, Form, Input, Select } from "antd";
const { Content } = Layout;
const { Step } = Steps;
const { RangePicker } = DatePicker;
import "../assets/css/booking.css";
import moment from 'moment';
import { useCategories } from "../hooks/CategoryHooks";
import { handlePackages} from "../hooks/PackageHooks";
import { RadiusBottomleftOutlined } from '@ant-design/icons';
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
    const categoryOnChange = (event, id) => {
        if (event.target.checked) {
            setSelectedCatogories(oldCategories => [...oldCategories, id]);
        } else {
            setSelectedCatogories(selectedCategories.filter(oldId => oldId !== id));
        }
    }


    // 3. Select Packages
    const [
        {packages, rentPeriod, selectedCategories, loading },
        setRentPeriod,
        setSelectedCatogories,
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


    var changeQuantity = (quan, packageItem) => {
        return packageItem = {'Name': packageItem.Name,'Type': packageItem.Type, 'Price': packageItem.Price, 'Age':packageItem.Age, 'Quantity': quan,  'Extras': packageItem.Extras};
    }


    const onChange = (val, name, type, price, age, extras) => {
        var same = 0;

        setPackageItem(oldPackages => {
           
            for (let i = 0; i < oldPackages.length; i ++){
                if (oldPackages[i].Name === name && oldPackages[i].Type == type){
                    oldPackages[i] = changeQuantity(val, oldPackages[i]);
                    same = 1;
                }
            }

            if (same === 0){
                return [...oldPackages, {'Name': name, 'Type':type, 'Price': price, 'Age': age, 'Quantity':val, 'Extras': extras}]
            }else{
                return oldPackages
            }

        }, []);

    }



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
                    onChange={val => onChange(val, record.package_name, type.type_name, record.price, record.age_group_id, record.extras)}></InputNumber>

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




    const generateOrder = (packagesItem) => {
        var n = 1;

        var orders = [];
        for (let i = 0; i < packagesItem.length; i++ ){
            let p = packagesItem[i];
            for (let j = 0; j < p.Quantity; j ++){
                orders[n - 1] = {'key': n, 'Name': p.Name, 'Type': p.Type, 'Package Price': p.Price, 'AgeGroup': p.Age, 'Extras': p.Extras};
                n ++ ;
            }    
        }
        return orders;
    };







    const extandCart = (record) => {

        console.log(record);
        const extrasCol = [
            { title: 'Extra Name', dataIndex: 'extra_name', key: 'name' },
            { title: 'Extra Price', dataIndex: 'extra_price', key: 'price' },
        ];

        const extra = record.Extras;


        for (var i = 0; i < extra.length; i++){
            extra[i].key = extra[i].extra_id;
        }


        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');

        const [customerInfo, setCustomerInfo] = useState({
                'firstName': firstName, 'lastName': lastName, 'dob':'', 'skierLevel':'', 
                'height':'', 'weight':'', 'shoeSize':'', 'tyreSize':'' });

        record.customerInfo = customerInfo;

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            hideSelectAll: true

          };

        return (

        <Col span={18} offset={4}>

            <Form layout="vertical">
                <Row>
                    <Col span={10}>
                        <Form.Item name="firstname" label="First Name"  required="true">
                            <Input placeholder="Please input your first name" onChange={e => {(
                                                                        setFirstName(e.target.value),
                                                                        console.log(e.target.value) )}} />
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item name="lastname" label="Last Name" required="true">
                            <Input placeholder="Please input your last name" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={10}>
                        <Form.Item name="dob" label="DOB" required="true">
                            <DatePicker/>
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item name="skierlevel" label="Skier Level (Req for Snow Hire Only)">
                            <Select placeholder="Select a option" initialvalues="|">
                                <Select.Option value="|"> Cautious | </Select.Option>
                                <Select.Option value="||"> Moderate || </Select.Option>
                                <Select.Option value="|||"> Aggressive ||| </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={10}>
                        <Form.Item name="height" label="Height - cm (Req for Snow Hire Only))">
                            <Select placeholder="Select a option" initialvalues="|">
                                <Select.Option value="|"> less or equal 148cm </Select.Option>
                                <Select.Option value="||"> 149 - 157 cm </Select.Option>
                                <Select.Option value="|||"> 158 - 166 cm </Select.Option>
                                <Select.Option value="|V"> 167 - 178 cm </Select.Option>
                                <Select.Option value="V"> 179 - 194 cm </Select.Option>
                                <Select.Option value="V|"> more than 195 cm </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item name="weight" label="Weight - kg (Req for Snow Hire Only))">
                            <Select placeholder="Select a option" initialvalues="1">
                                <Select.Option value="1"> 10-13kg </Select.Option>
                                <Select.Option value="2"> 14-17kg </Select.Option>
                                <Select.Option value="3"> 18-21kg </Select.Option>
                                <Select.Option value="4"> 22-25kg </Select.Option>
                                <Select.Option value="5"> 26-30kg </Select.Option>
                                <Select.Option value="6"> 31-35kg </Select.Option>
                                <Select.Option value="7"> 36-41kg </Select.Option>
                                <Select.Option value="8"> 42-48kg </Select.Option>
                                <Select.Option value="9"> 49-57kg </Select.Option>
                                <Select.Option value="10"> 58-66kg </Select.Option>
                                <Select.Option value="11"> 67-78kg </Select.Option>
                                <Select.Option value="12"> 79-94kg </Select.Option>
                                <Select.Option value="13"> 95+kg </Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item name="shoesize " label="Shoe Size - US (Req for Snow Hire Only)">
                            <Input placeholder="Please input your shoe size" />
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item name="tyresize" label="Tyre Size eg 215/65/15 (for Chain Hire)">
                            <Input placeholder="Please input your tyre size" />
                        </Form.Item>
                    </Col>
                </Row>
                                
            </Form> 
            <Table dataSource={extra} rowSelection={rowSelection} columns={extrasCol} pagination={false}/>
        </Col>
        
    )}



   
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

            <Row className="step1-content">
                {categories.map(category => (
                    <Col key={category.id} span={6}>
                        <Image width={200} src={category.image_url}/>
                        <Checkbox onChange={e => categoryOnChange(e, category.id)}>{category.name}</Checkbox>
                    </Col>
                ))}
            </Row>
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
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
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