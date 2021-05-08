import React, {useState} from "react";
import rockyValleyLogo from "../assets/rocky_valley.svg";
import {
    Button, Col, Form, Image, Input, InputNumber, Row, Select, Typography
} from "antd";
import {
    LockOutlined,
    UserOutlined,
    MailOutlined
} from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";
import "../assets/css/userCreate.css";
import {CityData, StateData} from "../consts/StateData";


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


const UserCreatePage = () => {
    const [username, setUsername] = useState("user1");
    const [email, setEmail] = useState("yuyue@student.unimelb.edu.au");
    const [age, setAge] = useState(0);
    const [phone, setPhone] = useState("0000000000");
    const [marital, setMarital] = useState("unmarried");
    const [street, setStreet] = useState("28 Bouverie St");
    const [postcode, setPostcode] = useState(3053);
    const [password, setPassword] = useState("1234sS");
    const [cities, setCities] = useState(CityData[StateData[0]]);
    const [selectedState, setSelectedState] = useState(StateData[0]);
    const [selectedCity, setSelectedCity] = useState(CityData[StateData[0]]);

    const onStateChange = value => {
        setCities(CityData[value]);
        setSelectedState(value);
        setSelectedCity(CityData[value][0])
    };

    const onCityChange = value => {
        setSelectedCity(value);
    };

    const onClick = () => {
        console.log({username}, {email}, {age}, {phone}, {marital}, {street}, {postcode}, {password});
        history.push("/user-login")
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="61">+61</Option>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

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
                              initialValues={{
                                  prefix: "61",
                              }}
                              validateMessages={validateMessages}>
                            <Form.Item name={["user", "name"]}
                                       rules={[
                                           {
                                               required: true,
                                               message: "Please input your Username!",
                                           },
                                       ]}
                                       value={username}
                                       onChange={(event) => {
                                           setUsername(event.target.value);
                                       }}>
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                       placeholder="Enter username"
                                       className="name"
                                />
                            </Form.Item>

                            <Form.Item name={["user", "email"]}
                                       rules={[
                                           {
                                               type: "email",
                                           },
                                           {
                                               required: true,
                                               message: "Please input your E-mail!",
                                           },
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

                            <Form.Item name={["user", "age"]}
                                       rules={[
                                           {
                                               type: "number",
                                               min: 0,
                                               max: 130,
                                           },
                                           {
                                               required: true,
                                               message: "Please input your age!",
                                           },
                                       ]}
                                       value={age}
                                       onChange={(event) => {
                                           setAge(event.target.value);
                                       }}>
                                <InputNumber
                                    placeholder="Enter your age"
                                    className="Age"
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </Form.Item>
                            <Form.Item name={["user", "phone"]}
                                       rules={[
                                           {
                                               type: "number",
                                               message: "Please input 10 numbers",
                                           },
                                           {
                                               required: true,
                                               message: "Please input your phone number!",
                                           }, {
                                               len: 10,
                                               message: "Please input 10 numbers",
                                           }
                                       ]}
                                       value={phone}
                                       onChange={(event) => {
                                           setPhone(event.target.value);
                                       }}>
                                <Input
                                    addonBefore={prefixSelector}
                                    className="Phone"
                                    placeholder="Enter your phone number"
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </Form.Item>
                            <Form.Item name={["user", "marital"]}
                                       rules={[
                                           {
                                               required: true,
                                               message: "Please choose marital status!",
                                           },
                                       ]}
                                       value={marital}
                                       onChange={(event) => {
                                           setMarital(event.target.value);
                                       }}>
                                <Select className="Marital"
                                        placeholder="Choose your marital status"
                                        style={{
                                            width: "100%",
                                        }}>
                                    <Option value="unmarried">unmarried</Option>
                                    <Option value="married">married</Option>
                                    <Option value="Prefer not to say">no idea</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name={["user", "address"]}>
                                <Input.Group compact>
                                    <Form.Item name={["user", "address", "street"]}
                                               noStyle
                                               value={street}
                                               onChange={(event) => {
                                                   setStreet(event.target.value);
                                               }}
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: "Street is required"
                                                   }
                                               ]}>
                                        <Input placeholder="Input street" className="street"/>
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>

                            <Form.Item>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Select value={selectedState} onChange={onStateChange}>
                                            {StateData.map(state => (
                                                <Option key={state} value={state}>{state}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col span={12}>
                                        <Select value={selectedCity} onChange={onCityChange}>
                                            {cities.map(city => (
                                                <Option key={city} value={city}>{city}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item name={["user", "address", "Postcode"]}
                                       rules={[
                                           {
                                               type: "number",
                                               required: true,
                                               message: "Postcode is required"
                                           }
                                       ]}
                                       value={postcode}
                                       onChange={(event) => {
                                           setPostcode(event.target.value);
                                       }}>
                                <Input placeholder="Input postcode" className="postcode"/>
                            </Form.Item>

                            <Form.Item name="password"
                                       rules={[
                                           {
                                               pattern: new RegExp(/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$).{6,10}$/, "g"),
                                               message: "The length is between 6 and 10 characters!" +
                                                   "At least one number and uppercase and lowercase letters!",
                                           },
                                           {
                                               required: true,
                                               message: "Please input your password!",
                                           },
                                           {
                                               whitespace: true,
                                               message: "No white space!",
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
                                        onClick={onClick}>
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

export default UserCreatePage;
