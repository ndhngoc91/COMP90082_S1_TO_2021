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
import {useHandleEditProfile} from "../../hooks/UserHooks";
import {useStores} from "../../stores";
import {SkierCode} from "../../utils/SkierCode";
import moment from "moment";

const {Option} = Select;

const UserProfileForm = () => {
    const {authStore: {values: initialValues, din, login}} = useStores();

    const [height, setHeight] = useState(initialValues.height);
    const [weight, setWeight] = useState(initialValues.weight);
    const [footSize, setFootSize] = useState(initialValues.foot_size);
    const [skill_level_id, setSkillLevel] = useState(initialValues.skill_level_id);
    const [birthday, setBirthday] = useState(initialValues.birthday);
    const [estimatedDin, setEstimatedDin] = useState(0);
    const [cities, setCities] = useState(CityData[StateData[0]]);
    const [selectedState, setSelectedState] = useState(StateData[0]);
    const [selectedCity, setSelectedCity] = useState(CityData[StateData[0]]);
    const [editing, setEditing] = useState(false);
    const [age, setAge] = useState(moment().year()-initialValues.birthday.year())

    const [form] = Form.useForm();

    const skillLevels = useSkillLevels();

    const [handleEditProfile, {handling}] = useHandleEditProfile();

    useEffect(() => {
        console.log("weight",weight);
        console.log("height",height);
        console.log("footsize",footSize);
        console.log(age);
        console.log("skill",skill_level_id);
        setEstimatedDin(SkierCode({weight, height, skill_level_id, age, footSize}));
        console.log("din",estimatedDin);
    }, [weight, height, skill_level_id,age,footSize]);

    const onStateChange = value => {
        setCities(CityData[value]);
        setSelectedState(value);
        setSelectedCity(CityData[value][0])
    };

    const onCityChange = value => {
        setSelectedCity(value);
    };

    const onFinish = values => {
        values.birthday = values.birthday.format("YYYY-MM-DD");
        values = Object.assign(initialValues, values)
        handleEditProfile(values, () => {
            notification.success({message: "Edit profile successfully!"});
            login(values); // reset store
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
                      initialValues={initialValues}
                      form={form}
                      name="basic"
                      layout="vertical"
                      onFinish={onFinish}>
                    <Row justify="space-between" gutter={16}>
                        <Col span={8}>
                            <Form.Item label="First Name" name="first_name"
                                       rules={[{required: true, message: "Please input your first name!"}]}>
                                <Input prefix={<UserOutlined/>} size="large" readOnly={editing === false}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Last Name" name="last_name"
                                       rules={[{required: true, message: "Please input your last name!"}]}>
                                <Input prefix={<TeamOutlined/>} size="large" readOnly={editing === false}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Gender" name="gender"
                                       rules={[{required: true, message: "Required"}]}>
                                <Select placeholder="Gender" size="large" disabled={editing === false}>
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="others">Others</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Birthday" name="birthday"
                                       rules={[{required: true, message: "Required"}]}>
                                <DatePicker size="large" disabled={editing === false}
                                            value={birthday}
                                            onChange={
                                                e => {
                                                    setBirthday(e);
                                                    const period = moment().year()-e._d.getFullYear();
                                                    setAge(period);
                                                }
                                            }/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="space-between" gutter={16}>
                        <Col span={4}>
                            <Form.Item label="Height (cm)" name="height"
                                       rules={[
                                           {required: true, message: "Required!"},
                                           ({getFieldValue}) => ({
                                               validator(_, value) {
                                                   if (parseInt(getFieldValue("height")) > 200) {
                                                       return Promise.reject("Invalid height!");
                                                   }
                                                   return Promise.resolve();
                                               },
                                           })]}>
                                <Input type={"number"} size="large" value={height} readOnly={editing === false}
                                       onChange={e => setHeight(parseInt(e.currentTarget.value))}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Weight (kg)" name="weight"
                                       rules={[
                                           {required: true, message: "Required!"},
                                           ({getFieldValue}) => ({
                                               validator(_, value) {
                                                   if (parseInt(getFieldValue("weight")) > 100) {
                                                       return Promise.reject("Invalid weight!");
                                                   }
                                                   return Promise.resolve();
                                               },
                                           })
                                       ]}>
                                <Input type={"number"} size="large" value={weight} readOnly={editing === false}
                                       onChange={e => setWeight(parseInt(e.currentTarget.value))}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Foot Size (mm)" name="foot_size"
                                       rules={[{required: true, message: "Required!"}]}>
                                <Input type={"number"} size="large" value={footSize} readOnly={editing === false}
                                       onChange={e => setFootSize(parseInt(e.currentTarget.value))}/>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Skill Level"
                                       name="skill_level_id"
                                       rules={[{required: true, message: "Required!"}]}>
                                <Select placeholder="Select Skill Level" disabled={editing === false}
                                        value={skill_level_id} onChange={e => setSkillLevel(parseInt(e))}>
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
                                <Tag color="green" style={{
                                    fontSize: "25px",
                                    padding: "5px"
                                }}>
                                    {estimatedDin ? estimatedDin : din}
                                </Tag>
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
                                <Input prefix={<MailOutlined/>} size="large" readOnly={editing === false}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Phone" name="phone"
                                       rules={[
                                           {required: true, message: "Please input your phone!"}
                                       ]}>
                                <Input prefix={<PhoneOutlined/>} size="large" readOnly={editing === false}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        {editing === false &&
                        <Button type="primary" size="large" onClick={() => setEditing(true)}>
                            Edit
                        </Button>}
                        {editing &&
                        <Space>
                            <Button type="primary" htmlType="submit" size="large" loading={handling}>
                                Submit
                            </Button>
                            <Button type="default" size="large" onClick={() => setEditing(false)}>
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
