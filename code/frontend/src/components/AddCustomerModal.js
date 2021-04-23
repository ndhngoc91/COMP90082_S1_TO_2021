import React, { useState } from "react";
import { Modal, Form, Select, Input } from "antd";

const { Option } = Select;

const rules = [{
    required: true
}]

const AddCustomerModal = props => {
    
    return (
        <Modal visible={props.visible}
            onOk={props.handleOk}
            onCancel={props.handleCancel}>
            <Form.Item
                label="Title"
                name="title"
                rules={rules}
            >
                <Select
                    placeholder="Your title"
                    onChange={_ => console.log("value changed to", value)}
                >
                    <Option value="Mr.">Mr.</Option>
                    <Option value="Ms.">Ms.</Option>
                    <Option value="Other">Other</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="First Name"
                name="firstName"
                rules={rules}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Last Name"
                name="lastName"
                rules={rules}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={rules}
            >
                <Input placeholder="mm/dd/yyyy" />
            </Form.Item>
            <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={rules}
            >
                <Input placeholder="e.g. 012345678"/>
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={rules}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Height(cm)"
                name="height"
                rules={rules}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Weight(kg)"
                name="weight"
                rules={rules}
            >
                <Input />
            </Form.Item>
        </Modal>
    )
};

export default AddCustomerModal;