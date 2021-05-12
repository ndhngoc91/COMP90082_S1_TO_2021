import React from "react";
import {Button, Col, Layout, Row, Select, Space, Table, Tag, Input} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {useAgeGroups} from "../hooks/AgeGroupHooks";
import {useCategories} from "../hooks/CategoryHooks";
import {useSkillLevels} from "../hooks/SkillLevelHooks";

const {Content} = Layout;
const {Column} = Table;
const {Search} = Input;
const {Option} = Select;

const UserManagementPage = () => {
    const ageGroups = useAgeGroups();
    const categories = useCategories();
    const skillLevels = useSkillLevels();

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

    return (
        <>
            <Layout style={{minHeight: "100vh"}}>
                <NavigationBar/>
                <Layout style={{height: "100%"}}>
                    <Row style={{margin: "2em 0"}} gutter={{lg: 24}}>
                        <Col lg={8}>
                            <Search placeholder="Search for users"
                                    allowClear
                                    enterButton="Search"
                                    size="large"/>
                        </Col>
                    </Row>
                    <Content>
                        <Table dataSource={data}>
                            <Column title="Username" dataIndex="username" key="username"/>
                            <Column title="First Name" dataIndex="first_name" key="first_name"/>
                            <Column title="Last Name" dataIndex="last_name" key="last_name"/>
                            <Column title="Tags" dataIndex="tags" key="tags" render={tags => (
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
                                </>)}/>
                            <Column title="Action" key="action" render={(text, record) => (
                                <Space size="middle">
                                    <a>Invite {record.name}</a>
                                    <a>Delete</a>
                                </Space>
                            )}/>
                        </Table>
                    </Content>
                </Layout>
            </Layout>
        </>

    );
};

export default UserManagementPage;
