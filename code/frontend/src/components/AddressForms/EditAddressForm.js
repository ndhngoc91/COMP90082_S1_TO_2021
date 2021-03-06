import {Button, Col, Form, Input, notification, Row, Select} from "antd";
import React, {useEffect, useState} from "react";
import {CityData, StateData} from "../../consts/StateData";
import {useForm} from "antd/es/form/Form";
import {useHandleAddAddress, useHandleEditAddress} from "../../hooks/AddressHooks";

const {Option} = Select;

const loginFormLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const loginFormTailLayout = {
    wrapperCol: {offset: 6, span: 18},
};

const EditAddressForm = ({fieldsValue}) => {
    const [form] = useForm();

    const [state, setState] = useState(fieldsValue.state);
    const [cities, setCities] = useState(CityData[StateData[0]]);
    const [city, setCity] = useState(fieldsValue.city);

    const [handleEditAddress, {handling}] = useHandleEditAddress();

    const onStateChange = value => {
        setState(value);
        setCities(CityData[value]);
        setCity(CityData[value][0])
    };

    const onCityChange = value => {
        setCity(value);
    };

    const onFinish = values => {
        values.id = fieldsValue.id;
        values.state = state;
        values.city = city;
        handleEditAddress(values, () => {
            notification.success({message: "Edit address successfully!"});
            location.reload();
        });
    };

    useEffect(() => {
        form.setFieldsValue(fieldsValue);
    }, [fieldsValue]);

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
                Edit
            </Button>
        </Form.Item>
    </Form>;
}

export default EditAddressForm;
