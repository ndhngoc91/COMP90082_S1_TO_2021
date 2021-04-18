import React from "react";
import {useHistory} from "react-router-dom"
import {Layout, Menu, Image} from "antd";
import {
    HistoryOutlined,
    HomeOutlined,
    ShopOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    UserSwitchOutlined,
    ContainerOutlined,
    CalendarOutlined
} from "@ant-design/icons";
import {useStores} from "../stores";
import rockyValleyLogo from "../assets/rocky_valley.svg";

const {Header} = Layout;

const NavigationBar = ({defaultSelected}) => {
    const history = useHistory();

    const {authStore: {logout}} = useStores();

    const handleClick = ({key}) => {
        if (key === "/logout") {
            logout();
            history.push("/login");
        } else if (key.startsWith("/")) {
            history.push(key)
        }
    }

    return (
        <Header style={{width: "100%", padding: 0}}>
            <Menu onClick={handleClick} style={{backgroundColor: "#D8D8D5"}} mode="horizontal"
                  defaultSelectedKeys={[defaultSelected]}>
                <div style={{
                    float: "left",
                    height: "100%"
                }}>
                    <Image style={{height: "100%"}} src={rockyValleyLogo} preview={false}/>
                </div>
                <Menu.Item style={{float: "left"}} icon={<ShopOutlined/>} key="/productList">Products</Menu.Item>
                <Menu.Item style={{float: "left"}} icon={<HistoryOutlined/>} key="/history">
                    Order History
                </Menu.Item>
                <Menu.Item style={{float: "left"}} icon={<ShoppingCartOutlined/>} key="/order">Order</Menu.Item>
                <Menu.Item style={{float: "left"}} icon={<ContainerOutlined/>} key="/package">Packages</Menu.Item>
                <Menu.Item style={{float: "left"}} icon={<CalendarOutlined/>} key="/calendar">Calendar</Menu.Item>
                <Menu.Item style={{float: "right"}} icon={<LogoutOutlined/>} key="/logout">Logout</Menu.Item>
                <Menu.Item style={{float: "right"}} icon={<UserSwitchOutlined/>} key="/choose">
                    Switch account
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default NavigationBar;
