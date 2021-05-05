import React from "react";
import 'antd/dist/antd.css'
import { Menu } from 'antd';
import {
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import {BrowserRouter, Link } from "react-router-dom";


class LeftMenu extends React.Component{

    render() {
        return (
            <div className="menu">
                <br/>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                >
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to='/center/order'>
                            order detail
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        <Link to='/center/friend'>
                            friend
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<MailOutlined />}>
                        <Link to='/center/profile'>
                            profile
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<AppstoreOutlined />}>
                        <Link to='/center/other'>
                            other
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )//end return
    }
}

export default LeftMenu;