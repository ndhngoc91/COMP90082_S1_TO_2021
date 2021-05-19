import React, {useState} from "react";
import {Form, Input, Button, Space, notification} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {useHandleAddUserGroup} from "../../hooks/UserGroupHooks";

const AddUserGroupForm = () => {
    const [form] = Form.useForm();

    const [handleAddUserGroup, {handling}] = useHandleAddUserGroup();

    const onFinish = values => {
        const contacts = [];
        values.contacts.forEach(contact => {
            contacts.push({"name": contact});
        });
        values.contacts = JSON.stringify(contacts);
        handleAddUserGroup(values, () => {
            form.resetFields();
            notification.success({message: "Create new user group successfully!"});
            location.reload();
        });
    };

    return (
        <Form form={form} onFinish={onFinish} autoComplete="off">
            <Form.Item name="name" label="Name" rules={[{required: true, message: 'Missing area'}]}>
                <Input/>
            </Form.Item>
            <Form.List name="contacts">
                {(fields, {add, remove}) => (
                    <>
                        {fields.map(field => (
                            <Space key={field.key} align="baseline">
                                <Form.Item
                                    {...field}
                                    label="Contact"
                                    rules={[{required: true, message: 'Missing name'}]}>
                                    <Input/>
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(field.name)}/>
                            </Space>
                        ))}

                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                Add contacts
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={handling}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddUserGroupForm;
