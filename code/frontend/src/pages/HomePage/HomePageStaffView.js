import React from "react";
import {Badge, Col, Descriptions, Progress, Row, Typography} from "antd";
import {useStores} from "../../stores";

const {Title} = Typography;

const HomePageStaffView = () => {
    const {authStore: {username, email, phone}} = useStores();

    return <>
        <Row justify="space-around"
             style={{textAlign: "center", padding: "2em 0"}}>
            <Col span={10}>
                <Title level={3}>Troubleshooting Errors</Title>
                <Progress percent={70} status="exception"/>
            </Col>
            <Col span={10}>
                <Title level={3}>Orders Processed</Title>
                <Progress type="circle" percent={75}/>
            </Col>
        </Row>
        <Row justify="space-around">
            <Col span={10}>
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/w7ejDZ8SWv8"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
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
