import React, {useEffect, useState} from "react";
import "antd/dist/antd.css"
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {
    Button,
    Select,
    Form, Input, Row, Col, DatePicker, Rate, Tag, Image, Space,
} from "antd";

const {Option} = Select;

const UserProfileForm = () => {
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [shoeSize, setShoeSize] = useState(0);
    const [skierAbility, setSkierAbility] = useState(0);
    const [din, setDin] = useState(0);

    useEffect(() => {
        setDin(height * 2 + weight * 3 + shoeSize * 4 + skierAbility * 5);
    }, [weight, height, shoeSize, skierAbility]);

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <Space direction="vertical">
                <Image width={200} style={{borderRadius: "50%"}} preview={false}
                       src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                <Form style={{width: "1000px"}}
                      name="basic"
                      layout="vertical"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}>
                    <Row justify="space-between" gutter={16}>
                        <Col span={8}>
                            <Form.Item label="First Name" name="firstName"
                                       rules={[{required: true, message: "Please input your first name!"}]}>
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Last Name" name="lastName"
                                       rules={[{required: true, message: "Please input your last name!"}]}>
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Gender" name="gender"
                                       rules={[{required: true, message: "Required"}]}>
                                <Select placeholder="Gender" size="large">
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="others">Others</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Birthdate" name="birthdate"
                                       rules={[{required: true, message: "Required"}]}>
                                <DatePicker size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="space-between" gutter={16}>
                        <Col span={4}>
                            <Form.Item label="Height (cm)" name="height"
                                       rules={[{required: true, message: "Required!"}]}>
                                <Input type={"number"} size="large" value={height}
                                       onChange={e => setHeight(parseInt(e.currentTarget.value))}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Weight (kg)" name="weight"
                                       rules={[{required: true, message: "Required!"}]}>
                                <Input type={"number"} size="large" value={weight}
                                       onChange={e => setWeight(parseInt(e.currentTarget.value))}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Shoe Size" name="shoeSize"
                                       rules={[{required: true, message: "Required!"}]}>
                                <Input type={"number"} size="large" value={shoeSize}
                                       onChange={e => setShoeSize(parseInt(e.currentTarget.value))}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Skier Ability" name="skierAbility"
                                       rules={[{required: true, message: "Required!"}]}>
                                <Rate value={skierAbility} onChange={value => setSkierAbility(value)}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="DIN">
                                <Tag color="green" style={{fontSize: "25px", padding: "5px"}}>{din}</Tag>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Organization" name="organization"
                               rules={[{required: true, message: "Please input your organization!"}]}>
                        <Input size="large"/>
                    </Form.Item>
                    <Row justify="space-between" gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Email" name="email"
                                       rules={[
                                           {required: true, message: "Please input your email!"},
                                           {type: "email", message: "Email is not valid!"}
                                       ]}>
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Phone Number" name="phoneNumber"
                                       rules={[
                                           {required: true, message: "Please input your phone number!"}
                                       ]}>
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="space-between" gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Region" name="region"
                                       rules={[{required: true, message: "Please input your region!"}]}>
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Postcode" name="postcode"
                                       rules={[{required: true, message: "Please input your postcode!"}]}>
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Country" name="country"
                                       rules={[{required: true, message: "Please input your country!"}]}>
                                <Input size="large"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.List name="addressLines"
                               rules={[
                                   {required: true, message: "Please input your address lines!"}
                               ]}>
                        {(fields, {add, remove}, {errors}) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item label={index === 0 ? "Addresses" : ""}
                                               required={false}
                                               key={field.key}>
                                        <Form.Item{...field}
                                                  validateTrigger={["onChange", "onBlur"]}
                                                  rules={[
                                                      {
                                                          required: true,
                                                          whitespace: true,
                                                          message: "Please input passenger's name or delete this field.",
                                                      }
                                                  ]}
                                                  noStyle>
                                            <Input size="large" placeholder="Address line" style={{width: "60%"}}/>
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
                                            size="large"
                                            icon={<PlusOutlined/>}>
                                        Add address line
                                    </Button>
                                    <Form.ErrorList errors={errors}/>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Space>

        </>
    );
}

export default UserProfileForm
