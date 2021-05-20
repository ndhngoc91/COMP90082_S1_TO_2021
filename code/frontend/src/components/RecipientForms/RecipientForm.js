import {Button, Col, DatePicker, Form, Input, InputNumber, notification, Row, Select} from "antd";
import React from "react";
import {useForm} from "antd/es/form/Form";
import {useSkillLevels} from "../../hooks/SkillLevelHooks";

const {Option} = Select;

const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const tailLayout = {
    wrapperCol: {offset: 6, span: 18},
};

const RecipientForm = ({cartItemId}) => {
    const [form] = useForm();

    const skillLevels = useSkillLevels();

    const onFinish = values => {
        console.log(values);
    };

    return <Form form={form}
                 {...layout}
                 onFinish={onFinish}>
        <Form.Item label="First Name"
                   name="first_name"
                   rules={[{required: true, message: 'Please input your first name!'}]}>
            <Input/>
        </Form.Item>
        <Form.Item label="Last Name"
                   name="last_name"
                   rules={[{required: true, message: 'Please input your first name!'}]}>
            <Input/>
        </Form.Item>
        <Form.Item label="Birthday"
                   name="birthday"
                   rules={[{required: true, message: 'Please input your first name!'}]}>
            <DatePicker/>
        </Form.Item>
        <Form.Item label="Details">
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item noStyle name="height"
                               rules={[{required: true, message: 'Please input your height!'}]}>
                        <InputNumber placeholder="Height"/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item noStyle name="weight"
                               rules={[{required: true, message: 'Please input your weight!'}]}>
                        <InputNumber placeholder="Weight"/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item noStyle name="foot_size"
                               rules={[{required: true, message: 'Please input your foot size!'}]}>
                        <InputNumber placeholder="Foot Size"/>
                    </Form.Item>
                </Col>
            </Row>
        </Form.Item>

        <Form.Item label="Skill Level"
                   name="skill_level"
                   rules={[{required: true, message: 'Please input your first name!'}]}>
            <Select style={{width: "100%"}}>
                <Option key={-1} value={-1}>Select Skill Level</Option>
                {skillLevels.map((skillLevel, index) => {
                    return (
                        <Option key={index} value={skillLevel.id}>{skillLevel.name}</Option>
                    );
                })}
            </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
                Add
            </Button>
        </Form.Item>
    </Form>;
}

export default RecipientForm;
