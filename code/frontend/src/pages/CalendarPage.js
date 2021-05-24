import React from "react";
import GanttTimeline from "../components/GanttTimeline/GanttTimeline";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {Calendar, Badge, Layout} from "antd";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";

const {Content} = Layout;

const getListData = (value) => {
    let listData;
    switch (value.date()) {
        case 25:
            listData = [
                {type: "warning", content: "Return products!"}
            ];
            break;
        case 27:
            listData = [
                {type: "warning", content: "Return products!"}
            ];
            break;
        case 28:
            listData = [
                {type: "warning", content: "Return products!"}
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
        <NavigationBar/>
        <Layout style={{height: "100%"}}>
            <Content>
                {userRole === USER_ROLE.STAFF &&
                <GanttTimeline/>}
                {userRole === USER_ROLE.CUSTOMER &&
                <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender}/>}
            </Content>
        </Layout>
    </Layout>
};

export default CalendarPage;
