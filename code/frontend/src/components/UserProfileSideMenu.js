import React from "react";
import 'antd/dist/antd.css'
import {Menu} from 'antd';
import {
    PieChartOutlined,
    DesktopOutlined,
    MailOutlined,
} from '@ant-design/icons';
import {Link} from "react-router-dom";


const UserProfileSideMenu = () => {
    return (
        <div className="menu">
            <Menu defaultSelectedKeys={['1']}
                  mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    <Link to='/center/order'>
                        Orders
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    <Link to='/center/friend'>
                        User Groups
                    </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<MailOutlined/>}>
                    <Link to='/center/profile'>
                        Profile
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default UserProfileSideMenu;
