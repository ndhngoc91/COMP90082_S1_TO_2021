import React, {useState} from "react";
import {Col, Row, Space, Table, Button, Typography, Modal, notification} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useHandleDeleteAddress, usePersonalAddresses} from "../hooks/AddressHooks";
import AddAddressForm from "./AddressForms/AddAddressForm";
import EditAddressForm from "./AddressForms/EditAddressForm";

const {Column} = Table;
const {Title, Link} = Typography;

const UserManagementPage = () => {
    const [isAddAddressFormModalVisible, setIsAddAddressFormModalVisible] = useState(false);
    const [isEditAddressFormModalVisible, setIsEditAddressFormModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const [addresses, {loading}] = usePersonalAddresses();
    const [handleDeleteAddress] = useHandleDeleteAddress();

    return (
        <>
            <Row justify="space-between">
                <Col>
                    <Title level={3}>Addresses</Title>
                </Col>
                <Col>
                    <Space>
                        <Button type="primary" onClick={() => setIsAddAddressFormModalVisible(true)}>
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
                <Column title="Action" render={record => (
                    <>
                        <Space size="middle">
                            <Link onClick={() => {
                                setSelectedRecord(record);
                                setIsEditAddressFormModalVisible(true);
                            }}>Edit</Link>
                            <Link onClick={() => {
                                handleDeleteAddress(record.id, () => {
                                    notification.success({message: "Delete address successfully!"});
                                    location.reload();
                                });
                            }}>Delete</Link>
                        </Space>
                    </>
                )}/>
            </Table>
            <Modal title="Add Address" visible={isAddAddressFormModalVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsAddAddressFormModalVisible(false);
                   }}>
                <AddAddressForm/>
            </Modal>
            <Modal title="Edit Address" visible={isEditAddressFormModalVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsEditAddressFormModalVisible(false);
                   }}>
                <EditAddressForm fieldsValue={selectedRecord}/>
            </Modal>
        </>

    );
};

export default UserManagementPage;
