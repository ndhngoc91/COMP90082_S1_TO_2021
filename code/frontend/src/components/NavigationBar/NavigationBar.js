import React from "react";
import {useHistory} from "react-router-dom"
import {Layout, Menu, Image} from "antd";
import {
    HistoryOutlined,
    ShopOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    ContainerOutlined,
    SettingOutlined,
    AccountBookOutlined,
    HomeOutlined, LoginOutlined
} from "@ant-design/icons";
import {useStores} from "../../stores";
import {useNavigationBarStyles} from "./styles";
import {observer} from "mobx-react-lite";
import {USER_ROLE} from "../../consts/UserRole";

const {Header} = Layout;
const {SubMenu} = Menu;

const NavigationBar = observer(({defaultSelected}) => {
    const history = useHistory();

    const {authStore: {userRole, logout}} = useStores();

    const handleClick = ({key}) => {
        if (key === "/logout") {
            logout();
            history.push("/login");
        } else if (key.startsWith("/")) {
            history.push(key)
        }
    }

    const {leftItemCls, rightItemCls} = useNavigationBarStyles();

    return (
        <Header style={{width: "100%", padding: 0}}>
            <Menu onClick={handleClick} mode="horizontal"
                  theme={"dark"}
                  defaultSelectedKeys={[defaultSelected]}>
                {(userRole === USER_ROLE.GUEST || userRole === USER_ROLE.CUSTOMER) &&
                <>
                    <Menu.Item className={leftItemCls} icon={<HomeOutlined/>} key="/">Home</Menu.Item>
                    <Menu.Item className={leftItemCls} icon={<ShopOutlined/>} key="/productList">Products</Menu.Item>
                    <Menu.Item className={leftItemCls} icon={<ShopOutlined/>} key="/customers">Customers</Menu.Item>
                </>}
                {userRole === USER_ROLE.CUSTOMER &&
                <>
                    <Menu.Item className={leftItemCls} icon={<HistoryOutlined/>} key="/history">
                        Order History
                    </Menu.Item>
                    <Menu.Item className={leftItemCls} icon={<ShoppingCartOutlined/>} key="/order">Order</Menu.Item>
                </>}
                {(userRole === USER_ROLE.CUSTOMER || userRole === USER_ROLE.ADMIN) &&
                <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/calendar">
                    Calendar
                </Menu.Item>}
                {userRole === USER_ROLE.ADMIN &&
                <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/package-management">
                    Package Management
                </Menu.Item>}
                <SubMenu className={rightItemCls} key="SubMenu" icon={<SettingOutlined/>} title="User">
                    {userRole === USER_ROLE.GUEST ?
                        <Menu.Item key="/login" icon={<LoginOutlined/>}>Login</Menu.Item> :
                        <>
                            <Menu.Item key="/profile" icon={<AccountBookOutlined/>}>Account</Menu.Item>
                            <Menu.Item key="/logout" icon={<LogoutOutlined/>}>Logout</Menu.Item>
                        </>}

                </SubMenu>
            </Menu>
        </Header>
    );
});

export default NavigationBar;
