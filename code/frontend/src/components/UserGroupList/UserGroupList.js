import {
    Avatar,
    Collapse,
    Button,
    List,
    Col,
    Row,
    Space,
    Typography,
    Popconfirm
} from "antd";
import React from "react";
import "antd/dist/antd.css"
import {
    DeleteOutlined, EditOutlined,
    PlusOutlined, SearchOutlined,
} from "@ant-design/icons";
import {useUserGroups} from "../../hooks/UserGroupHooks";
import {useStores} from "../../stores";


const {Title} = Typography;
const {Panel} = Collapse;

const SampleAvatar = () => <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>;

const UserGroupList = () => {
    const {authStore: {user}} = useStores();
    const [userGroups, {loading}] = useUserGroups(user.id);

    return (
        <>
            <Row justify="space-between">
                <Col>
                    <Title level={3}>User Groups</Title>
                </Col>
                <Col>
                    <Space>
                        <Button type="primary">
                            <PlusOutlined/>
                            Add Friend
                        </Button>
                        <Button type="primary">
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
                                <Button type="primary" ghost>
                                    <EditOutlined/>
                                    Edit
                                </Button>,
                                <Popconfirm title="Are you sure？"
                                            okText="Yes"
                                            cancelText="No">
                                    <Button type="primary" ghost>
                                        <DeleteOutlined/>
                                        Delete
                                    </Button>
                                </Popconfirm>
                            </Space>

                        }>
                            <List
                                dataSource={contacts}
                                bordered
                                key={"fdsafdas"}
                                renderItem={contact => (
                                    <List.Item key={contact.name}
                                               actions={[
                                                   <Popconfirm
                                                       title="Are you sure？"
                                                       okText="Yes"
                                                       cancelText="No">
                                                       <a>
                                                           <DeleteOutlined/> Delete
                                                       </a>
                                                   </Popconfirm>,
                                                   <a
                                                      key={`a-${contact.name}`}>
                                                       <SearchOutlined/> View Profile
                                                   </a>,
                                               ]}>
                                        <List.Item.Meta avatar={<SampleAvatar/>}
                                                        title={contact.name}
                                                        description={contact.name}
                                                        key={contact.name}/>
                                    </List.Item>
                                )}
                            />
                        </Panel>
                    )
                })}
            </Collapse>
        </>
    );
};

export default UserGroupList;
