import React from "react";
import {Badge, Col, Descriptions, Progress, Row, Typography} from "antd";
import {useStores} from "../../stores";

const HomePageStaffView = () => {
    const {authStore: {username, email, phone}} = useStores();

    return <>
        <Row justify="space-around"
             style={{textAlign: "center", padding: "5em 0"}}>
            <Col span={10}>
            </Col>
            <Col span={10}>
                <Progress percent={75} status="normal"/>
            </Col>
        </Row>
        <Row justify="space-around">
            <Col span={10}>
                <Row justify="space-around">
                    <Progress type="circle" percent={75} width={400} format={percent => `${percent}% Orders`}/>
                </Row>
            </Col>
            <Col span={10}>
                <Descriptions layout="vertical" bordered>
                    <Descriptions.Item label="Staff">{username}</Descriptions.Item>
                    <Descriptions.Item label="Email">{email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{phone}</Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running"/>
                    </Descriptions.Item>
                    <Descriptions.Item label="Info">
                        Company: Rocky Valley
                        <br/>
                        Phone: x-xxx-xxx-xxx
                        <br/>
                        Region: Melbourne<br/>
                    </Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
    </>;
};

export default HomePageStaffView;
