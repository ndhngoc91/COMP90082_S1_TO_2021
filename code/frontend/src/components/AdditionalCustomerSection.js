import React, {useEffect, useState} from "react";
import {
    Row,
    Col,
    Divider,
    Button
} from "antd";
import {
    CheckCircleTwoTone
} from "@ant-design/icons";
import styled from 'styled-components'

const AdditionalCustomerSection = props => {
    // isAdd: true if we are adding a customer,
    // isSelect: true if we are selecting an existing customer,
    // isCreate: true if we are creating a new customer.
    const [isAdd, setAddCustomer] = useState(false);
    const [isSelect, setSelectCustomer] = useState(false);
    const [isCreate, setCreateCustomer] = useState(false);

    const addCustomerButtonStage = _ => {
        if (!isAdd && !isSelect && !isCreate) {
            return (
                <Button
                    type="primary"
                    icon={<CheckCircleTwoTone/>}
                    size="large"
                    htmlType="button"
                    className="signup-form-button"
                    onClick={_ => {
                        setAddCustomer(true);
                    }}
                >
                    Add an accompanying customer
                </Button>
            )
        }

        return null;
    }

    // interface for selection, to select existing customers
    // or to create new customers
    const addOrSelectCustomerStage = _ => {
        if (isAdd && !isSelect && !isCreate) {
            return (
                <div className="select-add-or-create-container">
                    <div className="select-container">
                        <Button
                            type="primary"
                            icon={<CheckCircleTwoTone/>}
                            size="large"
                            htmlType="button"
                            className="signup-form-button"
                            onClick={_ => setSelectCustomer(true)}
                        >
                            Select an existing customer
                        </Button>
                    </div>
                    <div className="divider"></div>
                    <div>
                        <Button
                            type="primary"
                            icon={<CheckCircleTwoTone/>}
                            size="large"
                            htmlType="button"
                            className="signup-form-button"
                            onClick={_ => setCreateCustomer(true)}
                        >
                            Create a new customer
                        </Button>
                    </div>
                </div>
            )
        }

        return null;
    }

    return (
        <AccompanyCustomerContainer>
            {
                addCustomerButtonStage()
            }
            {
                addOrSelectCustomerStage()
            }
            {
                
                (isAdd && isSelect && !isCreate)
                    ?
                    //search bar and add button
                    <p>search bar and button</p>
                    : null
            }
            {
                // is creating a new customer
                (isAdd && !isSelect && isCreate)
                    ?
                    <p>use the sign up form similar to Team 1's</p>
                    : null
            }
        </AccompanyCustomerContainer>
    );
}

export default AdditionalCustomerSection;

const AccompanyCustomerContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const SelectAddOrCreateContainer = styled.div`
`