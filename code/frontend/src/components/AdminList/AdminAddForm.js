import React, {useEffect, useState} from "react";
import {
    Form,
    Input,
    Button,
    notification, DatePicker, Select, Row, Col
} from "antd";
import {
    MinusCircleOutlined,
    PlusOutlined,
    CheckSquareOutlined,
    UserOutlined,
    MailOutlined,
    LockOutlined
} from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";
import {useUserNames} from "../../hooks/UserNameHooks";
import {useEmails} from "../../hooks/EmailHooks";

const layout = {
    labelCol: {span: 16},
    wrapperCol: {span: 116}
};
const tailLayout = {
    wrapperCol: {offset: 6, span: 16}
};

const AdminAddForm = ({fieldValues, onFinish, finishing, clearFormAfterFinishing}) => {

    const [usertype, setUsertype] = useState(0);
    const [username, setUsername] = useState("user1");
    const [email, setEmail] = useState("XXXXX@student.unimelb.edu.au");
    const [password, setPassword] = useState("1234sS");

    const userNames = useUserNames();
    const emails = useEmails();

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(fieldValues);
    }, [fieldValues]);

    return (
        <>
                <Form form={form} {...layout} name="basic" onFinish={values => {
                    onFinish(values);
                    if (clearFormAfterFinishing) {
                        form.resetFields();
                    }
                }}>
                    <Form.Item label="UserType"
                               name="usertype"
                               value={usertype}
                               hidden>
                        <Input/>
                    </Form.Item>

                    <Form.Item name="username"
                               rules={[
                                   {
                                       required: true,
                                       message: "Please input your Username!",
                                   },
                                   ({
                                       validator(_, value) {
                                           if (value.length > 4) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error('× Must have at least 5 characters'));
                                       },
                                   }),
                                   ({
                                       validator(_, value) {
                                           const exist_user = userNames.includes(value);
                                           if (exist_user) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error('× User name exists'));
                                       },
                                   }),
                               ]}
                               value={username}
                               onChange={(event) => {
                                   setUsername(event.target.value);
                               }}

                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                               placeholder="Enter username"
                               className="name"
                        />
                    </Form.Item>

                    <Form.Item name="email"
                               rules={[
                                   {
                                       type: "email",
                                   },
                                   {
                                       required: true,
                                       message: "Please input your E-mail!",
                                   },
                                   ({
                                       validator(_, value) {
                                           const exist_email = emails.includes(value);
                                           if (exist_email) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error('× User name exists'));
                                       },
                                   }),
                               ]}
                               value={email}
                               onChange={(event) => {
                                   setEmail(event.target.value);
                               }}>
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon"/>}
                            placeholder="Your email address"
                            className="email"
                        />
                    </Form.Item>

                    <Form.Item name="password"
                               rules={[
                                   {
                                       required: true,
                                       message: "× Please input your password!",
                                   },
                                   ({
                                       validator(_, value) {
                                           if (value.length > 5) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error('× Must have at least 6 characters'));
                                       },
                                   }),
                                   ({
                                       validator(_, value) {
                                           if (value.length < 16) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error('× Must have at most 15 characters'));
                                       },
                                   }),
                                   ({
                                       validator(_, value) {
                                           const reg1 = /[0-9]/;
                                           if (reg1.test(value)) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error('× Must have at least 1 number'));
                                       },
                                   }),
                                   ({
                                       validator(_, value) {
                                           const reg2 = /[a-z]/;
                                           if (reg2.test(value)) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error('× Must have at least 1 lower letter'));
                                       },
                                   }),
                                   ({
                                       validator(_, value) {
                                           const reg3 = /[A-Z]/;
                                           if (reg3.test(value)) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error('× Must have at least 1 capital letter'));
                                       },
                                   }),
                                   {
                                       whitespace: true,
                                       message: "× No white space!",
                                   },
                               ]}
                               hasFeedback
                               value={password}
                               onChange={(event) => {
                                   setPassword(event.target.value);
                               }}>
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            placeholder="Create password"
                            className="password"
                        />
                    </Form.Item>

                    <Form.Item name="confirm"
                               dependencies={["password"]}
                               hasFeedback
                               rules={[
                                   {
                                       required: true,
                                       message: "Please confirm your password!",
                                   },
                                   ({getFieldValue}) => ({
                                       validator(_, value) {
                                           if (!value || getFieldValue("password") === value) {
                                               return Promise.resolve();
                                           }
                                           return Promise.reject(new Error("The two passwords that you entered do not match!"));
                                       },
                                   }),
                               ]}>
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            placeholder="Confirm password"
                            className="confirm-password"
                        />
                    </Form.Item>
                    <Form.Item name="agreement"
                               className="agree"
                               valuePropName="checked"
                               rules={[
                                   {
                                       validator: (_, value) =>
                                           value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement")),
                                   }
                               ]}>
                        <Checkbox>
                            I agree to <a href="">the term and conditions</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item className="create-btn"
                               {...tailLayout}
                    >
                        <Button type="primary"
                                htmlType="submit"
                                loading={finishing}
                                className="login-form-button"
                                onClick={() => setUsertype(2)}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

        </>
    );
};

export default AdminAddForm;
