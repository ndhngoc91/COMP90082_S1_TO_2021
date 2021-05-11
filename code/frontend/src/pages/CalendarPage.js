import React from "react";
import GanttTimeline from "../components/GanttTimeline/GanttTimeline";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {Calendar, Badge, Checkbox, Layout, Row, Col, DatePicker, Space, Typography, Divider, Select} from "antd";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";

const {Content, Sider} = Layout;
const {Title} = Typography;

const getListData = (value) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                {type: "warning", content: "This is warning event."},
                {type: "success", content: "This is usual event."},
            ];
            break;
        case 10:
            listData = [
                {type: "warning", content: "This is warning event."},
                {type: "success", content: "This is usual event."},
                {type: "error", content: "This is error event."},
            ];
            break;
        case 15:
            listData = [
                {type: "warning", content: "This is warning event"},
                {type: "success", content: "This is very long usual event。。...."},
                {type: "error", content: "This is error event 1."},
                {type: "error", content: "This is error event 2."},
                {type: "error", content: "This is error event 3."},
                {type: "error", content: "This is error event 4."},
            ];
            break;
        default:
    }
    return listData || [];
};

const dateCellRender = (value) => {
    const listData = getListData(value);
    if (listData.length > 0) {
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content}/>
                    </li>
                ))}
            </ul>
        );
    }
};

const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};

const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
};

const options = [
    {label: "All", value: "All"},
    {label: "Ski", value: "Ski"},
    {label: "Poles", value: "Poles"},
    {label: "Snowboard", value: "Snowboard"},
    {label: "Helmet", value: "Helmet"},
    {label: "Suit", value: "Suit"},
    {label: "Jacket", value: "Jacket"},
    {label: "Pants", value: "Pants"},
    {label: "Boots", value: "Boots"}
];


const CalendarPage = () => {
    const {authStore: {userRole}} = useStores();

    return <Layout style={{minHeight: "100vh"}}>
        <NavigationBar/>
        <Layout style={{height: "100%"}}>
            <Sider style={{backgroundColor: "white", padding: "20px"}} width={300}>
                <Title level={3}>Filter</Title>
                <Divider/>
                <Space direction="vertical" size={20}>
                    <Row justify="start">
                        <DatePicker placeholder="Start date" size="large"/>
                    </Row>
                    <Row justify="start">
                        <DatePicker placeholder="End date" size="large"/>
                    </Row>
                    <Row>
                        <Col>
                            <Title level={5}>Type</Title>
                            <Checkbox.Group options={options} defaultValue={["Pear"]}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Title level={5}>Availability</Title>
                            <Select defaultValue={2} style={{width: "200px"}}>
                                <Select.Option value={0}>Available</Select.Option>
                                <Select.Option value={1}>Not available</Select.Option>
                                <Select.Option value={2}>Any</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                </Space>
            </Sider>
            <Content>
                {userRole === USER_ROLE.ADMIN &&
                <GanttTimeline/>}
                {userRole === USER_ROLE.CUSTOMER &&
                <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender}/>}
            </Content>
        </Layout>
    </Layout>
};

export default CalendarPage;
