import React, {useState} from "react";
import {useHistory, useLocation} from "react-router-dom"
import {Layout, Menu, Modal, notification} from "antd";
import {
    ShopOutlined,
    LogoutOutlined,
    ContainerOutlined,
    SettingOutlined,
    AccountBookOutlined,
    HomeOutlined, LoginOutlined, UserAddOutlined, WalletOutlined, CalendarOutlined, HistoryOutlined
} from "@ant-design/icons";
import {useStores} from "../../stores";
import {useNavigationBarStyles} from "./styles";
import {observer} from "mobx-react-lite";
import {USER_ROLE} from "../../consts/UserRole";
import {useHandleLogin} from "../../hooks/AuthHooks";
import LoginForm from "../LoginForm/LoginForm";

const {Header} = Layout;
const {SubMenu} = Menu;

const NavigationBar = observer(() => {
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const [handleLogin, {handling}] = useHandleLogin();

    const {
        authStore: {firstName, lastName, userRole, logout},
        shoppingCartStore: {clearShoppingCart},
        hiringEquipmentRegister: {clearEquipmentRegisterProcess}
    } = useStores();

    const handleClick = ({key}) => {
        if (key === "/logout") {
            logout();
            clearShoppingCart();
            clearEquipmentRegisterProcess();
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
                <SubMenu className={leftItemCls} key="management" icon={<ContainerOutlined/>}
                         title="Management Pages">
                    <Menu.Item icon={<ContainerOutlined/>} key="/user-management">
                        User Management
                    </Menu.Item>
                    <Menu.Item icon={<ContainerOutlined/>} key="/package-management">
                        Package Management
                    </Menu.Item>
                    <Menu.Item icon={<ContainerOutlined/>} key="/product-management">
                        Product Management
                    </Menu.Item>
                </SubMenu>}
                {[USER_ROLE.CUSTOMER, USER_ROLE.STAFF].includes(userRole) &&
                <Menu.Item className={leftItemCls} icon={<HistoryOutlined/>} key="/order-history">
                    Order History
                </Menu.Item>}
                {[USER_ROLE.CUSTOMER, USER_ROLE.STAFF].includes(userRole) &&
                <Menu.Item className={leftItemCls} icon={<WalletOutlined/>} key="/contract-management">
                    Contracts
                </Menu.Item>}
                {[USER_ROLE.CUSTOMER].includes(userRole) &&
                <Menu.Item className={leftItemCls} icon={<CalendarOutlined/>} key="/calendar">
                    Calendar
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
                {[USER_ROLE.CUSTOMER, USER_ROLE.STAFF, USER_ROLE.SUPER].includes(userRole) &&
                <SubMenu className={rightItemCls} key="user" icon={<SettingOutlined/>}
                         title={`${firstName} ${lastName}`}>
                    {userRole === USER_ROLE.CUSTOMER &&
                    <Menu.Item key="/profile" icon={<AccountBookOutlined/>}>Account</Menu.Item>}
                    <Menu.Item key="/logout" icon={<LogoutOutlined/>}>Logout</Menu.Item>
                </SubMenu>}
                {[USER_ROLE.GUEST, USER_ROLE.CUSTOMER].includes(userRole) &&
                <Menu.Item className={rightItemCls} icon={<ShopOutlined/>} key="/shopping-cart">
                    Shopping Cart
                </Menu.Item>}
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
