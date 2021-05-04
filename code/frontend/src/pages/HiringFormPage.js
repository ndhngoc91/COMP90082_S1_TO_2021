import React, {useEffect, useState }  from 'react'
import HiringForm from '../components/HiringForm';
import styled from 'styled-components';
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { DatePicker, Calendar, Row, Col, Alert, Layout, Space, Steps, Button, Checkbox, Image, Table } from "antd";
const { Content } = Layout;
const { Step } = Steps;
const { RangePicker } = DatePicker;
import "../assets/css/booking.css";
import moment from 'moment';
import { useCategories } from "../hooks/CategoryHooks";
import { handlePackages} from "../hooks/PackageHooks";


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
        { title: 'Package Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Delete</a>,
        },
    ];

    const [typeQuantity, setTypeQuantity] = useState(0);


    const extandTable = (record) => {
        console.log(record);
        const columns = [
            {title: 'Package Type', dataIndex: 'name', key: 'package type'},
            {title: 'Quantity', dataIndex: 'quantity', key: 'quantity'}
        ]

        return ( 
        <Col span={18} offset={4}>
            <p>{record.description}</p>
            <Table columns={columns} rowKey={(row) => row.id} pagination={false} dataSource={record.types}> </Table> 
        </Col>
    )};

    

    

    
   
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
                    <Col span={6}>
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
                            rowKey={(row) => row.id}
                            dataSource={packages}
                            pagination={false}
                            expandable={{ expandedRowRender: record => extandTable(record) }}>
                    </Table>

                    : "No Package Selected"}
                
            </Col>
            
          },
        {
            title: 'Select Extras',
            content: 'Select Extra (Optional)',
          },
        {
          title: 'Complete Package Information',
          content: 'Complete Package Information]',
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
                                Next
                            </Button>
                            )}
                            {current === 1 && (
                            <Button type="primary" onClick={() => { setLoading(true);
                                                                     next()}}>
                                Next
                            </Button>
                            )}

                            {(current === 2 || current === 3) && (
                            <Button type="primary" onClick={() => next()}>
                                Next
                            </Button>
                            )}

                            {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                Done
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