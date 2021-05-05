import {
    Avatar,
    Collapse,
    Button,
    Card,
    Space,
    Modal,
    Form,
    Drawer,
    List,
    Divider,
    Col,
    Row,
    Select,
    Input
} from 'antd';
import React from "react";
import 'antd/dist/antd.css'
import {
    PlusOutlined,
} from "@ant-design/icons";



const { Panel } = Collapse;

const { Option } = Select;

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:  {content}</p>
    </div>
);

export default class FriendList extends React.Component{
    state ={
        modelVisible: 0,
        drawVisible:false,
        group_member:[],
        //这个数据之后通过axios异步访问url获取
        group:[
            {
                id: '1',
                name: 'group name 1',
                members: [
                    {
                        uid: '1',
                        user_name:'A1',
                        intro:'aaaaa'
                    },
                    {
                        uid: '2',
                        user_name:'A2',
                        intro:'bbbbb'
                    },

                ],
            },
            {
                id: '2',
                name: 'group name 2',
                members: [
                    {
                        uid: '3',
                        user_name:'A3',
                        intro:'cccc'
                    },
                    {
                        uid: '4',
                        user_name:'A4',
                        intro:'ddddd'
                    },
                ],
            },
        ]
    }


    // close the window
    handleCancel = () =>{
        this.setState({
            modelVisible: 0
        })
    }

    // add friend and close the window
    addFriend = () =>{
        this.setState({
            modelVisible: 0
        })
    }

    addFriendGroup = () =>{
        this.setState({
            modelVisible: 0
        })
    }



    showAddFriend = () =>{
        this.setState({
            modelVisible: 1
        })
    }

    showAddGroup = () =>{
        this.setState({
            modelVisible: 2
        })
    }

    showDrawer = (item) => {
        this.setState({
            drawVisible: true,
            group_member:item
        });
    };

    onClose = () => {
        this.setState({
            drawVisible: false,
        });
    };



    render() {
        const title = " Friend"
        const groups = this.state.group
        const group_member = this.state.group_member
        const FriendButton =(
            <div>
                <Button type = 'primary' onClick={()=>this.showAddFriend()}>
                    <PlusOutlined />
                    Add Friend
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type = "primary" onClick={()=>this.showAddGroup()}>
                    <PlusOutlined />
                    Add Group
                </Button>
            </div>
        )

        return (
            <div>
                <Card title={title} extra={FriendButton}>
                    <Collapse accordion>
                        {
                            groups.map((group) =>{
                                return(
                                    <Panel header={group.name} key={group.id}>
                                        <List
                                            dataSource={group.members}
                                            bordered
                                            key={group.id}
                                            renderItem={item => (
                                                <List.Item
                                                    key={item.uid}
                                                    actions={[
                                                        <a onClick={()=>this.showDrawer(item)} key={`a-${item.id}`}>
                                                            View Profile
                                                        </a>,
                                                    ]}
                                                >
                                                    <List.Item.Meta
                                                        avatar={
                                                            <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                                                        }
                                                        title={item.user_name}
                                                        description={item.intro}
                                                        key={item.uid}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </Panel>
                                )
                            })
                        }
                    </Collapse>
                </Card>

                {/*add friend*/}
                <Modal title="Add friend" visible={this.state.modelVisible===1} onOk={this.addFriend} onCancel={this.handleCancel} centered>

                    <Form>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input the username!' }]}
                        >
                            <Input placeholder="enter username" />
                        </Form.Item>
                        <Form.Item
                            label="Group"
                            name="group"
                            rules={[{ required: true }]}
                        >
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Choose one group"
                                optionFilterProp="children">
                                {
                                    groups.map((group)=>{
                                        return(<Option value={group.id} >{group.name}</Option>)
                                    })

                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>

                {/*add group*/}
                <Modal title="Add group" visible={this.state.modelVisible===2} onOk={this.addFriendGroup} onCancel={this.handleCancel} centered>
                    <Form>
                        <Form.Item
                            label="Group"
                            name="Group"
                            rules={[{ required: true, message: 'Please input the group name!' }]}
                        >
                            <Input placeholder="enter group name" />
                        </Form.Item>
                    </Form>
                </Modal>

                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.drawVisible}
                >
                    <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                        User Profile
                    </p>
                    <p className="site-description-item-profile-p">Personal</p>
                    <Row>
                        <Col span={12}>
                            <DescriptionItem title="Full Name" content={group_member.user_name} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <DescriptionItem
                                title="Intro"
                                content={group_member.intro}
                            />
                        </Col>
                    </Row>
                    <Divider />
                </Drawer>
            </div>
        )//end return
    }
}

