import {Button, Form, Input} from "antd";
import React from "react";

const loginFormLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const loginFormTailLayout = {
    wrapperCol: {offset: 6, span: 18},
};

const LoginForm = ({handling, onFinish}) => {
    return <Form {...loginFormLayout}
                 name="basic"
                 initialValues={{remember: true}}
                 onFinish={onFinish}>
        <Form.Item label="Username"
                   name="username"
                   rules={[{required: true, message: 'Please input your username!'}]}>
            <Input/>
        </Form.Item>

        <Form.Item label="Password"
                   name="password"
                   rules={[{required: true, message: 'Please input your password!'}]}>
            <Input.Password/>
        </Form.Item>
        <Form.Item {...loginFormTailLayout}>
            <Button type="primary" htmlType="submit" loading={handling}>
                Login
            </Button>
        </Form.Item>
    </Form>;
}

export default LoginForm;
