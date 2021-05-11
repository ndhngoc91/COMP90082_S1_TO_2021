import React, {useEffect, useState} from "react";
import rockyValleyLogo from "../assets/rocky_valley.svg";
import {
    Button, Col, Form, Image, Input, message as antdMessage, Row, Select, Typography
} from "antd";
import {
    LockOutlined,
    UserOutlined,
    MailOutlined,
} from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";
import {useUserNames} from "../hooks/UserNameHooks";
import {useEmails} from "../hooks/EmailHooks";
import {Redirect} from "react-router-dom";
import Axios from "axios";


const {Link, Title} = Typography;
const {Option} = Select;

const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};


const AdminCreatePage = () => {
    const [userType, setUserType] = useState(0);
    const [userName, setUserName] = useState("admin1");
    const [email, setEmail] = useState("XXXXX@student.unimelb.edu.au");
    const [password, setPassword] = useState("1234sS");
    const [errorMessage, setErrorMessage] = useState("");
    const [createSuccess, setCreateSuccess] = useState("");

    const userNames = useUserNames();
    const emails = useEmails();

    const [form] = Form.useForm();

    /*
    // Read user name from API
    useEffect(() => {
        Axios({
                method: "get",
                url: "http://127.0.0.1:8000/customer-codes",
                headers: {"Content-Type": "application/JSON; charset=UTF-8"},
                params: {"used": false}
            }
        ).then((response) => {
            setUserNameList(response.data);
        })
    }, []);

    // Read email from API
    useEffect(() => {
        Axios({
                method: "get",
                url: "http://127.0.0.1:8000/customer-codes",
                headers: {"Content-Type": "application/JSON; charset=UTF-8"},
                params: {"used": false}
            }
        ).then((response) => {
            setEmailList(response.data);
        })
    }, []);

    //Handles submission about creating a new customer
    const _handleSubmit = () => {
        Axios({
            method: "post",
            url: "api/customers",
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
            data: {
                "customer": {
                    "usertype": usertype,
                    "username": username,
                    "email": email,
                    "password": password
                }
            }
        }).then((response) => {
            console.log("Create Admin Success!");
            console.log(response);
            let {customer} = response.data;
            console.log("Create Admin ID:" + customer.id);
            setCreateSuccess(true);
        }).catch((e) => {
            console.log(e)
            setErrorMessage(e.response.data.message);
            antdMessage.info(errorMessage);
        });
    }

    // Redirect to home page if create success
    if (createSuccess) {
        return <Redirect to={{pathname: "/"}}/>
    }else{
        return <Redirect to={{pathname: "/admin-create"}}/>
    }

    // Read existing user Name list information into the drop down list
    const userNameChildren = [];
    for (let i = 0; i < userNameList.length; i++) {
        userNameChildren.push({userNameList[i]});
    }

    // Read existing email list information into the drop down list
    const emailChildren = [];
    for (let i = 0; i < userNameList.length; i++) {
        emailChildren.push({emailList[i]});
    }
    * */

    const onFinish = values => {
        console.log(form.isFieldsTouched());
        const newRecord = [values,userType];
        console.log("Success:", newRecord);
    };

    const onFinishFailed = errorInfo => {
        console.log(form.isFieldsTouched())
        console.log("Failed:", errorInfo);
    };

    /*
    const checkUsers = (value) => {
        if (userNames.includes(value)){
            return
        }
    }
    * */

    return (
        <>
            <Row justify="center" align="middle" style={{minHeight: "100vh"}}>
                <Col>
                    <Row justify="center">
                        <Image src={rockyValleyLogo} preview={false} width={"400px"}/>
                    </Row>
                    <Row justify="center">
                        <Title level={3}>Register</Title>
                    </Row>
                    <Row justify="center">
                        <Form name="register"
                              style={{width: "600px"}}
                              form={form}
                            //onFinish={_handleSubmit}
                              onFinish={onFinish}
                              onFinishFailed={onFinishFailed}
                              initialValues={{
                                  usertype: 1,
                                  username: "admin1",
                                  email: "xxxx@unimelb.edu.au",
                              }}
                              validateMessages={validateMessages}>
                            <Form.Item label="UserType"
                                       name="userType"
                                       value={userType}
                                       hidden>
                                <Input/>
                            </Form.Item>
                            <Form.Item name="userName"
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
                                       value={userName}
                                       onChange={(event) => {
                                           setUserName(event.target.value);
                                       }}>
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
                                                   return Promise.reject(new Error('× Email exists'));
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
                                           {
                                               pattern: /^[a-zA-Z0-9]+$/,
                                               message: "× Only contains numbers and letters",
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
                            <Form.Item className="create-btn">
                                <Button type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        onClick={() => setUserType(1)}>
                                    Create
                                </Button>
                            </Form.Item>
                            <Form.Item className="redirect">
                                Already have an account? &nbsp;
                                <Link href="/login">
                                    Sign in
                                </Link>
                            </Form.Item>

                        </Form>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default AdminCreatePage;
