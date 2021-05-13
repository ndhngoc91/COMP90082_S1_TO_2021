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
import {useHandleDeleteUserGroup, useUserGroups} from "../../hooks/UserGroupHooks";
import {useStores} from "../../stores";
import AddUserGroupForm from "./AddUserGroupForm";

const {Title, Link} = Typography;
const {Panel} = Collapse;

const SampleAvatar = () => <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>;

const UserGroupList = () => {
    const [drawVisible, setDrawVisible] = useState(false);
    const [addUserGroupFormVisible, setAddUserGroupFormVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState({});

    const {authStore: {user}} = useStores();
    const [userGroups] = useUserGroups(user.id);

    const [handleDeleteUserGroup, {handling: handlingDelete}] = useHandleDeleteUserGroup();

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
                    const contacts = JSON.parse(userGroup["contacts"]);
                    return (
                        <Panel header={userGroup.name} key={index} extra={
                            <Space>
                                <div onClick={e => e.stopPropagation()}>
                                    <Button type="primary" ghost
                                            loading={handlingDelete}>
                                        <EditOutlined/>
                                        Edit
                                    </Button>
                                </div>
                                <div onClick={e => e.stopPropagation()}>
                                    <Popconfirm title="Are you sure？"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => handleDeleteUserGroup(userGroup.id)}>
                                        <Button type="primary" ghost loading={handlingDelete}>
                                            <DeleteOutlined/>
                                            Delete
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </Space>

                        }>
                            <List dataSource={contacts}
                                  renderItem={contact => (
                                      <List.Item key={contact.name}
                                                 actions={[
                                                     <Popconfirm
                                                         title="Are you sure？"
                                                         okText="Yes"
                                                         cancelText="No">
                                                         <Link>
                                                             <DeleteOutlined/> Delete
                                                         </Link>
                                                     </Popconfirm>,
                                                     <Link key={`a-${contact.name}`}
                                                           onClick={() => {
                                                               setSelectedContact(contact);
                                                               setDrawVisible(true);
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
            <Modal title="Edit a package" visible={addUserGroupFormVisible} footer={null} closable={false}
                   onCancel={() => {
                       setAddUserGroupFormVisible(false);
                   }}>
                <AddUserGroupForm/>
            </Modal>
            <Drawer width={640}
                    placement="right"
                    closable={false}
                    onClose={() => setDrawVisible(false)}
                    visible={drawVisible}>
                {selectedContact.name}
            </Drawer>
        </>
    );
};

export default UserGroupList;
