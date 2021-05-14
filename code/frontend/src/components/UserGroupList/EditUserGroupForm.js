import React, {useEffect} from "react";
import {Form, Input, Button, Space, notification} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {useHandleEditUserGroup} from "../../hooks/UserGroupHooks";

const EditUserGroupForm = ({fieldsValue}) => {
    const [form] = Form.useForm();

    const [handleEditUserGroup, {handling}] = useHandleEditUserGroup();

    useEffect(() => {
        form.setFieldsValue(fieldsValue);
    }, []);

    const onFinish = values => {
        const contacts = [];
        values.contacts.forEach(contact => {
            contacts.push({"name": contact});
        });
        values.contacts = JSON.stringify(contacts);
        handleEditUserGroup(values, () => {
            notification.success({message: "Edit user group successfully!"});
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

export default EditUserGroupForm;
