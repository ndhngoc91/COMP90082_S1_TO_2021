import React from "react";
import {
    Form,
    Input,
    Select,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch
} from "antd";

const CreatePackageForm = () => {
    return (
        <>
            <Form labelCol={{span: 6}}
                  wrapperCol={{span: 14}}
                  layout="horizontal"
                  size="large">
                <Form.Item label="Name">
                    <Input/>
                </Form.Item>
                <Form.Item label="Description">
                    <Input/>
                </Form.Item>
                <Form.Item label="What Is Included">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="What Is Included">
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
                <Form.Item label="Switch">
                    <Switch/>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreatePackageForm;
