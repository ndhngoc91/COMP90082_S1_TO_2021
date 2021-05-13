import {Button, Form, Input} from "antd";
import React from "react";

const loginFormLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const loginFormTailLayout = {
    wrapperCol: {offset: 6, span: 18},
};

const AddAddressForm = ({handling, onFinish}) => {
    return <Form {...loginFormLayout}
                 name="basic"
                 onFinish={onFinish}>
        <Form.Item label="State"
                   name="state"
                   rules={[{required: true, message: 'Please input your state!'}]}>
            <Input/>
        </Form.Item>
        <Form.Item label="City"
                   name="city"
                   rules={[{required: true, message: 'Please input your city!'}]}>
            <Input/>
        </Form.Item>
        <Form.Item label="Address Line"
                   name="address_line"
                   rules={[{required: true, message: 'Please input your address line!'}]}>
            <Input/>
        </Form.Item>
        <Form.Item label="Postcode"
                   name="postcode"
                   rules={[{required: true, message: 'Please input your postcode!'}]}>
            <Input/>
        </Form.Item>
        <Form.Item {...loginFormTailLayout}>
            <Button type="primary" htmlType="submit" loading={handling}>
                Login
            </Button>
        </Form.Item>
    </Form>;
}

export default AddAddressForm;
