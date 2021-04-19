import React from "react";
import {useHistory} from "react-router-dom"
import {Layout, Menu, Image} from "antd";
import {
    HistoryOutlined,
    ShopOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    UserSwitchOutlined,
    ContainerOutlined,
    CalendarOutlined
} from "@ant-design/icons";
import {useStores} from "../../stores";
import rockyValleyLogo from "../../assets/rocky_valley.svg";
import {useNavigationBarStyles} from "./styles";

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

    const {logoCls, leftItemCls, rightItemCls} = useNavigationBarStyles();

    return (
        <Header style={{width: "100%", padding: 0}}>
            <Menu onClick={handleClick} style={{backgroundColor: "#D8D8D5"}} mode="horizontal"
                  defaultSelectedKeys={[defaultSelected]}>
                <div className={leftItemCls}>
                    <Image className={logoCls} src={rockyValleyLogo} preview={false}/>
                </div>
                <Menu.Item className={leftItemCls} icon={<ShopOutlined/>} key="/productList">Products</Menu.Item>
                <Menu.Item className={leftItemCls} icon={<HistoryOutlined/>} key="/history">
                    Order History
                </Menu.Item>
                <Menu.Item className={leftItemCls} icon={<ShoppingCartOutlined/>} key="/order">Order</Menu.Item>
                <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/package">Packages</Menu.Item>
                <Menu.Item className={rightItemCls} icon={<LogoutOutlined/>} key="/logout">Logout</Menu.Item>
                <Menu.Item className={rightItemCls} icon={<UserSwitchOutlined/>} key="/choose">
                    Switch account
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default NavigationBar;
