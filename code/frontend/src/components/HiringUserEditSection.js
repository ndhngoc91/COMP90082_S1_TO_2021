import React, { useState } from "react";
import { Row } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import Searchbar from './Searchbar';
import EquipmentTable from './EquipmentTable';

const gutterInfo = { xs: 8, sm: 16, md: 24, lg: 32 };

const keyFormatter = key => {
    const regex = /[A-Z]/g;
    let formattedKey = key.replaceAll(regex, ' $&');
    return formattedKey[0].toUpperCase() + formattedKey.substr(1);
};

const HiringUserEditSection = ({customerInfo}) => {

    const userInfoHtml = _ => {
        let cols = [];
        Object.entries(customerInfo).forEach(([key, value], index) => {
            const formattedKey = keyFormatter(key);
            cols.push(
                <Col key={index} className="gutter-row" span={6}>
                    <Form.Item
                        initialValue={value}
                        label={`${formattedKey}`}
                        name={`${key}`}
                        id={uniqueId()}
                        style={{fontSize: "16px"}}>
                        <Input />
                    </Form.Item>
                </Col>
            )
        });

        cols.push(
            <Col key="equipment-button" className="gutter-row" span={6} offset={18}>
                <Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    size="large"
                    className="add-equipment-form-button"
                    onClick={_ => console.log('1')}
                >
                    Add an equipment
                </Button>
            </Col>
        )

        return cols;
    };

    return (
        <div className="hiring-user-edit-section">
            {
                userInfoHtml()
            }
            <EquipmentTable />
        </div>
        
    )
};

export default HiringUserEditSection;