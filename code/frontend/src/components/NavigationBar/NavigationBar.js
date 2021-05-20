import React, {useState} from "react";
import {useHistory, useLocation} from "react-router-dom"
import {Button, Form, Input, Layout, Menu, Modal, notification} from "antd";
import {
    HistoryOutlined,
    ShopOutlined,
    LogoutOutlined,
    ShoppingCartOutlined,
    ContainerOutlined,
    SettingOutlined,
    AccountBookOutlined,
    HomeOutlined, LoginOutlined, UserAddOutlined
} from "@ant-design/icons";
import {useStores} from "../../stores";
import {useNavigationBarStyles} from "./styles";
import {observer} from "mobx-react-lite";
import {USER_ROLE} from "../../consts/UserRole";
import {useHandleLogin} from "../../hooks/AuthHooks";
import LoginForm from "../LoginForm";

const {Header} = Layout;
const {SubMenu} = Menu;

const NavigationBar = observer(() => {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const [handleLogin, {handling}] = useHandleLogin();

    const {authStore: {firstName, lastName, userRole, logout}, shoppingCartStore: {clearShoppingCart}} = useStores();

    const handleClick = ({key}) => {
        if (key === "/logout") {
            logout();
            clearShoppingCart();
            history.push("/");
        } else if (key.startsWith("/")) {
            history.push(key)
        }
    }

    const onFinish = values => {
        handleLogin(values, () => {
            setIsLoginModalVisible(false);
            notification.success({message: "Login successfully!"});
        }, errorMessage => {
            notification.error({message: errorMessage});
        });
    };

    const {leftItemCls, rightItemCls} = useNavigationBarStyles();

    return (
        <Header style={{width: "100%", padding: 0}}>
            <Menu onClick={handleClick} mode="horizontal" theme={"dark"} defaultSelectedKeys={[location.pathname]}>
                <Menu.Item className={leftItemCls} icon={<HomeOutlined/>} key="/">Home</Menu.Item>
                {(userRole === USER_ROLE.GUEST || userRole === USER_ROLE.CUSTOMER) &&
                <Menu.Item className={leftItemCls} icon={<ShopOutlined/>} key="/packages">Packages</Menu.Item>}
                {userRole === USER_ROLE.STAFF &&
                <>
                    <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/user-management">
                        User Management
                    </Menu.Item>
                    <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/booking-management">
                        Booking Management
                    </Menu.Item>
                </>}
                {[USER_ROLE.CUSTOMER, USER_ROLE.STAFF].includes(userRole) &&
                <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/calendar">
                    Calendar
                </Menu.Item>}
                {userRole === USER_ROLE.STAFF &&
                <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/package-management">
                    Package Management
                </Menu.Item>}
                {[USER_ROLE.CUSTOMER, USER_ROLE.STAFF].includes(userRole) &&
                <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/order-history">
                    Order History
                </Menu.Item>}
                {[USER_ROLE.CUSTOMER, USER_ROLE.STAFF].includes(userRole) &&
                <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/contract-management">
                    Contracts
                </Menu.Item>}
                
                {userRole === USER_ROLE.GUEST &&
                <>
                    <Menu.Item key="login"
                               className={rightItemCls}
                               onClick={() => setIsLoginModalVisible(true)}
                               icon={<LoginOutlined/>}>
                        Login
                    </Menu.Item>
                    <Menu.Item className={rightItemCls} key="/register" icon={<UserAddOutlined/>}>
                        Register
                    </Menu.Item>
                </>}
                {[USER_ROLE.CUSTOMER, USER_ROLE.STAFF].includes(userRole) &&
                <SubMenu className={rightItemCls} key="SubMenu" icon={<SettingOutlined/>}
                         title={`${firstName} ${lastName}`}>
                    {userRole === USER_ROLE.CUSTOMER &&
                    <Menu.Item key="/profile" icon={<AccountBookOutlined/>}>Account</Menu.Item>}
                    <Menu.Item key="/logout" icon={<LogoutOutlined/>}>Logout</Menu.Item>
                </SubMenu>}
                <Menu.Item className={rightItemCls} icon={<ShopOutlined/>} key="/shopping-cart">Shopping Cart</Menu.Item>
            </Menu>
            <Modal title="Login" visible={isLoginModalVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsLoginModalVisible(false);
                   }}>
                <LoginForm handling={handling} onFinish={onFinish}/>
            </Modal>
        </Header>
    );
});

export default NavigationBar;
