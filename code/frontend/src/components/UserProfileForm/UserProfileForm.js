import React, {useEffect, useState} from "react";
import "antd/dist/antd.css"
import {
    MailOutlined,
    MinusCircleOutlined,
    PhoneOutlined,
    PlusOutlined, TeamOutlined, UserOutlined
} from "@ant-design/icons";
import {
    Button, Select, Form, Input, Row, Col, DatePicker, Tag, Image, Space, notification
} from "antd";
import {StateData, CityData} from "../../consts/StateData";
import {useSkillLevels} from "../../hooks/SkillLevelHooks";
import {useHandleEditProfile, useUserProfile} from "../../hooks/UserHooks";
import {useStores} from "../../stores";

const {Option} = Select;

const UserProfileForm = () => {
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [footSize, setFootSize] = useState(0);
    const [din, setDin] = useState(0);
    const [cities, setCities] = useState(CityData[StateData[0]]);
    const [selectedState, setSelectedState] = useState(StateData[0]);
    const [selectedCity, setSelectedCity] = useState(CityData[StateData[0]]);
    const [readOnly, setReadOnly] = useState(true);

    const [form] = Form.useForm();

    const skillLevels = useSkillLevels();

    const {authStore: {user}} = useStores();

    const [handleEditProfile, {handling}] = useHandleEditProfile();

    useEffect(() => {
        setDin(height * 2 + weight * 3 + footSize * 4);
    }, [weight, height, footSize]);

    const onStateChange = value => {
        setCities(CityData[value]);
        setSelectedState(value);
        setSelectedCity(CityData[value][0])
    };

    const onCityChange = value => {
        setSelectedCity(value);
    };

    const onFinish = values => {
        values.id = user.id;
        handleEditProfile(values, () => {
            notification.success({message: "Edit profile successfully!"});
        }, () => {
            notification.success({message: "Failed to edit profile!"});
        });
    };

    return (
        <>
            <Space direction="vertical">
                <Image width={200} style={{borderRadius: "50%"}} preview={false}
                       src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                <Form style={{width: "1000px"}}
                      initialValues={user}
                      form={form}
                      name="basic"
                      layout="vertical"
                      onFinish={onFinish}>
                    <Row justify="space-between" gutter={16}>
                        <Col span={8}>
                            <Form.Item label="First Name" name="first_name"
                                       rules={[{required: true, message: "Please input your first name!"}]}>
                                <Input prefix={<UserOutlined/>} size="large" readOnly={readOnly}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Last Name" name="last_name"
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
                            <Form.Item label="Foot Size" name="foot_size"
                                       rules={[{required: true, message: "Required!"}]}>
                                <Input type={"number"} size="large" value={footSize} readOnly={readOnly}
                                       onChange={e => setFootSize(parseInt(e.currentTarget.value))}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Skill Level"
                                       name="skill_level_id"
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
                            <Form.Item label="Phone" name="phone"
                                       rules={[
                                           {required: true, message: "Please input your phone!"}
                                       ]}>
                                <Input prefix={<PhoneOutlined/>} size="large" readOnly={readOnly}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.List name="addresses">
                        {(fields, {add, remove}, {errors}) => (
                            <>
                                {fields.map(({key, name, fieldKey, ...field}) => (
                                    <Form.Item label={key === 0 ? "Addresses" : ""}
                                               required={false}
                                               key={key}>
                                        <Row justify="space-between" gutter={16}>
                                            <Col span={12}>
                                                <Form.Item{...field}
                                                          name={[name, 'address']}
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
                                                          name={[name, 'state']}
                                                          fieldKey={[fieldKey, 'state']}
                                                          validateTrigger={["onChange", "onBlur"]}
                                                          rules={[
                                                              {
                                                                  required: true,
                                                                  message: "Required!"
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
                                                          name={[name, 'city']}
                                                          fieldKey={[fieldKey, 'city']}
                                                          validateTrigger={["onChange", "onBlur"]}
                                                          rules={[
                                                              {
                                                                  required: true,
                                                                  message: "Required!",
                                                              }
                                                          ]}
                                                          noStyle>
                                                    <Select value={selectedCity}
                                                            onChange={onCityChange}
                                                            disabled={readOnly}
                                                            size="large"
                                                            placeholder="City">
                                                        {cities.map(city => (
                                                            <Option key={city} value={city}>{city}</Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item{...field}
                                                          name={[name, 'postcode']}
                                                          fieldKey={[fieldKey, 'postcode']}
                                                          validateTrigger={["onChange", "onBlur"]}
                                                          rules={[
                                                              {
                                                                  required: true,
                                                                  message: "Required!"
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

        </>
    );
}

export default UserProfileForm
