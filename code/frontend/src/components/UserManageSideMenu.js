import React from "react";
import "antd/dist/antd.css"
import {Menu} from "antd";
import {
    ContactsOutlined, TeamOutlined,
    UserAddOutlined, UserOutlined,
} from "@ant-design/icons";
import {Link} from "react-router-dom";


const UserManageSideMenu = () => {
    return (
        <div className="menu">
            <Menu defaultSelectedKeys={["0"]}
                  mode="inline">
                <Menu.Item key="0" icon={<ContactsOutlined/>}>
                    <Link to="/admin-profile">
                        Profile
                    </Link>
                </Menu.Item>
                <Menu.Item key="1" icon={<TeamOutlined/>}>
                    <Link to="/admin-profile/users">
                        Customer List
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UserAddOutlined/>}>
                    <Link to="/admin-profile/admin-create">
                        Create Admin
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined/>}>
                    <Link to="/admin-profile/user-create">
                        Create Customer
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default UserManageSideMenu;
