import {
    Avatar, Collapse, Button, Modal, Form, Drawer, List, Divider, Col, Row, Select, Input, Space, Typography
} from "antd";
import React, {useState} from "react";
import "antd/dist/antd.css"
import {
    PlusOutlined,
} from "@ant-design/icons";


const {Title} = Typography;
const {Panel} = Collapse;

const {Option} = Select;

const DescriptionItem = ({title, content}) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}: {content}</p>
    </div>
);

const UserGroupList = () => {
    const [modelVisible, setModelVisible] = useState(0);
    const [drawVisible, setDrawVisible] = useState(false);
    const [groupMembers, setGroupMembers] = useState([]);
    const [groups, setGroups] = useState([
            {
                id: "1",
                name: "Group 1",
                members: [
                    {
                        uid: "1",
                        user_name: "A1",
                        intro: "aaaaa"
                    },
                    {
                        uid: "2",
                        user_name: "A2",
                        intro: "bbbbb"
                    },

                ],
            },
            {
                id: "2",
                name: "Group 2",
                members: [
                    {
                        uid: "3",
                        user_name: "A3",
                        intro: "cccc"
                    },
                    {
                        uid: "4",
                        user_name: "A4",
                        intro: "ddddd"
                    },
                ],
            },
        ]
    );

    // close the window
    const handleCancel = () => {
        setModelVisible(0);
    }

    // add friend and close the window
    const addFriend = () => {
        setModelVisible(0);
    }

    const addFriendGroup = () => {
        setModelVisible(0);
    }


    const showAddFriend = () => {
        setModelVisible(1);
    }

    const showAddGroup = () => {
        setModelVisible(2);
    }

    const showDrawer = (item) => {
        setDrawVisible(true);
        setGroupMembers(item);
    };

    const onClose = () => {
        setDrawVisible(false);
    };


    return (
        <>
            <Row justify="space-between">
                <Col>
                    <Title level={3}>User Groups</Title>
                </Col>
                <Col>
                    <Space>
                        <Button type="primary" onClick={() => showAddFriend()}>
                            <PlusOutlined/>
                            Add Friend
                        </Button>
                        <Button type="primary" onClick={() => showAddGroup()}>
                            <PlusOutlined/>
                            Add Group
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Collapse activeKey={["1", "2"]}>
                {groups.map((group) => {
                    return (
                        <Panel header={group.name} key={group.id}>
                            <List
                                dataSource={group.members}
                                bordered
                                key={group.id}
                                renderItem={item => (
                                    <List.Item key={item.uid}
                                               actions={[
                                                   <a onClick={() => showDrawer(item)} key={`a-${item.id}`}>
                                                       View Profile
                                                   </a>,
                                               ]}>
                                        <List.Item.Meta
                                            avatar={<Avatar
                                                src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>}
                                            title={item.user_name}
                                            description={item.intro}
                                            key={item.uid}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Panel>
                    )
                })}
            </Collapse>
            <Modal title="Add friend" visible={modelVisible === 1} onOk={addFriend}
                   onCancel={handleCancel} centered>
                <Form>
                    <Form.Item label="Username"
                               name="username"
                               rules={[{required: true, message: "Please input the username!"}]}>
                        <Input placeholder="enter username"/>
                    </Form.Item>
                    <Form.Item label="Group"
                               name="group"
                               rules={[{required: true}]}>
                        <Select showSearch
                                style={{width: 200}}
                                placeholder="Choose one group"
                                optionFilterProp="children">
                            {groups.map((group) => <Option value={group.id}>{group.name}</Option>)}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/*add group*/}
            <Modal title="Add group" visible={modelVisible === 2} onOk={addFriendGroup}
                   onCancel={handleCancel} centered>
                <Form>
                    <Form.Item
                        label="Group"
                        name="Group"
                        rules={[{required: true, message: "Please input the group name!"}]}
                    >
                        <Input placeholder="enter group name"/>
                    </Form.Item>
                </Form>
            </Modal>

            <Drawer width={640}
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={drawVisible}>
                <p className="site-description-item-profile-p" style={{marginBottom: 24}}>
                    User Profile
                </p>
                <p className="site-description-item-profile-p">Personal</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Full Name" content={groupMembers.user_name}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Intro"
                            content={groupMembers.intro}
                        />
                    </Col>
                </Row>
                <Divider/>
            </Drawer>
        </>
    );
}

export default UserGroupList;
