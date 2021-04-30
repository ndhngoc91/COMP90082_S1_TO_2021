import React, {Component} from 'react';
import {
    Form,
    Input
} from 'antd';

const Item = Form.Item
class AddGroup extends Component {
    render() {
        return (
            <Form>
                <Item>
                    <Input placeholder='Please input group name'></Input>
                </Item>

            </Form>
        );
    }
}

export default AddGroup;