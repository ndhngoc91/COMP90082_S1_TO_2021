import {Button, Col, Form, Input, notification, Row, Select} from "antd";
import React, {useState} from "react";
import {CityData, StateData} from "../../consts/StateData";
import {useForm} from "antd/es/form/Form";
import {useHandleAddAddress} from "../../hooks/AddressHooks";

const {Option} = Select;

const loginFormLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const loginFormTailLayout = {
    wrapperCol: {offset: 6, span: 18},
};

const AddAddressForm = () => {
    const [form] = useForm();

    const [state, setState] = useState(StateData[0]);
    const [cities, setCities] = useState(CityData[StateData[0]]);
    const [city, setCity] = useState(CityData[StateData[0]][0]);

    const [handleAddAddress, {handling}] = useHandleAddAddress();

    const onStateChange = value => {
        setState(value);
        setCities(CityData[value]);
        setCity(CityData[value][0])
    };

    const onCityChange = value => {
        setCity(value);
    };

    const onFinish = values => {
        values.state = state;
        values.city = city;
        handleAddAddress(values, () =>{
            notification.success({message: "Add a new address successfully!"});
            form.resetFields();
        });
    };

    return <Form form={form}
                 {...loginFormLayout}
                 onFinish={onFinish}>
        <Form.Item label="State">
            <Select value={state} onChange={onStateChange}>
                {StateData.map(state => (
                    <Option key={state} value={state}>{state}</Option>
                ))}
            </Select>
        </Form.Item>
        <Form.Item label="City">
            <Select value={city} onChange={onCityChange}>
                {cities.map(city => (
                    <Option key={city} value={city}>{city}</Option>
                ))}
            </Select>
        </Form.Item>
        <Form.Item label="Address Line"
                   name="address_line"
                   rules={[{required: true, message: 'Please input your address line!'}]}>
            <Input/>
        </Form.Item>
        <Form.Item label="Postcode"
                   name="postcode"
                   rules={[{required: true, message: 'Please input your postcode!'}]}>
            <Input/>
        </Form.Item>
        <Form.Item {...loginFormTailLayout}>
            <Button type="primary" htmlType="submit" loading={handling}>
                Add
            </Button>
        </Form.Item>
    </Form>;
}

export default AddAddressForm;
