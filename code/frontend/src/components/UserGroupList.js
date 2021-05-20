import React, {useState} from "react";
import {
    Avatar,
    Collapse,
    Button,
    List,
    Col,
    Row,
    Space,
    Typography,
    Popconfirm, Drawer, Modal
} from "antd";
import {
    DeleteOutlined, EditOutlined,
    PlusOutlined, SearchOutlined,
} from "@ant-design/icons";
import {useHandleDeleteUserGroup, useHandleEditUserGroup, useUserGroups} from "../hooks/UserGroupHooks";
import {useStores} from "../stores";
import AddUserGroupForm from "./UserGroupList/AddUserGroupForm";
import EditUserGroupForm from "./UserGroupList/EditUserGroupForm";
import {useHandleFilterUsers} from "../hooks/UserHooks";

const {Title, Link} = Typography;
const {Panel} = Collapse;

const SampleAvatar = () => <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>;

const UserGroupList = () => {
    const [drawVisible, setDrawVisible] = useState(false);
    const [addUserGroupFormVisible, setAddUserGroupFormVisible] = useState(false);
    const [editUserGroupFormVisible, setEditUserGroupFormVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState({});
    const [selectedUserGroup, setSelectedUserGroup] = useState({});

    const {authStore: {id}} = useStores();
    const [userGroups] = useUserGroups(id);

    const [handleDeleteUserGroup] = useHandleDeleteUserGroup();
    const [handleFilterUsers, {users, filtering}] = useHandleFilterUsers();

    return (
        <>
            <Row justify="space-between">
                <Col>
                    <Title level={3}>User Groups</Title>
                </Col>
                <Col>
                    <Space>
                        <Button type="primary" onClick={() => setAddUserGroupFormVisible(true)}>
                            <PlusOutlined/>
                            Add Group
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Collapse defaultActiveKey={[0]}>
                {userGroups.map((userGroup, index) => {
                    return (
                        <Panel header={userGroup.name} key={index} extra={
                            <Space>
                                <div onClick={e => e.stopPropagation()}>
                                    <Button type="primary" ghost
                                            onClick={() => {
                                                setSelectedUserGroup(userGroup);
                                                setEditUserGroupFormVisible(true);
                                            }}>
                                        <EditOutlined/>
                                        Edit
                                    </Button>
                                </div>
                                <div onClick={e => e.stopPropagation()}>
                                    <Popconfirm title="Are you sure？"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={
                                                    () => {
                                                        handleDeleteUserGroup(userGroup.id)
                                                        location.reload();
                                                    }
                                                }>
                                        <Button type="primary" ghost>
                                            <DeleteOutlined/>
                                            Delete
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </Space>
                        }>
                            <List dataSource={userGroup.contacts}
                                  renderItem={contact => (
                                      <List.Item key={contact.name}
                                                 actions={[
                                                     <Link key={`a-${contact.name}`}
                                                           onClick={() => {
                                                               setDrawVisible(true);
                                                               handleFilterUsers(contact.name);
                                                               setSelectedContact(users);
                                                           }}>
                                                         <SearchOutlined/> View Profile
                                                     </Link>,
                                                 ]}>
                                          <List.Item.Meta avatar={<SampleAvatar/>}
                                                          title={contact.name}
                                                          description={contact.name}
                                                          key={contact.name}/>
                                      </List.Item>
                                  )}/>
                        </Panel>
                    )
                })}
            </Collapse>
            <Modal title="Add a user group" visible={addUserGroupFormVisible} footer={null} closable={false}
                   onCancel={() => {
                       setAddUserGroupFormVisible(false);
                   }}>
                <AddUserGroupForm/>
            </Modal>
            <Modal title="Edit user group" visible={editUserGroupFormVisible} footer={null} closable={false}
                   onCancel={() => {
                       setEditUserGroupFormVisible(false);
                   }}>
                <EditUserGroupForm fieldsValue={selectedUserGroup}/>
            </Modal>
            <Drawer width={400}
                    placement="right"
                    closable={false}
                    onClose={() => setDrawVisible(false)}
                    visible={drawVisible}>

                <p >
                    User Profile
                </p>
                <Row>
                    <Col span={12}>
                        <p>Username：</p>
                        {selectedContact.height}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <p>First Name：</p>
                        {selectedContact.first_name}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <p>Last Name：</p>
                        {selectedContact.last_name}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <p>Gender：</p>
                        {selectedContact.gender}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <p>Phone：</p>
                        {selectedContact.phone}
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <p>Email：</p>
                        {selectedContact.email}
                    </Col>
                </Row>
            </Drawer>
        </>
    )
};

export default UserGroupList;
