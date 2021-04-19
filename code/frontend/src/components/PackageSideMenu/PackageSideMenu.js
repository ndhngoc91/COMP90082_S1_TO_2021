import React from "react";
import {Menu} from "antd";
import {CalendarOutlined, LinkOutlined, MailOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";

const PackageSideMenu = () => {
    const history = useHistory();

    return <Menu defaultSelectedKeys={['1']}
                 defaultOpenKeys={['sub1']}>
        <Menu.Item key="1" icon={<MailOutlined/>} onClick={() => {
            history.push("/package");
        }}>
            Package
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined/>} onClick={() => {
            history.push("/package/calendar");
        }}>
            Calendar
        </Menu.Item>
        <Menu.Item key="link" icon={<LinkOutlined/>}>
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                Ant Design
            </a>
        </Menu.Item>
    </Menu>;
};

export default PackageSideMenu;
