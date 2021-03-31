import React from "react";
import {useHistory} from "react-router-dom"
import {Layout, Menu} from "antd";
import {
    HistoryOutlined,
    HomeOutlined,
    ShopOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    UserSwitchOutlined
} from "@ant-design/icons";
import {useHandleLogout} from "../hooks/AuthHooks";

const {Header} = Layout;

const NavigationBar = ({defaultSelected}) => {
    const history = useHistory();

    const [handleLogout] = useHandleLogout();

    const handleClick = ({key}) => {
        if (key === "/logout") {
            handleLogout(() => {
                history.push("/login");
            });
        } else if (key.startsWith("/")) {
            history.push(key)
        }
    }

    return (
        <Header style={{position: "fixed", zIndex: 1, width: "100%"}}>
            <Menu onClick={handleClick} theme="dark" mode="horizontal"
                  defaultSelectedKeys={[defaultSelected]}>
                <Menu.Item style={{
                    float: "left",
                    width: 150,
                    textAlign: "center",
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "1.25rem"
                }}>HolySAS</Menu.Item>
                <Menu.Item style={{float: "left"}} icon={<HomeOutlined/>} key="/">Home</Menu.Item>
                <Menu.Item style={{float: "left"}} icon={<ShopOutlined/>} key="/productList">Products</Menu.Item>
                <Menu.Item style={{float: "left"}} icon={<HistoryOutlined/>} key="/history">Order
                    History</Menu.Item>
                <Menu.Item style={{float: "left"}} icon={<ShoppingCartOutlined/>} key="/order">Order</Menu.Item>
                <Menu.Item style={{float: "right"}} icon={<LogoutOutlined/>} key="/logout">Logout</Menu.Item>
                <Menu.Item style={{float: "right"}} icon={<UserSwitchOutlined/>} key="/choose">Switch
                    account</Menu.Item>
            </Menu>
        </Header>
    );
}

export default NavigationBar;
