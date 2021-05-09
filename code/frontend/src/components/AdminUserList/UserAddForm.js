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
    PhoneOutlined,
    LockOutlined, TeamOutlined
} from "@ant-design/icons";
import {CityData, StateData} from "../../consts/StateData";
import Checkbox from "antd/es/checkbox/Checkbox";
import moment from "moment";
import {useUserNames} from "../../hooks/UserNameHooks";
import {useEmails} from "../../hooks/EmailHooks";

const layout = {
    labelCol: {span: 16},
    wrapperCol: {span: 116}
};
const tailLayout = {
    wrapperCol: {offset: 6, span: 16}
};

const UserAddForm = ({fieldValues, onFinish, finishing, clearFormAfterFinishing}) => {

    const [usertype, setUsertype] = useState(0);
    const [username, setUsername] = useState("user1");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("XXXXX@student.unimelb.edu.au");
    const [birthdate, setBirthdate] = useState(moment('2015-06-06', 'YYYY-MM-DD'));
    const [phone, setPhone] = useState("0000000000");
    const [gender, setGender] = useState("male");
    const [address, setAddress] = useState("28 Bouverie St");
    const [postcode, setPostcode] = useState("3053");
    const [password, setPassword] = useState("1234sS");
    const [cities, setCities] = useState(CityData[StateData[0]]);
    const [selectedState, setSelectedState] = useState(StateData[0]);
    const [selectedCity, setSelectedCity] = useState(CityData[StateData[0]]);

    const userNames = useUserNames();
    const emails = useEmails();

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(fieldValues);
    }, [fieldValues]);

    const onStateChange = value => {
        setCities(CityData[value]);
        setSelectedState(value);
        setSelectedCity(CityData[value][0])
    };

    const onCityChange = value => {
        setSelectedCity(value);
    };

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

                    <Form.Item name="firstName"
                               value={firstName}
                               onChange={(event) => {
                                   setFirstName(event.target.value);
                               }}
                               rules={[
                                   {
                                       required: true,
                                       message: "Please input your first name!"
                                   }
                               ]}
                    >
                        <Input prefix={<UserOutlined/>}
                               placeholder="Please input your first name!"
                        />
                    </Form.Item>

                    <Form.Item name="lastName"
                               value={lastName}
                               onChange={(event) => {
                                   setLastName(event.target.value);
                               }}
                               rules={[
                                   {
                                       required: true,
                                       message: "Please input your last name!"
                                   }
                               ]}
                    >
                        <Input prefix={<TeamOutlined/>}
                               placeholder="Please input your last name!"
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

                    <Form.Item name="birthdate"
                               rules={[
                                   {
                                       required: true,
                                       message: "Please choose birthdate!",
                                   },
                               ]}
                               value={birthdate}
                               onChange={(event) => {
                                   setBirthdate(event.target.value);
                               }}>
                        <DatePicker
                            placeholder="Choose your birthdate"
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="phoneNumber"
                               rules={[
                                   {
                                       required: true,
                                       message: "Please input your phone number!",
                                   }
                               ]}
                               value={phone}
                               onChange={(event) => {
                                   setPhone(event.target.value);
                               }}>
                        <Input
                            prefix={<PhoneOutlined/>}
                            className="Phone"
                            placeholder="Enter your phone number"
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>

                    <Form.Item name="gender"
                               rules={[
                                   {
                                       required: true,
                                       message: "Please choose gender!",
                                   },
                               ]}
                               value={gender}
                               onChange={(value) => {
                                   setGender(value);
                               }}>
                        <Select
                            placeholder="Choose gender"
                            style={{
                                width: "100%",
                            }}
                        >
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="others">Others</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="totalAddress"
                               value={{address}+{postcode}}
                    >
                        <Input.Group compact>
                            <Form.Item name="address"
                                       noStyle
                                       value={address}
                                       onChange={(event) => {
                                           setAddress(event.target.value);
                                       }}
                                       rules={[
                                           {
                                               required: true,
                                               message: "Please input address"
                                           }
                                       ]}>
                                <Input placeholder="Input address" className="street"/>
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="region"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: "Please choose state!",
                                               },
                                           ]}
                                           value={selectedState}
                                           onChange={(value) => {
                                               setSelectedState(value);
                                           }}
                                >
                                    <Select
                                        onChange={onStateChange}
                                    >
                                        {StateData.map(state => (
                                            <Option key={state} value={state}>{state}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="city"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: "Please choose state!",
                                               },
                                           ]}
                                           value={selectedCity}
                                           onChange={(value) => {
                                               setSelectedCity(value);
                                           }}
                                >
                                    <Select
                                        onChange={onCityChange}
                                    >
                                        {cities.map(city => (
                                            <Option key={city} value={city}>{city}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item name="postcode"
                               rules={[
                                   {
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

export default UserAddForm;
