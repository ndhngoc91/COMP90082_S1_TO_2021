import {Form, Input, Button, Card, Switch} from "antd";
import {UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {useHandleLogin} from "../hooks/AuthHooks";
import {useHistory} from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isStaff, setIsStaff] = useState(true);
    const [handleLogin, {handling}] = useHandleLogin();

    const history = useHistory();

    return (
        <Card bordered={false} style={{width: 300}} cover={<img alt="example"
                                                                src="https://media-exp1.licdn.com/dms/image/C511BAQF1N9JzP5PU8Q/company-background_10000/0?e=2159024400&v=beta&t=SogtI3ymEudS4fqNFeyKMxH7j5-2i7R1kH9LndNbPTg"/>}>
            <Form className="login-form"
                  initialValues={{remember: true}}
                  onFinish={() => {
                      handleLogin(username, password, isStaff, () => {
                          history.push("/choose")
                      });
                  }}>
                <Form.Item name="username"
                           value={username}
                           onChange={(e) => {
                               setUsername(e.target.value);
                           }}
                           rules={[{required: true, message: "Please input your username!"}]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                           placeholder="Username"/>
                </Form.Item>
                <Form.Item name="password"
                           value={password}
                           onChange={(e) => {
                               setPassword(e.target.value);
                           }}
                           rules={[{required: true, message: "Please input your password!"}]}>
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="Password"
                                    iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}/>
                </Form.Item>
                <Form.Item label={"Login as Staff"}>
                    <Switch defaultChecked={isStaff} onChange={checked => setIsStaff(checked)}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block="true" loading={handling}>
                        Log in
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="link" block href="/create">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default LoginForm;
