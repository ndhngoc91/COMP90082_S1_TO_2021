import React, {useEffect, useState }  from 'react'
import HiringForm from '../components/HiringForm';
import styled from 'styled-components';
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { DatePicker, Calendar, Row, Col, Alert, Layout, Space, Steps, Button } from "antd";
const { Content } = Layout;
const { Step } = Steps;
const { RangePicker } = DatePicker;
import "../assets/css/booking.css";
import moment from 'moment';


const HiringFormPage = (props) => {
    //console.log(props.location.state);

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

    
    


    const steps = [
        {
          title: 'Choose Dates',
          content:
          <div>
              <Col className="step1-content">
                  <Space size={20}>
                    <RangePicker
                        disabledDate={disabledDate}
                        onCalendarChange={val => {
                            setDates(val);
                            console.log(val);}}
                        onChange={val => {
                            setValue(val);
                            }} >
                    </RangePicker>
                    { dates.length === 2 && dates[1] != null ? <Alert message={`Renting Period: ${dates[0].format("YYYY-MM-DD")} - ${dates[1].format("YYYY-MM-DD")} `}/>: 
                    <Alert message={"Selected Dates Please"}></Alert> }
                </Space>
             </Col>
          </div>
            
        },
        {
          title: 'Second',
          content: <HiringForm selectedCustomer = {props.location.state}/>,
        },
        {
          title: 'Last',
          content: 'Last-content',
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

                        <div className="steps-action">
                            {current < steps.length - 1 && (
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

const Page = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    -webkit-justify-content: center;
    background: #f1f1f3; // this is the color of the background of the login page
`
const PageHeader = styled.div`
    margin: 30px;
    text-align: center;
    font-size: 30px;
`