import {Row, Col, Button} from "antd";
import React from "react";
import LoginForm from "../components/LoginForm"

const LoginPage = () => {
    return (
        <div style={{backgroundColor: "#F5F5F5"}}>
            <Row style={{height: "100%"}} justify="space-around" align="middle">
                <Col>
                    <LoginForm/>
                </Col>
                <Col>
                    <Button type="link" block href="/HiringFormPage">
                        Create a hiring contract
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default LoginPage;
