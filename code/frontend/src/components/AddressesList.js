import {Form, Button, Select, Divider} from "antd";
import React, {useState} from "react";
import AddAddressForm from "../components/AddAddressForm";
import EditAddressForm from "../components/EditAddressForm";
import {useStores} from "../stores";
import {observer} from "mobx-react-lite";
import {useAddresses} from "../hooks/AddressHooks";

const AddressesList = observer(() => {
    const [dvisible, setDvisible] = useState(false);
    const [bvisible, setBvisible] = useState(false);
    const [addAddr, setAddAddr] = useState("none");

    const {
        addressStore: {
            addresses,
            currentDevileryAddress,
            currentBillingAddress,
            getAddressString,
            selectBillingAddressIndex,
            selectDeliveryAddressIndex
        },
        customerStore: {customerId, setDeliveryAddrId, setBillingAddrId}
    } = useStores();

    useAddresses();

    const handleDAddrChange = (index) => {
        if (index === "-1") {
            setAddAddr("");
        } else {
            selectDeliveryAddressIndex(index);
            setAddAddr("none");
            setDeliveryAddrId(currentDevileryAddress.id);
        }
    }

    const handleBAddrChange = (index) => {
        if (index === "-1") {
            setAddAddr("");
        } else {
            selectBillingAddressIndex(1);
            setAddAddr("none");
            setBillingAddrId(currentBillingAddress.id);
        }
    }

    const handleCancel = () => {
        setDvisible(false);
    };

    const handleBCancel = () => {
        setBvisible(false);
    };

    const addressesList = [];
    for (let i = 0; i < addresses.length; i++) {
        addressesList.push(<Select.Option key={i}>{getAddressString(i)}</Select.Option>)
    }
    addressesList.push(<Select.Option key={-1}>Add New Address</Select.Option>);

    return (
        <div>
            {/* Delivery Address Form */}
            <div>
                <Divider orientation="left">Delivery Address</Divider>
                <Form>
                    <Form.Item>
                        <Select placeholder="Select/Add Delivery Address"
                                onChange={handleDAddrChange}>
                            {addressesList}
                        </Select>
                    </Form.Item>

                    {/* Display Current Delivery Address */}
                    <Form.Item>
                        <div style={{lineHeight: "8px", marginLeft: "16px"}}>
                            <p>{currentDevileryAddress.address_line1}</p>
                            <p>{currentDevileryAddress.address_line2}</p>
                            <p>{currentDevileryAddress.region}, {currentDevileryAddress.country}, {currentDevileryAddress.postcode}</p>
                            <p>Contact: {currentDevileryAddress.contact}</p>
                        </div>
                        <Button type="link" onClick={() => setDvisible(true)}>
                            Edit this address
                        </Button>
                    </Form.Item>

                    {/* Edit Address Form */}
                    {dvisible && <EditAddressForm address={currentDevileryAddress} handleCancel={handleCancel}/>}
                </Form>
            </div>


            {/* Billing Address Form */}
            <div>
                <Divider orientation="left">Billing Address</Divider>
                <Form>
                    <Form.Item>
                        <Select placeholder="Select/Add Delivery Address"
                                onChange={handleBAddrChange}>
                            {addressesList}
                        </Select>
                    </Form.Item>

                    {/* Display Current Billing Address */}
                    <Form.Item>
                        <div style={{lineHeight: "8px", marginLeft: "16px"}}>
                            <p>{currentBillingAddress.address_line1}</p>
                            <p>{currentBillingAddress.address_line2}</p>
                            <p>{currentBillingAddress.region}, {currentBillingAddress.country}, {currentBillingAddress.postcode}</p>
                            <p>Contact: {currentBillingAddress.contact}</p>
                        </div>
                        <Button type="link" onClick={() => setBvisible(true)}>
                            Edit this address
                        </Button>
                    </Form.Item>

                    {/* Edit Address Form */}
                    {bvisible && <EditAddressForm address={currentBillingAddress} handleCancel={handleBCancel}/>}

                </Form>
            </div>

            {/* Add New Address Component, triggle by click "add new address" in selection box */}
            <div style={{display: addAddr}}>
                <Divider orientation="left">Add New Address</Divider>
                <AddAddressForm customerId={customerId}/>
            </div>
        </div>
    );
});

export default AddressesList;
