import React, {useState} from "react";
import {
    Collapse, Button, Col, Row, Space, Typography, Popconfirm, Drawer, Modal, Table, Tag
} from "antd";
import {
    DeleteOutlined, EditOutlined, PlusOutlined
} from "@ant-design/icons";
import {useHandleDeleteUserGroup, useUserGroups} from "../../hooks/UserGroupHooks";
import {useStores} from "../../stores";
import AddUserGroupForm from "./AddUserGroupForm";
import EditUserGroupForm from "./EditUserGroupForm";

const {Title} = Typography;
const {Panel} = Collapse;
const {Column} = Table;

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const UserGroupList = () => {
    const [drawVisible, setDrawVisible] = useState(false);
    const [addUserGroupFormVisible, setAddUserGroupFormVisible] = useState(false);
    const [editUserGroupFormVisible, setEditUserGroupFormVisible] = useState(false);
    const [selectedContact] = useState({});
    const [selectedUserGroup, setSelectedUserGroup] = useState({});

    const {authStore: {id}} = useStores();
    const [userGroups] = useUserGroups(id);

    const [handleDeleteUserGroup] = useHandleDeleteUserGroup();

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
                            <Table dataSource={data} pagination={false}>
                                <Column title="Name" dataIndex="name" key="name" render={text => <a>{text}</a>}/>
                                <Column title="Age" dataIndex="age" key="age"/>
                                <Column title="Address" dataIndex="address" key="address"/>
                                <Column title="Tags" dataIndex="tags" key="tags" render={tags =>
                                    <>
                                        {tags.map(tag => {
                                            let color = tag.length > 5 ? 'geekblue' : 'green';
                                            if (tag === 'loser') {
                                                color = 'volcano';
                                            }
                                            return (
                                                <Tag color={color} key={tag}>
                                                    {tag.toUpperCase()}
                                                </Tag>
                                            );
                                        })}
                                    </>}
                                />
                            </Table>
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
            <Drawer width={640}
                    placement="right"
                    closable={false}
                    onClose={() => setDrawVisible(false)}
                    visible={drawVisible}>
                {selectedContact.name}
            </Drawer>
        </>
    )
};

export default UserGroupList;
