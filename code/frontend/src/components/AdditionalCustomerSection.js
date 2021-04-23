import React, {useState} from "react";
import {
    Button,
    List,
    Input,
    Typography
} from "antd";
import {
    CheckCircleTwoTone
} from "@ant-design/icons";
import styled from 'styled-components'

const { Search } = Input;

const AdditionalCustomerSection = props => {
    // isAdd: true if we are adding a customer,
    // isSelect: true if we are selecting an existing customer,
    // isCreate: true if we are creating a new customer.
    const [isAdd, setAddCustomer] = useState(false);
    const [isSelect, setSelectCustomer] = useState(false);
    const [isCreate, setCreateCustomer] = useState(false);

    const [usersFound, setUsersFound] = useState(props.allUsers);

    const [displayResult, setDisplayResult] = useState(false);

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
    };

    const addCustomer = customer => {
        setDisplayResult(false);
        return [...props.customers, customer];
    };

    const searchUsers = value => {
        setDisplayResult(true);
        setUsersFound(usersFound => {
            return props.allUsers.filter(u => {
                const firstName = u.firstName.toLowerCase() + " " + u.lastName.toLowerCase();
                return firstName.includes(value);
            });
        });
    };

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
                    <div>
                        <Search placeholder="input customer's phone number or name" onSearch={value => searchUsers(value)} loading={false} enterButton />
                        {
                            displayResult
                                ?
                                <List
                                    header={<div>Selectable customers</div>}
                                    bordered
                                    itemLayout="horizontal"
                                    dataSource={usersFound}
                                    renderItem={(item, index) => (
                                        <List.Item
                                            actions={[<Button size="small" onClick={_ => props.onAdd(addCustomer(item))}>Add</Button>]}>
                                            <Typography.Text mark>[ITEM]</Typography.Text>{item.firstName}
                                        </List.Item>
                                    )}
                                ></List>
                                : null
                        }
                         <Button
                            type="primary"
                            icon={<CheckCircleTwoTone/>}
                            size="large"
                            htmlType="button"
                            className="signup-form-button"
                            onClick={_ => {setCreateCustomer(true); setSelectCustomer(false);}}
                        >
                            Create a new customer
                        </Button>
                    </div>
                    : null
            }
            {
                // is creating a new customer
                (isAdd && !isSelect && isCreate)
                    ?
                    <>
                        <p>use the sign up form similar to Team 1's</p>
                        <Button
                            type="primary"
                            icon={<CheckCircleTwoTone/>}
                            size="large"
                            htmlType="button"
                            className="signup-form-button"
                            onClick={_ => {setSelectCustomer(true); setCreateCustomer(false);}}
                        >
                            Select an existing customer
                        </Button>
                    </>
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