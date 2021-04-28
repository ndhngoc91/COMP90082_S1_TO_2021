import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Searchbar from "./Searchbar";
import EquipmentTable from "./EquipmentTable";
import { uniqueId } from "lodash";

const gutterInfo = { xs: 8, sm: 16, md: 24, lg: 32 };

const keyFormatter = key => {
    const regex = /[A-Z]/g;
    let formattedKey = key.replaceAll(regex, ' $&');
    return formattedKey[0].toUpperCase() + formattedKey.substr(1);
};

const HiringUserEditSection = ({userData, userIndex}) => {
    console.log(userData);
    const headerInfo = userIndex === 0 ? "Main Contact Information" : `Accompanying Customer ${userIndex}`;

    return (
        <div className="hiring-user-edit-section">
            <Divider>{headerInfo}</Divider>
            <Row gutter={gutterInfo} justify="space-around">
                <Col className="gutter-row" span={6}>
                    <Form.Item
                        initialValue={userData.title}
                        label="Title"
                        name="title"
                        id={uniqueId()}
                        style={{frontSize: "16px"}}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Form.Item
                        initialValue={userData.firstName}
                        label="First Name"
                        name="firstName"
                        id={uniqueId()}
                        style={{frontSize: "16px"}}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Form.Item
                        initialValue={userData.lastName}
                        label="Last Name"
                        name="lastName"
                        id={uniqueId()}
                        style={{frontSize: "16px"}}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Form.Item
                        initialValue={userData.dateOfBirth}
                        label="Date of Birth"
                        name="dateOfBirth"
                        id={uniqueId()}
                        style={{frontSize: "16px"}}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Form.Item
                        initialValue={userData.phoneNumber}
                        label="Phone Number"
                        name="phoneNumber"
                        id={uniqueId()}
                        style={{frontSize: "16px"}}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Form.Item
                        initialValue={userData.email}
                        label="Email Address"
                        name="email"
                        id={uniqueId()}
                        style={{frontSize: "16px"}}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Form.Item
                        initialValue={userData.height}
                        label="Height(cm)"
                        name="height"
                        id={uniqueId()}
                        style={{frontSize: "16px"}}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                    <Form.Item
                        initialValue={userData.weight}
                        label="Weight(kg)"
                        name="weight"
                        id={uniqueId()}
                        style={{frontSize: "16px"}}>
                        <Input />
                    </Form.Item>
                </Col>
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
            </Row>
            <EquipmentTable />
        </div>
        
    )
};

export default HiringUserEditSection;