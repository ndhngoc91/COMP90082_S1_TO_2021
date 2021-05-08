import React, {useState} from "react";
import "antd/dist/antd.css"
import {AppstoreOutlined, BarsOutlined, MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {
    Button,
    Select,
    Descriptions,
    Card, Form, Input, Row, Col, Space, DatePicker, InputNumber, Rate,
} from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";

const {Option} = Select;

const InformationDetail = () => {
    const [gender, setGender] = useState("Male");
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Wick");
    const [contact, setContact] = useState("6137708899");
    const [organization, setOrganization] = useState("");
    const [email, setEmail] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [addressLine3, setAddressLine3] = useState("");
    const [postcode, setPostcode] = useState("3054");
    const [region, setRegion] = useState("VIC");
    const [country, setCountry] = useState("Australia");
    const [height, setHeght] = useState(180);
    const [weight, setWeight] = useState(50);
    const [birthdate, setBirthdate] = useState("2013/1/1");
    const [dinResult, setDinResult] = useState(1314);
    const [shoeSize, setShoeSize] = useState(24);
    const [skierAbility, setSkierAbility] = useState(3);

    const editButton = (
        <div>
            <Button type="primary">
                <AppstoreOutlined/>
                Edit
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary">
                <BarsOutlined/>
                Calculate Din
            </Button>
        </div>
    )

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <Form style={{width: "1000px"}}
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}>
                <Row justify="space-between" gutter={16}>
                    <Col span={8}>
                        <Form.Item label="First Name" name="firstName"
                                   rules={[{required: true, message: "Please input your username!"}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Last Name" name="lastName"
                                   rules={[{required: true, message: "Please input your password!"}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Gender" name="gender"
                                   rules={[{required: true, message: "Please input your password!"}]}>
                            <Select placeholder="Gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="others">Others</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Birthdate" name="birthdate"
                                   rules={[{required: true, message: "Required"}]}>
                            <DatePicker/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="space-between" gutter={16}>
                    <Col span={4}>
                        <Form.Item label="Height" name="height"
                                   rules={[{required: true, message: "Please input your password!"}]}>
                            <Input type={"number"}/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Weight" name="weight"
                                   rules={[{required: true, message: "Please input your password!"}]}>
                            <Input type={"number"}/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Shoe Size" name="shoeSize"
                                   rules={[{required: true, message: "Please input your password!"}]}>
                            <Input type={"number"}/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Skier Ability" name="skierAbility"
                                   rules={[{required: true, message: "Please input your password!"}]}>
                            <Rate/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Din Result" name="dinResult"
                                   rules={[{required: true, message: "Please input your password!"}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Organization" name="organization"
                           rules={[{required: true, message: "Please input your password!"}]}>
                    <Input/>
                </Form.Item>
                <Row justify="space-between" gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Email" name="email"
                                   rules={[{required: true, message: "Please input your password!"}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Phone Number" name="phoneNumber"
                                   rules={[{required: true, message: "Please input your password!"}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="space-between" gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Region" name="region"
                                   rules={[{required: true, message: "Please input your password!"}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Postcode" name="postcode"
                                   rules={[{required: true, message: "Please input your password!"}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Country" name="country"
                                   rules={[{required: true, message: "Please input your password!"}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.List name="names"
                           rules={[
                               {required: true, message: "Please input your password!"}
                           ]}>
                    {(fields, {add, remove}, {errors}) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item label={index === 0 ? "Addresses" : ""}
                                           required={false}
                                           key={field.key}>
                                    <Form.Item
                                        {...field}
                                        validateTrigger={["onChange", "onBlur"]}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input passenger's name or delete this field.",
                                            }
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="Address line" style={{width: "60%"}}/>
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button type="dashed"
                                        onClick={() => add()}
                                        style={{width: "60%"}}
                                        icon={<PlusOutlined/>}>
                                    Add address line
                                </Button>
                                <Form.ErrorList errors={errors}/>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default InformationDetail
