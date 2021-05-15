import React from "react";
import "antd/dist/antd.css"
import {Menu} from "antd";
import {
    HomeOutlined, MailOutlined, TeamOutlined
} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";

const UserProfileSideMenu = () => {
    const location = useLocation();

    return (
        <div className="menu">
            <Menu defaultSelectedKeys={[location.pathname]}
                  mode="inline">
                <Menu.Item key="/profile" icon={<MailOutlined/>}>
                    <Link to="/profile">
                        Profile
                    </Link>
                </Menu.Item>
                <Menu.Item key="/profile/user-groups" icon={<TeamOutlined/>}>
                    <Link to="/profile/user-groups">
                        User Groups
                    </Link>
                </Menu.Item>
                <Menu.Item key="/profile/address" icon={<HomeOutlined/>}>
                    <Link to="/profile/address">
                        Addresses
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default UserProfileSideMenu;
