import React, {useState} from "react";
import {useHistory} from "react-router-dom"
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

const {Header} = Layout;
const {SubMenu} = Menu;

const loginFormLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const loginFormTailLayout = {
    wrapperCol: {offset: 6, span: 18},
};

const NavigationBar = observer(() => {
    const [isLoginModelVisible, setIsLoginModelVisible] = useState(false);

    const history = useHistory();

    const [handleLogin, {handling}] = useHandleLogin();

    const {authStore: {username, userRole, logout}} = useStores();

    const handleClick = ({key}) => {
        if (key === "/logout") {
            logout();
            history.push("/");
        } else if (key.startsWith("/")) {
            history.push(key)
        }
    }

    const onFinish = values => {
        handleLogin(values, () => {
            setIsLoginModelVisible(false);
            notification.success({message: "Login successfully"});
        }, errorMessage => {
            notification.error({message: errorMessage});
        });
    };

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
                <>
                    <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/user-management">
                        User Management
                    </Menu.Item>
                    <Menu.Item className={leftItemCls} icon={<ContainerOutlined/>} key="/booking-management">
                        Booking Management
                    </Menu.Item>
                </>}
                {[USER_ROLE.CUSTOMER, USER_ROLE.ADMIN].includes(userRole) &&
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
                               icon={<LoginOutlined/>}>
                        Login
                    </Menu.Item>
                    <Menu.Item className={rightItemCls} key="/user-create" icon={<UserAddOutlined/>}>
                        Register
                    </Menu.Item>
                </>}
                {[USER_ROLE.CUSTOMER, USER_ROLE.ADMIN].includes(userRole) &&
                <SubMenu className={rightItemCls} key="SubMenu" icon={<SettingOutlined/>} title={username}>
                    {userRole === USER_ROLE.CUSTOMER &&
                    <Menu.Item key="/profile" icon={<AccountBookOutlined/>}>Account</Menu.Item>}
                    <Menu.Item key="/logout" icon={<LogoutOutlined/>}>Logout</Menu.Item>
                </SubMenu>
                }
            </Menu>
            <Modal title="Login " visible={isLoginModelVisible}
                   footer={null} closable={false}
                   onCancel={() => {
                       setIsLoginModelVisible(false);
                   }}>
                <Form {...loginFormLayout}
                      name="basic"
                      initialValues={{remember: true}}
                      onFinish={onFinish}>
                    <Form.Item label="Username"
                               name="username"
                               rules={[{required: true, message: 'Please input your username!'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Password"
                               name="password"
                               rules={[{required: true, message: 'Please input your password!'}]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item {...loginFormTailLayout}>
                        <Button type="primary" htmlType="submit" loading={handling}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Header>
    );
});

export default NavigationBar;
