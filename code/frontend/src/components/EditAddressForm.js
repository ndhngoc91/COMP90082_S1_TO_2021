import {Form, Input, Button, Modal} from "antd";
import {message as antdMessage} from "antd" ;
import {GlobalOutlined, EnvironmentOutlined, PhoneOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useStores} from "../stores";

const EditAddressForm = (prop) => {
    const [contact, setContact] = useState(null)
    const [addr1, setAddr1] = useState(null)
    const [addr2, setAddr2] = useState(null)
    const [region, setRegion] = useState(null)
    const [country, setCountry] = useState(null)
    const [postcode, setPostcode] = useState(null)

    const [visible, setVisible] = useState(true)
    const [initial, setInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initial) {
            setContact(prop.address.contact);
            setAddr1(prop.address.address_line1);
            setAddr2(prop.address.address_line2);
            setRegion(prop.address.region);
            setCountry(prop.address.country);
            setPostcode(prop.address.postcode)
        }
    });

    const {customerStore: {customerId}} = useStores();

    const handleEditOk = (e) => {
        setLoading(true);

        // Edit Existing Address
        axios.put(`http://127.0.0.1:8000/customers/${customerId}/addresses/${prop.address.id}`, {
            "contact": contact,
            "address_line1": addr1,
            "address_line2": addr2,
            "postcode": postcode,
            "region": region,
            "country": country
        }, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then((response) => {
            console.log(response);
            setLoading(false);
            setVisible(false);
            prop.handleCancel();
        }).catch((e) => {
            console.log(e)
            antdMessage.info(errorMassage);
            setVisible(false)
        });
    };


    const handleCancel = () => {
        setVisible(false);
        prop.handleCancel();
    };

    return (
        <Modal title="Edit Address"
               visible={visible}
               onOk={handleEditOk}
               onCancel={handleCancel}
               footer={[
                   <Button key="back" onClick={handleCancel}>
                       Return
                   </Button>,
                   <Button key="submit" type="primary" loading={loading} onClick={handleEditOk}>
                       Save Changes
                   </Button>
               ]}>
            <Form.Item label="Contact"
                       rules={[{required: true, message: "Please input your contact!"}]}>
                <Input
                    value={contact}
                    onChange={(e) => {
                        setContact(e.target.value);
                        setInitial(false);
                    }}
                    prefix={<PhoneOutlined className="site-form-item-icon"/>}
                >
                </Input>
            </Form.Item>

            <Form.Item label="Address Line 1"
                       rules={[{required: true, message: "Please input your address!"}]}>
                <Input
                    value={addr1}
                    onChange={(e) => {
                        setAddr1(e.target.value);
                        setInitial(false);
                    }}
                    prefix={<EnvironmentOutlined className="site-form-item-icon"/>}
                />
            </Form.Item>

            <Form.Item label="Address Line 2"
                       rules={[{required: true, message: "Please input your address!"}]}>
                <Input
                    value={addr2}
                    onChange={(e) => {
                        setAddr2(e.target.value);
                        setInitial(false);
                    }}
                    prefix={<EnvironmentOutlined className="site-form-item-icon"/>}
                />
            </Form.Item>

            <Form.Item label="Postcode"
                       rules={[{required: true, message: "Please input your postcode!"}]}>
                <Input
                    value={postcode}
                    onChange={(e) => {
                        setPostcode(e.target.value);
                        setInitial(false);
                    }}
                    prefix={<EnvironmentOutlined className="site-form-item-icon"/>}
                />
            </Form.Item>

            <Form.Item label="Region"
                       rules={[{required: true, message: "Please input your region!"}]}>
                <Input
                    value={region}
                    onChange={(e) => {
                        setRegion(e.target.value);
                        setInitial(false);
                    }}
                    prefix={<EnvironmentOutlined className="site-form-item-icon"/>}
                />
            </Form.Item>

            <Form.Item label="Country"
                       rules={[{required: true, message: "Please input your country!"}]}>
                <Input
                    value={country}
                    onChange={(e) => {
                        setCountry(e.target.value);
                        setInitial(false);
                    }}
                    prefix={<GlobalOutlined className="site-form-item-icon"/>}
                />
            </Form.Item>
        </Modal>
    );
}

export default EditAddressForm;
