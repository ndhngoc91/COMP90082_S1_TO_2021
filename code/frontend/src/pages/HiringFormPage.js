import React, {useEffect, useState }  from 'react'
import HiringForm from '../components/HiringForm';
import styled from 'styled-components';
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { DatePicker, InputNumber, Row, Col, Alert, Layout, Space, Steps, Button, Checkbox, Image, Table, Radio } from "antd";
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
        {packages, rentPeriod, selectedCategories, loading},
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

        return packageItem = {'Name': packageItem.Name,'Type': packageItem.Type, 'Quantity': quan};

    }


    const onChange = (val, name, type) => {
        var same = 0;

        setPackageItem(oldPackages => {
           
            for (let i = 0; i < oldPackages.length; i ++){
                if (oldPackages[i].Name === name && oldPackages[i].Type == type){
                    oldPackages[i] = changeQuantity(val, oldPackages[i]);
                    same = 1;
                }
            }

            if (same === 0){
                return [...oldPackages, {'Name': name, 'Type':type, 'Quantity':val}]
            }else{
                return oldPackages
            }

        }, []);
    }



    const extandTable = (record) => {
        //console.log(record);

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
                    onChange={val => onChange(val, record.package_name, type.type_name)}></InputNumber>

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
        { title: 'Type name', dataIndex: 'Type', key: 'price' },
        {
            title: 'Action',
            dataIndex: 'operation',
            render: (_, record) => (
                <a>Delete</a>
              ),
          },
    ];

    const [orders, setOrders] = useState([]);

    useEffect(() => {
       
        if (loadingOrders){
            
            setOrders(generateOrder(packagesItem));
            

        }
    }, [loadingOrders])



    const generateOrder = (packagesItem) => {
        console.log('length', packagesItem.length);
        var n = 1;

        var orders = [];
      
    
        for (let i = 0; i < packagesItem.length; i++ ){
            //console.log('quan', packagesItem[i].Quantity);
            let p = packagesItem[i];
            for (let j = 0; j < p.Quantity; j ++){
                console.log(n);
                orders[n - 1] = {'key': n, 'Name': p.Name, 'Type': p.Type};
                n ++ ;
            }    
        }


       

        return orders;
    };








    

    

    

    
   
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
                                expandedRowRender: record => extandTable(record),
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
                            pagination={false}>
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