import React from "react";
import { Descriptions, Radio, Button } from 'antd';
import 'antd/dist/antd.css'


class Din extends React.Component{

    render() {
        return (
            <div>
                <Descriptions
                    bordered
                    title="Din"
                    size="default"
                    column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="Fist Name">Fist Name</Descriptions.Item>
                    <Descriptions.Item label="Last Name" >Last Name</Descriptions.Item>
                    <Descriptions.Item label="Birth date">2013.1.4</Descriptions.Item>
                    <Descriptions.Item label="Height">........</Descriptions.Item>
                    <Descriptions.Item label="Weight">............</Descriptions.Item>
                    <Descriptions.Item label="Shoe size">..........</Descriptions.Item>
                    <Descriptions.Item label="gender">.........</Descriptions.Item>
                    <Descriptions.Item label="skier ability">......</Descriptions.Item>
                    <Descriptions.Item label="?">?</Descriptions.Item>
                    <Descriptions.Item label="?">?</Descriptions.Item>
                    <Descriptions.Item label="?">?</Descriptions.Item>
                    <Descriptions.Item label="?">?</Descriptions.Item>
                    <Descriptions.Item label="?">?</Descriptions.Item>
                    <Descriptions.Item label="?">?</Descriptions.Item>
                    <Descriptions.Item label="Din result">3.1415926</Descriptions.Item>
                </Descriptions>
                <Button type="primary" style={{ float: 'right' }}>Edit</Button>
            </div>
        )//end return
    }
}

export default Din