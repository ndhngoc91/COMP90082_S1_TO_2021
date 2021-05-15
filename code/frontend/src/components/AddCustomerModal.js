import React, { useState } from "react";
import { Modal, Form, Select, Input, InputNumber } from "antd";
import { uniqueId } from 'lodash'

const { Option } = Select;

const rules = [{
    required: true
}]

const AddCustomerModal = props => {
    const [form] = Form.useForm();
    const [visible] = useState(props.visible)

    /*useResetFormOnCloseModal({
        form,
        visible
    })*/

    return (
        <Modal visible={props.visible}
            onOk={props.handleOk}
            onCancel={props.handleCancel}>
            <Form
                form={form} 
                name="createAccompanyCustomerForm">
                <Form.Item
                label="Title"
                name="title"
                id={uniqueId()}
                rules={rules}
                >
                    <Select
                        placeholder="Your title"
                        onChange={value => console.log("value changed to ", value)}
                    >
                        <Option value="Mr.">Mr.</Option>
                        <Option value="Ms.">Ms.</Option>
                        <Option value="Other">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="First Name"
                    name="firstName"
                    id={uniqueId()}
                    rules={rules}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    id={uniqueId()}
                    rules={rules}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Date of Birth"
                    name="dateOfBirth"
                    id={uniqueId()}
                    rules={rules}
                >
                    <Input placeholder="mm/dd/yyyy" />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    id={uniqueId()}
                    rules={rules}
                >
                    <Input placeholder="e.g. 012345678"/>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    id={uniqueId()}
                    rules={rules}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Height(cm)"
                    name="height"
                    id={uniqueId()}
                    rules={rules}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Weight(kg)"
                    name="weight"
                    id={uniqueId()}
                    rules={rules}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default AddCustomerModal;