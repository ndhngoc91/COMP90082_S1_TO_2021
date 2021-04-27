import React from "react";
import {
    Form,
    Input,
    Button,
    Checkbox
} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {offset: 8, span: 16},
};


const CreatePackageForm = () => {
    const onFinish = values => {
        console.log(values);
    };

    const onFinishFailed = values => {
        console.log(values);
    }

    return (
        <Form{...layout} name="basic" initialValues={{remember: true}}
             onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item label="Username"
                       name="username"
                       hasFeedback
                       rules={[{required: true, message: 'Please input your username!'}]}>
                <Input/>
            </Form.Item>

            <Form.Item label="Password"
                       name="password"
                       hasFeedback
                       rules={[{required: true, message: 'Please input your password!'}]}>
                <Input.Password/>
            </Form.Item>

            <Form.List name="names"
                       rules={[
                           {
                               validator: async (_, names) => {
                                   if (!names || names.length < 1) {
                                       return Promise.reject(new Error('At least 1 product'));
                                   }
                               }
                           }
                       ]}>
                {(fields, {add, remove}, {errors}) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Products' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item{...field}
                                          validateTrigger={['onChange', 'onBlur']}
                                          rules={[
                                              {
                                                  required: true,
                                                  whitespace: true,
                                                  message: "Please input product's id or delete this field.",
                                              },
                                          ]}
                                          noStyle>
                                    <Input placeholder="Product Id" style={{width: '60%'}}/>
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item {...tailLayout}>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{width: '60%'}}
                                icon={<PlusOutlined/>}
                            >
                                Add field
                            </Button>
                            <Form.ErrorList errors={errors}/>
                        </Form.Item>
                    </>
                )}
            </Form.List>


            <Form.Item {...tailLayout} name="remember" valuePropName="checked" >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreatePackageForm;
