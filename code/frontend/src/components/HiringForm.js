import React, { useEffect, useState } from "react";
import {
    Form, Button, Row, Col, Input, Divider
} from "antd";
import {
    CheckCircleTwoTone,
    MinusCircleOutlined,
    PlusOutlined,
    UpOutlined
} from "@ant-design/icons";
import AddCustomerModal from "./AddCustomerModal"
import EquipmentTable from "./EquipmentTable"
import Searchbar from "./Searchbar"
import { uniqueId } from "lodash"
import { Redirect } from "react-router-dom"
import HiringUserEditSection from "./HiringUserEditSection";

const mainContact = {
    'title': 'Mr.',
    'firstName': 'Tom',
    'lastName': 'Smith',
    'dateOfBirth': '1900-01-01',
    'phoneNumber': '012345678',
    'email': 'abc@def.com',
    'height': '183',
    'weight': '60'
}



const allUsers = [
    {
        'title': 'Mr.',
        'firstName': 'Thomas',
        'lastName': 'Smith',
        'dateOfBirth': '1900-01-01',
        'phoneNumber': '012345678',
        'email': 'abc@def.com',
        'height': '183',
        'weight': '60'
    },
    {
        'Title': 'Mr.',
        'firstName': 'Tom',
        'lastName': 'Smith',
        'dateOfBirth': '1900-01-01',
        'phoneNumber': '012345678',
        'email': 'abc@def.com',
        'height': '183',
        'weight': '60'
    },
    {
        'title': 'Mr.',
        'firstName': 'Abc',
        'lastName': 'Smith',
        'dateOfBirth': '1900-01-01',
        'phoneNumber': '012345678',
        'email': 'abc@def.com',
        'height': '183',
        'weight': '60'
    }
]


const gutterInfo = { xs: 8, sm: 16, md: 24, lg: 32 }

const keyFormatter = key => {
    const regex = /[A-Z]/g;
    let formattedKey = key.replaceAll(regex, ' $&');
    return formattedKey[0].toUpperCase() + formattedKey.substr(1);
};

const HiringForm = (props) => {
    const [form] = Form.useForm();
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isSearchingUser, setIsSearchingUser] = useState(false);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    // first customer defaults to the main contact
    const [hiringCustomers, setHiringCustomers] = useState([props.selectedCustomer ? props.selectedCustomer : mainContact]);
    const [createSuccess, setCreateSuccess] = useState(false);

    useEffect(() => {
        console.log(form.getFieldsValue(true));
    });

    const showAddCustomerModal = _ => setIsModalVisible(true);
    const setAddCustomer = _ => setIsAddingUser(true);
    const handleSubmitCustomerModal = _ => setIsModalVisible(false);
    const handleCancelAddCustomer = _ => setIsModalVisible(false);

    const _handleSubmit = values => {
        console.log("submitting the form");
        setCreateSuccess(true);
    };

    const addHiringCustomers = _ => {
        setHiringCustomers([...hiringCustomers, {
            'title': 'Mr.',
            'firstName': 'Test',
            'lastName': 'User',
            'dateOfBirth': '1900-01-01',
            'phoneNumber': '012345678',
            'email': 'abc@def.com',
            'height': '183',
            'weight': '60'
        }]);
    };

    if (createSuccess) {
        return <Redirect to={{pathname: "/hiringPaymentResult"}} />;
    };

    const addUserHtml = _ => {
        if (isAddingUser) {
            return (
                <div className="add-user-selection-section">
                    <div className="search-user" style={{'display': 'inline-block', 'width': '50%'}}>
                        <div className="searchbar" style={{'width': '80%'}}><Searchbar /></div>
                        <Button
                            type="primary"
                            size="small"
                            className="add-selected-customer-form-button"
                            onClick={_ => addHiringCustomers()}>
                            Add selected to list
                        </Button>
                    </div>
                    <div className="create-user" style={{'display': 'inline-block', 'width': '50%'}}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined/>}
                            size="large"
                            className="add-customer-form-button"
                            onClick={showAddCustomerModal}
                        >
                            Create a new customer
                        </Button>
                        <AddCustomerModal 
                            visible={isModalVisible}
                            handleOk={handleSubmitCustomerModal}
                            handleCancel={handleCancelAddCustomer}
                        />
                    </div>
                </div>
            );
        };

        return null;
    };

    const customerSectionHtml = _ => hiringCustomers.map((userData, index) => (
        <HiringUserEditSection
            key={index}
            userData={userData}
            userIndex={index} />
    ));

    return (
        <Form style={{width: "100%"}}
            className="hiring-form"
            form={form}
            name="hiringForm"
            initialValues={{remember: true}}
            onFinish={_handleSubmit}
        >
            <div style={{marginLeft: "30px", alignItems: "center", width: "95%"}}>
                <Row gutter={gutterInfo} justify="space-around">
                    {
                        /**
                        * user basic information, potentially allow
                        * user to connect to the page after we land on
                        * the page
                        * if logged in, we hide the div and
                        */
                    }
                </Row>
                
                {
                    customerSectionHtml()
                }
                <div className="add-customer-section" style={{'textAlign': 'center'}}>
                    
                    {
                        !isAddingUser
                            ?
                            <Button
                                type="primary"
                                icon={<PlusOutlined/>}
                                size="large"
                                className="add-customer-form-button"
                                onClick={setAddCustomer}
                            >
                                Add an accompanying customer
                            </Button>
                            : null
                    }
                </div>
                {
                    addUserHtml()
                }

                <Divider />
                <Form.Item style={{fontSize: "16px", textAlign: "center", alignItems: "center"}}>
                    <Button
                        type="primary"
                        icon={<CheckCircleTwoTone/>}
                        size="large"
                        htmlType="submit"
                        className="signup-form-button"
                    >
                        Proceed to next step
                    </Button>
                </Form.Item>

                <Form.Item style={{marginBottom: "0px", fontSize: "8px", textAlign: "center"}}>Copyright ©COMP90082
                    Squizz </Form.Item>
            </div>
        </Form>
    )
};

export default HiringForm;