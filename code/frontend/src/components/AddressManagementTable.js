import React, {useState} from "react";
import {Col, Row, Space, Table, Button, Typography, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {usePersonalAddresses} from "../hooks/AddressHooks";
import AddAddressForm from "./AddressForms/AddAddressForm";

const {Column} = Table;
const {Title} = Typography;

const UserManagementPage = () => {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

    const [addresses, {loading}] = usePersonalAddresses();

    return (
        <>
            <Row justify="space-between">
                <Col>
                    <Title level={3}>Addresses</Title>
                </Col>
                <Col>
                    <Space>
                        <Button type="primary" onClick={() => setIsLoginModalVisible(true)}>
                            <PlusOutlined/>
                            Add Address
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Table dataSource={addresses} loading={loading}>
                <Column title="State" dataIndex="state"/>
                <Column title="City" dataIndex="city"/>
                <Column title="Postcode" dataIndex="postcode"/>
                <Column title="Address Line" dataIndex="address_line"/>
                <Column title="Action" render={(text, record) => (
                    <>
                        <Space size="middle">
                            <a>Edit</a>
                            <a>Delete</a>
                        </Space>
                    </>
                )}/>
            </Table>
            <Modal title="Add Address" visible={isLoginModalVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsLoginModalVisible(false);
                   }}>
                <AddAddressForm/>
            </Modal>
        </>

    );
};

export default UserManagementPage;
