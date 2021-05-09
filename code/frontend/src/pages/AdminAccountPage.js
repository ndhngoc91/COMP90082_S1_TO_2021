import React, {useEffect, useState} from "react";
import "antd/dist/antd.css"
import {
    CheckSquareOutlined,
    MailOutlined,
    MinusCircleOutlined,
    PhoneOutlined,
    PlusOutlined, TeamOutlined, UserOutlined
} from "@ant-design/icons";
import {
    Button, Select, Form, Input, Row, Col, DatePicker, Rate, Tag, Image, Space, Typography, notification
} from "antd";
import moment from "moment";
import {StateData, CityData} from "../consts/StateData";
import {USER_ROLE} from "../consts/UserRole";
import {useHandleEditAccount} from "../hooks/CustomerHooks";
import {useStores} from "../stores";

const {Option} = Select;
const {Title} = Typography;

const AdminAccountPage = () => {
    const [userType, setUserType] = useState(0);
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState(moment("",'YYYY-MM-DD'));
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [shoeSize, setShoeSize] = useState(0);
    const [skierAbility, setSkierAbility] = useState(0);
    const [din, setDin] = useState(0);
    const [cities, setCities] = useState(CityData[StateData[0]]);
    const [selectedState, setSelectedState] = useState(StateData[0]);
    const [selectedCity, setSelectedCity] = useState(CityData[StateData[0]]);
    const [readOnly, setReadOnly] = useState(true);

    const [handleEditAccount, {handling}] = useHandleEditAccount();
    const {authStore: {username,userRole}} = useStores();

    const [form] = Form.useForm();

    useEffect(() => {
        setDin(height * 2 + weight * 3 + shoeSize * 4 + skierAbility * 5);
    }, [weight, height, shoeSize, skierAbility]);

    const onStateChange = value => {
        setCities(CityData[value]);
        setSelectedState(value);
        setSelectedCity(CityData[value][0])
    };

    const onCityChange = value => {
        setSelectedCity(value);
    };

    const onFinish = values => {
        console.log(form.isFieldsTouched());
        console.log("Success:", values);
        handleEditAccount(values, () => {
            notification.open({
                message: "Edited a user successfullly!",
                description: "Edited a user successfullly!",
                icon: <CheckSquareOutlined style={{color: '#108ee9'}}/>,
                duration: 2
            });
        });
    };

    const onFinishFailed = errorInfo => {
        console.log(form.isFieldsTouched())
        console.log("Failed:", errorInfo);
    };

    return (
        <Row justify="center" align="middle" style={{minHeight: "100vh"}}>
            <Space direction="vertical">
                <Row justify="center">
                    <Title level={1}>{USER_ROLE.ADMIN.toLowerCase()}</Title>
                </Row>
                <Form style={{width: "1000px"}}
                      initialValues={{
                          userType: {userRole},//1,
                          userName: {username},//"Admin1",
                          firstName: "Ruby",
                          lastName: "Nguyen",
                          gender: "male",
                          birthdate: moment('2015-06-06', 'YYYY-MM-DD'),
                          email: "hongngocn@unimelb.edu.au",
                          phoneNumber: "0434117998",
                          state: "VIC",
                          city: "Melbourne",
                          postcode: "3053"
                      }}
                      form={form}
                      name="basic"
                      layout="vertical"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}>
                    <Row justify="space-between" gutter={16}>
                        <Col span={8}>
                            <Form.Item label="UserType"
                                       name="userType"
                                       value={userType}
                                       hidden>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="User Name" name="userName"
                                       value={username}
                                       rules={[{required: true, message: "Please input your user name!"}]}>
                                <Input prefix={<UserOutlined/>} size="large" readOnly={readOnly}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="First Name" name="firstName"
                                       rules={[{required: true, message: "Please input your first name!"}]}>
                                <Input prefix={<UserOutlined/>} size="large" readOnly={readOnly}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Last Name" name="lastName"
                                       rules={[{required: true, message: "Please input your last name!"}]}>
                                <Input prefix={<TeamOutlined/>} size="large" readOnly={readOnly}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify="space-between" gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Birthdate" name="birthdate"
                                       rules={[{required: true, message: "Required"}]}>
                                <DatePicker size="large" disabled={readOnly}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Gender" name="gender"
                                       rules={[{required: true, message: "Required"}]}>
                                <Select placeholder="Gender" size="large" disabled={readOnly}>
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="others">Others</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify="space-between" gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Email" name="email"
                                       rules={[
                                           {required: true, message: "Please input your email!"},
                                           {type: "email", message: "Email is not valid!"}
                                       ]}>
                                <Input prefix={<MailOutlined/>} size="large" readOnly={readOnly}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Phone Number" name="phoneNumber"
                                       rules={[
                                           {required: true, message: "Please input your phone number!"}
                                       ]}>
                                <Input prefix={<PhoneOutlined/>} size="large" readOnly={readOnly}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="space-between" gutter={16}>
                        <Col span={12}>
                            <Form.Item label="State" name="state" rules={[
                                {required: true, message: "Please input your state!"}
                            ]}>
                                <Select value={selectedState} onChange={onStateChange} disabled={readOnly}>
                                    {StateData.map(state => (
                                        <Option key={state} value={state}>{state}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="City" name="city" rules={[
                                {required: true, message: "Please input your city!"}
                            ]}>
                                <Select value={selectedCity} onChange={onCityChange} disabled={readOnly}>
                                    {cities.map(city => (
                                        <Option key={city} value={city}>{city}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="addressLines"
                               rules={[
                                   {required: true, message: "Please input your address lines!"}
                               ]}>
                        <Input size="large"
                               placeholder="Address line"
                               style={{width: "100%"}}
                               disabled={readOnly}
                        />
                    </Form.Item>
                    <Form.Item>
                        {readOnly &&
                        <Button type="primary" size="large" onClick={() => setReadOnly(false)}>
                            Edit
                        </Button>}
                        {readOnly === false &&
                        <Space>
                            <Button type="primary" htmlType="submit" size="large" loading={handling}>
                                Submit
                            </Button>
                            <Button type="default" size="large" onClick={() => setReadOnly(true)}>
                                Cancel
                            </Button>
                        </Space>}
                    </Form.Item>
                </Form>
            </Space>

        </Row>
    );
}

export default AdminAccountPage
