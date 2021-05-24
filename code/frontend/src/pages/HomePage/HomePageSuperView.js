import React, {useEffect, useState} from "react";
import {Badge, Button, Col, Descriptions, Progress, Result, Row, Typography} from "antd";
import {useStores} from "../../stores";
import {useHandleRetrieveProducts} from "../../hooks/SquizzHooks";

const {Title} = Typography;

const HomePageSuperView = () => {
    const [progress, setProgress] = useState(0);

    const {authStore: {username, email, phone}} = useStores();

    const [handleRetrieveProducts, {success, retrieving}] = useHandleRetrieveProducts();

    let counter;
    useEffect(() => {
        if (retrieving) {
            counter = setInterval(() => {
                setProgress(prevState => {
                    if (prevState + 1 < 100) {
                        return prevState + 1;
                    }

                    return prevState;
                });
            }, 1500)
        }
    }, [retrieving])

    useEffect(() => {
        if (success) {
            setProgress(100);
            clearInterval(counter);
        }
    }, [success])

    return <>
        <Row justify="space-around" style={{marginTop: "2em"}}>
            <Title level={1}>YOU ARE USING THE SUPER ACCOUNT!</Title>
        </Row>
        <Row justify="space-around"
             style={{textAlign: "center", padding: "5em 0"}}>
            <Col span={10}>
                <Descriptions layout="vertical" bordered>
                    <Descriptions.Item label="Staff">{username}</Descriptions.Item>
                    <Descriptions.Item label="Email">{email}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{phone}</Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running"/>
                    </Descriptions.Item>
                </Descriptions>
            </Col>
            <Col span={10}>
                <Button loading={retrieving} onClick={handleRetrieveProducts} type="primary" size="large">
                    Retrieve the product data from Squizz
                </Button>
            </Col>
        </Row>
        <Row justify="space-around" style={{marginBottom: "5em", padding: "3em"}}>
            {retrieving &&
            <Progress percent={progress} status="normal"/>}
            {success &&
            <Result status="success" title="Successfully imported data!"/>}
        </Row>
    </>;
};

export default HomePageSuperView;
