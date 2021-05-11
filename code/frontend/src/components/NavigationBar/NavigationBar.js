import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import {Layout, Menu, Modal} from "antd";
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
import LoginPage from "../../pages/LoginPage";

const {Header} = Layout;
const {SubMenu} = Menu;

const NavigationBar = observer(() => {
    const [isLoginModelVisible, setIsLoginModelVisible] = useState(false);

    const history = useHistory();

    const {authStore: {username, userRole, logout}} = useStores();

    const handleClick = ({key}) => {
        if (key === "/logout") {
            logout();
            history.push("/");
        } else if (key.startsWith("/")) {
            history.push(key)
        }
    }

    const {leftItemCls, rightItemCls} = useNavigationBarStyles();

    return (
        <Header style={{width: "100%", padding: 0}}>
            <Menu onClick={handleClick} mode="horizontal" theme={"dark"}>
                <Menu.Item className={leftItemCls} icon={<HomeOutlined/>} key="/">Home</Menu.Item>
                {(userRole === USER_ROLE.GUEST || userRole === USER_ROLE.CUSTOMER) &&
                <>
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
                {userRole === USER_ROLE.ADMIN &&
                <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/booking-management">
                    Booking Management
                </Menu.Item>}
                {(userRole === USER_ROLE.CUSTOMER || userRole === USER_ROLE.ADMIN) &&
                <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/calendar">
                    Calendar
                </Menu.Item>}
                {userRole === USER_ROLE.ADMIN &&
                <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/package-management">
                    Package Management
                </Menu.Item>}
                {userRole === USER_ROLE.GUEST &&
                <>
                    <Menu.Item key="login"
                               className={rightItemCls}
                               onClick={() => setIsLoginModelVisible(true)}
                               icon={<LoginOutlined/>}
                    >
                        Login
                    </Menu.Item>
                    <Menu.Item className={rightItemCls} key="/user-create" icon={<UserAddOutlined/>}>
                        Register
                    </Menu.Item>
                </>
                }

                {(userRole === USER_ROLE.CUSTOMER || userRole === USER_ROLE.ADMIN) &&
                <SubMenu className={rightItemCls} key="SubMenu" icon={<SettingOutlined/>} title={username}>
                    <Menu.Item key="/logout" icon={<LogoutOutlined/>}>Logout</Menu.Item>
                    {userRole === USER_ROLE.CUSTOMER &&
                    <>
                        <Menu.Item key="/profile" icon={<AccountBookOutlined/>}>Account</Menu.Item>
                    </>
                    }
                    {userRole === USER_ROLE.ADMIN &&
                    <>
                        <Menu.Item key="/admin-profile" icon={<ContainerOutlined/>}>User Management</Menu.Item>
                    </>
                    }
                </SubMenu>
                }
            </Menu>
            <Modal title="Login " visible={isLoginModelVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsLoginModelVisible(false);
                   }}>
                <LoginPage/>
            </Modal>
        </Header>
    );
});

export default NavigationBar;
