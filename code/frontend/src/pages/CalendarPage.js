import React from "react";
import GanttTimeline from "../components/GanttTimeline/GanttTimeline";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {Layout} from "antd";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";

const {Content} = Layout;

import {Calendar, Badge} from 'antd';

const getListData = (value) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                {type: 'warning', content: 'This is warning event.'},
                {type: 'success', content: 'This is usual event.'},
            ];
            break;
        case 10:
            listData = [
                {type: 'warning', content: 'This is warning event.'},
                {type: 'success', content: 'This is usual event.'},
                {type: 'error', content: 'This is error event.'},
            ];
            break;
        case 15:
            listData = [
                {type: 'warning', content: 'This is warning event'},
                {type: 'success', content: 'This is very long usual event。。....'},
                {type: 'error', content: 'This is error event 1.'},
                {type: 'error', content: 'This is error event 2.'},
                {type: 'error', content: 'This is error event 3.'},
                {type: 'error', content: 'This is error event 4.'},
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

const CalendarPage = () => {
    const {authStore: {userRole}} = useStores();

    return <Layout style={{minHeight: "100vh"}}>
        <NavigationBar defaultSelected="/package"/>
        <Layout style={{height: "100%"}}>
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
