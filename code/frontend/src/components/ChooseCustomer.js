import React, {useRef, useEffect, useState} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom"
import {Button, Card, Form, List, Spin, Alert} from "antd";
import {useStores} from "../stores";

const ChooseCustomer = () => {
    const [users, setUsers] = useState([])
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);

    const {authStore: {accessToken}, customerStore: {setCustomerId}, cartStore: {emptyCart}} = useStores();

    let isRendered = useRef(false);
    useEffect(() => {
        isRendered = true;
        axios.get("http://127.0.0.1:8000/customers").then(res => {
            if (isRendered) {
                setUsers(res.data);
            }
            return null
        }).catch(err => console.log(err));

        return () => {
            isRendered = false;
        };
    }, []);


    /**
     * If Customer is select, do:
     * 1. update customer id in state
     * 2. update product database according to customerid
     * 3. clear shopping cart
     * @param item
     */
    const onSelect = (item) => {
        const customerId = item.id

        // update customerid in state
        setCustomerId(customerId);

        // update product with new customerid
        setLoading(true);
        axios.post("http://localhost:8000/customers/switch-customer", {
            customer_id: customerId,
        }, {
            headers: {"Authorization": `Bearer ${accessToken}`},
        }).then(res => {
            console.log(res.data.message)
            setLoading(false);
            setRedirect(true)
        }).catch(err => {
            console.log(err);
        });

        emptyCart();
    }


    if (redirect === true) {
        return <Redirect to={{pathname: "/"}}/>
    }
    return (
        <>
            {loading &&
            (
                <Spin tip="Loading...">
                    <Alert message="Welcome"
                           description="Loading for products..."
                           type="info"/>
                </Spin>
            )}

            <br/>
            <Card bordered={false} style={{width: 300}} cover={<img alt="example"
                                                                    src="https://media-exp1.licdn.com/dms/image/C511BAQF1N9JzP5PU8Q/company-background_10000/0?e=2159024400&v=beta&t=SogtI3ymEudS4fqNFeyKMxH7j5-2i7R1kH9LndNbPTg"/>}>
                <Form className="chooseCustomer-form"
                      initialValues={{remember: true}}>
                    <List dataSource={users}
                          renderItem={item =>
                              <List.Item>
                                  <Button type="primary" className="customer-button" block
                                          onClick={() => onSelect(item)}>
                                      {item.customer_code}
                                  </Button>
                              </List.Item>}
                    />
                    <Button type="link" block href="/create">
                        Create a customer account
                    </Button>

                </Form>
            </Card>
        </>
    )
}

export default ChooseCustomer;
