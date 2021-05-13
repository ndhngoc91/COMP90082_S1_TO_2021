import React, {useEffect, useState }  from 'react'
import NavigationBar from "../components/NavigationBar/NavigationBar";
import RentPeriod from "../components/CustomerHiring/RentPeriod";
import SelectCategory from "../components/CustomerHiring/Category";
import SelectPackages from "../components/CustomerHiring/SelectPackages";
import {Row, Col, Layout, Steps, Button} from "antd";
const { Content } = Layout;
const { Step } = Steps;
import "../assets/css/booking.css";
import { useCategories } from "../hooks/CategoryHooks";
import { handlePackages} from "../hooks/PackageHooks";
import ShoppingCart from '../components/CustomerHiring/ShoppingCart';

const HiringFormPage = (props) => {
    //console.log(props.location.state);


 
    // 1. Select rent period
    const [dates, setDates] = useState([]);


    // 2. Select Category
    const categories = useCategories();
    


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
            setLoading(false);
        }
    }, [loading])

    const [packagesItem, setPackageItem] = useState([]);

  
    // 4. Shopping Cart & Extras
    const [loadingOrders, setLoadingOrders] = useState(false);


    const [orders, setOrders] = useState([]);
    
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
          
          <RentPeriod setRentPeriod={setRentPeriod} dates={dates} setDates={setDates}></RentPeriod>
            
            
        },
        {
          title: 'Select Category',
          content: /*<HiringForm selectedCustomer = {props.location.state}/>*/

           <SelectCategory categories={categories} setSelectedCatogory={setSelectedCatogory}/>

          
               
        },
        {
            title: 'Select Package',
            content: 
            <SelectPackages setPackageItem={setPackageItem} packages={packages}/>
        
          },
       
        {
          title: 'Complete Package Information',
          content: 
            <ShoppingCart loadingOrders={loadingOrders}
                        setLoadingOrders={setLoadingOrders}
                        packagesItem={packagesItem}
                        setOrders={setOrders}
                        orders={orders}
                        message={message}
                        setPackageItem={setPackageItem}
                        selectedCategory={selectedCategory}
                        dates={dates}/>
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