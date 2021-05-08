import React from "react";
import "antd/dist/antd.css"
import {Menu} from "antd";
import {
    PieChartOutlined,
    DesktopOutlined,
    MailOutlined,
} from "@ant-design/icons";
import {Link} from "react-router-dom";


const UserProfileSideMenu = () => {
    return (
        <div className="menu">
            <Menu defaultSelectedKeys={["0"]}
                  mode="inline">
                <Menu.Item key="0" icon={<MailOutlined/>}>
                    <Link to="/profile">
                        Profile
                    </Link>
                </Menu.Item>
                <Menu.Item key="1" icon={<DesktopOutlined/>}>
                    <Link to="/profile/user-groups">
                        User Groups
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default UserProfileSideMenu;
