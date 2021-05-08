import React from "react";
import GanttTimeline from "../components/GanttTimeline/GanttTimeline";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {Layout} from "antd";

const {Content} = Layout;

const CalendarPage = () => {
    return <Layout style={{minHeight: "100vh"}}>
        <NavigationBar defaultSelected="/package"/>
        <Layout style={{height: "100%"}}>
            <Content>
                <GanttTimeline/>
            </Content>
        </Layout>
    </Layout>
};

export default CalendarPage;
