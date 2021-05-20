import {Button, Col, DatePicker, Form, Input, InputNumber, Row, Select} from "antd";
import React, {useEffect} from "react";
import {useForm} from "antd/es/form/Form";
import {useSkillLevels} from "../../hooks/SkillLevelHooks";
import {useStores} from "../../stores";
import moment from "moment";

const {Option} = Select;

const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const tailLayout = {
    wrapperCol: {offset: 6, span: 18},
};

const RecipientForm = ({cartItemId, onClose}) => {
    const [form] = useForm();

    const skillLevels = useSkillLevels();

    const {shoppingCartStore: {recipients, addRecipientForCartItem}} = useStores();

    useEffect(() => {
        if (recipients[cartItemId]) {
            recipients[cartItemId].birthday = moment(recipients[cartItemId].birthday);
            form.setFieldsValue(recipients[cartItemId])
        } else {
            form.resetFields();
        }
    }, [cartItemId]);

    const onFinish = recipient => {
        addRecipientForCartItem(recipient, cartItemId);
        onClose();
    };

    return <Form form={form}
                 {...layout}
                 onFinish={onFinish}>
        <Form.Item label="First Name"
                   name="firstName"
                   rules={[{required: true, message: "Please input your first name!"}]}>
            <Input/>
        </Form.Item>
        <Form.Item label="Last Name"
                   name="lastName"
                   rules={[{required: true, message: "Please input your first name!"}]}>
            <Input/>
        </Form.Item>
        <Form.Item label="Birthday"
                   name="birthday"
                   rules={[{required: true, message: "Please input your first name!"}]}>
            <DatePicker/>
        </Form.Item>
        <Form.Item label="Details">
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item noStyle name="height"
                               rules={[{required: true, message: "Please input your height!"}]}>
                        <InputNumber placeholder="Height"/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item noStyle name="weight"
                               rules={[{required: true, message: "Please input your weight!"}]}>
                        <InputNumber placeholder="Weight"/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item noStyle name="footSize"
                               rules={[{required: true, message: "Please input your foot size!"}]}>
                        <InputNumber placeholder="Foot Size"/>
                    </Form.Item>
                </Col>
            </Row>
        </Form.Item>

        <Form.Item label="Skill Level"
                   name="skillLevel"
                   rules={[{required: true, message: "Please input your first name!"}]}>
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
                {recipients[cartItemId] === undefined ? "Add" : "Edit"}
            </Button>
        </Form.Item>
    </Form>;
};

export default RecipientForm;
