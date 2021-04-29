import React, {Component} from 'react';
import {Form, Input, Modal, Select} from "antd";

const Item = Form.Item
const Option = Select.Option

class AddFriend extends Component {

    onFinish = () => {
        console.log('Received values of form: ');
    };

    render() {
        //const {getFieldDecorator} = this.props.form
        return (
            <Form
                name="AddFriend"
                onFinish={this.onFinish}
            >
                <Item
                    label="Group:"
                    name="group"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select>
                        <Option value='0'>A</Option>
                        <Option value='1'>C</Option>
                        <Option value='2'>B</Option>
                    </Select>
                </Item>
                <Item
                    label="Name:"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder='Please input friend name'></Input>
                </Item>
                <Item
                    label="Email Address:"
                    name="email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder='Please input friend email address'></Input>
                </Item>

            </Form>
        );
    }
}

export default AddFriend;