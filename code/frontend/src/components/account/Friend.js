import {Form,Table, Input, Collapse, Button} from 'antd';
import React from "react";
import 'antd/dist/antd.css'
import AddGroup from "./group/AddGroup";
import AddFriend from "./group/AddFriend";
import Modal from "antd/es/modal/Modal";

const { Panel } = Collapse;
const { Search } = Input;

class Friend extends React.Component{

    state = {
        group1:[
            {
                key: '1',
                name: 'Mike',
                address: '10 Downing Street',
            },
            {
                key: '2',
                name: 'John',
                address: '10 Downing Street',
            },
        ],
        count:2,
        showStatus:0, //标识两个确认框是否显示。0表示都不显示，1表示显示AddGroup。2表示显示Add friend
    }

    /*
    初始化table所有列的数组
     */
    initColumns = () => {
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Action',
                dataIndex: '',
                render: () => <a>Delete</a>,
            },
        ];
    }

    /*
    异步获取朋友列表，需要调用接口请求函数
     */
    getGroup1 = () => {

    }


    /*
    为第一次render准备数据。请求之后的同步回调。
     */
    componentWillMount() {
        this.initColumns()
    }

    //执行异步任务：发异步Ajax请求
    componentDidMount() {
        /*
        获取朋友列表
         */
        this.getGroup1()
    }

    showAddGroup = () =>{
        this.setState({
            showStatus:2
        })
    }
    handleAddGroup = () =>{
        console.log('addGroup()')
    }

    showAddFriend = () =>{
        this.setState({
            showStatus:1
        })
    }
    handleAddFriend = () =>{
        console.log('addFriend()')
    }

    handleCancel = () =>{
        this.setState({
            showStatus:0
        })
    }


    render() {
        const {group1,showStatus} = this.state

        return (
            <div>
                <h3>Friend List</h3>
                <div style={{ textAlign: 'center' }}>
                    <Search placeholder="enter user name" style={{ width: 500 }} enterButton />
                    <Button type="primary" style={{ float: 'right' }} onClick={this.showAddFriend}>
                        add friend
                    </Button>
                    <Modal
                        title="add friends"
                        visible={showStatus===1}
                        onOk={this.handleAddFriend}
                        onCancel={this.handleCancel}
                    >
                        <AddFriend/>
                    </Modal>
                    <Button type="primary" style={{ float: 'right' }} onClick={this.showAddGroup}>add group</Button>
                    <Modal
                        title="add a new group"
                        visible={showStatus===2}
                        onOk={this.handleAddGroup}
                        onCancel={this.handleCancel}
                    >
                        <AddGroup/>
                    </Modal>
                </div>
                <br/>
                <Collapse>
                    <Panel header="Group Name 1" key="1">
                        <Form name="basicForm">
                            <Table
                                bordered={true}
                                dataSource={group1}
                                columns={this.columns}
                            />
                        </Form>

                    </Panel>
                    <Panel header="Group Name 2" key="2">
                        <h1>Name2</h1>
                        <h1>Name2</h1>
                        <h1>Name2</h1>
                        <h1>Name2</h1>

                    </Panel>
                    <Panel header="Group Name 3" key="3">
                        <h1>Name3</h1>
                        <h1>Name3</h1>
                        <h1>Name3</h1>
                        <h1>Name3</h1>
                    </Panel>
                </Collapse>
            </div>
        )//end return
    }
}

export default Friend