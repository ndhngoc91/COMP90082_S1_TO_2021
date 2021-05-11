import React, {useEffect, useState} from "react";
import "antd/dist/antd.css"
import {
    MailOutlined,
    MinusCircleOutlined,
    PhoneOutlined,
    PlusOutlined, TeamOutlined, UserOutlined
} from "@ant-design/icons";
import {
    Button, Select, Form, Input, Row, Col, DatePicker, Rate, Tag, Image, Space
} from "antd";
import moment from "moment";
import {StateData, CityData} from "../../consts/StateData";
import {useSkillLevels} from "../../hooks/SkillLevelHooks";

const {Option} = Select;

const UserProfileForm = () => {
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [shoeSize, setShoeSize] = useState(0);
    const [skierAbility, setSkierAbility] = useState(0);
    const [din, setDin] = useState(0);
    const [cities, setCities] = useState(CityData[StateData[0]]);
    const [selectedState, setSelectedState] = useState(StateData[0]);
    const [selectedCity, setSelectedCity] = useState(CityData[StateData[0]]);
    const [readOnly, setReadOnly] = useState(true);

    const [form] = Form.useForm();

    const skillLevels = useSkillLevels();

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
    };

    const onFinishFailed = errorInfo => {
        console.log(form.isFieldsTouched())
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <Space direction="vertical">
                <Image width={200} style={{borderRadius: "50%"}} preview={false}
                       src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                <Form style={{width: "1000px"}}
                      initialValues={{
                          firstName: "Ruby",
                          lastName: "Nguyen",
                          gender: "male",
                          birthdate: moment('2015-06-06', 'YYYY-MM-DD'),
                          height: 178,
                          weight: 75,
                          shoeSize: 3,
                          skierAbility: 2,
                          organization: "Melb Uni",
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
                        <Col span={4}>
                            <Form.Item label="Gender" name="gender"
                                       rules={[{required: true, message: "Required"}]}>
                                <Select placeholder="Gender" size="large" disabled={readOnly}>
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="others">Others</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Birthdate" name="birthdate"
                                       rules={[{required: true, message: "Required"}]}>
                                <DatePicker size="large" disabled={readOnly}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="space-between" gutter={16}>
                        <Col span={4}>
                            <Form.Item label="Height (cm)" name="height"
                                       rules={[{required: true, message: "Required!"}]}>
                                <Input type={"number"} size="large" value={height} readOnly={readOnly}
                                       onChange={e => setHeight(parseInt(e.currentTarget.value))}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Weight (kg)" name="weight"
                                       rules={[{required: true, message: "Required!"}]}>
                                <Input type={"number"} size="large" value={weight} readOnly={readOnly}
                                       onChange={e => setWeight(parseInt(e.currentTarget.value))}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Shoe Size" name="shoeSize"
                                       rules={[{required: true, message: "Required!"}]}>
                                <Input type={"number"} size="large" value={shoeSize} readOnly={readOnly}
                                       onChange={e => setShoeSize(parseInt(e.currentTarget.value))}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Skill Ability"
                                       name="skill_ability"
                                       hasFeedback
                                       rules={[{required: true, message: "Required!"}]}>
                                <Select placeholder="Select Skill Level" disabled={readOnly}>
                                    {skillLevels.map((skillLevel, index) => {
                                        return (
                                            <Option key={index} value={skillLevel.id}>{skillLevel.name}</Option>
                                        );
                                    })}
                                </Select>
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
                    {/*
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
                    */}
                    <Form.List name="addressLines"
                               rules={[
                                   {
                                       required: true,
                                       message: "Please input your address lines!"
                                   },
                                   {
                                       validator: async (_, addressLines) => {
                                           if (!addressLines ) {
                                               return Promise.reject(new Error('At least 1 address'));
                                           }
                                       },
                                   },
                               ]}
                    >
                        {(fields, {add, remove}, {errors}) => (
                            <>
                                {fields.map(({key,name,fieldKey,...field}) => (
                                    <Form.Item label={key === 0 ? "Addresses" : ""}
                                               required={false}
                                               key={key}>
                                        <Row justify="space-between" gutter={16}>
                                            <Col span={12}>
                                                <Form.Item{...field}
                                                          name = {[name,'address']}
                                                          fieldKey={[fieldKey, 'address']}
                                                          validateTrigger={["onChange", "onBlur"]}
                                                          rules={[
                                                              {
                                                                  required: true,
                                                                  whitespace: true,
                                                                  message: "Please input address or delete this field.",
                                                              }
                                                          ]}
                                                          noStyle>
                                                    <Input size="large"
                                                           placeholder="Address line"
                                                           readOnly={readOnly}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item{...field}
                                                          name = {[name,'state']}
                                                          fieldKey={[fieldKey, 'state']}
                                                          validateTrigger={["onChange", "onBlur"]}
                                                          rules={[
                                                              {
                                                                  required: true,
                                                                  message: "Please select your state!"
                                                              }
                                                          ]}
                                                          noStyle>
                                                    <Select
                                                        value={selectedState}
                                                        onChange={onStateChange}
                                                        disabled={readOnly}
                                                        size="large"
                                                        placeholder="State"
                                                    >
                                                        {StateData.map(state => (
                                                            <Option key={state} value={state}>{state}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item{...field}
                                                          name = {[name,'city']}
                                                          fieldKey={[fieldKey, 'city']}
                                                          validateTrigger={["onChange", "onBlur"]}
                                                          rules={[
                                                              {
                                                                  required: true,
                                                                  whitespace: true,
                                                                  message: "Please select city.",
                                                              }
                                                          ]}
                                                          noStyle>
                                                    <Select
                                                        value={selectedCity}
                                                        onChange={onCityChange}
                                                        disabled={readOnly}
                                                        size="large"
                                                        placeholder="City"
                                                    >
                                                        {cities.map(city => (
                                                            <Option key={city} value={city}>{city}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item{...field}
                                                          name = {[name,'postcode']}
                                                          fieldKey={[fieldKey, 'postcode']}
                                                          validateTrigger={["onChange", "onBlur"]}
                                                          rules={[
                                                              {
                                                                  required: true,
                                                                  message: "Please input postcode!"
                                                              }
                                                          ]}
                                                          noStyle>
                                                    <Input
                                                        disabled={readOnly}
                                                        size="large"
                                                        placeholder="Postcode"
                                                    >
                                                    </Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button type="dashed"
                                            onClick={() => add()}
                                            style={{width: "60%"}}
                                            size="large"
                                            icon={<PlusOutlined/>}
                                            disabled={readOnly}>
                                        Add address line
                                    </Button>
                                    <Form.ErrorList errors={errors}/>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        {readOnly &&
                        <Button type="primary" size="large" onClick={() => setReadOnly(false)}>
                            Edit
                        </Button>}
                        {readOnly === false &&
                        <Space>
                            <Button type="primary" htmlType="submit" size="large">
                                Submit
                            </Button>
                            <Button type="default" size="large" onClick={() => setReadOnly(true)}>
                                Cancel
                            </Button>
                        </Space>}
                    </Form.Item>
                </Form>
            </Space>

        </>
    );
}

export default UserProfileForm
