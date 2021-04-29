import React from "react";
import {
    Form,
    Input,
    Select,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from "antd";

const AddProductForm = () => {
    return (
        <>
            <Form labelCol={{span: 6}}
                  wrapperCol={{span: 14}}
                  layout="horizontal"
                  size="large">
                <Form.Item label="Product Name">
                    <Input/>
                </Form.Item>
                <Form.Item label="Group">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="TreeSelect">
                    <TreeSelect
                        treeData={[
                            {title: "Light", value: "light", children: [{title: "Bamboo", value: "bamboo"}]},
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Date Picker">
                    <DatePicker/>
                </Form.Item>
                <Form.Item label="Quatity">
                    <InputNumber/>
                </Form.Item>
                <Form.Item label="Luxury">
                    <Switch/>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddProductForm;
