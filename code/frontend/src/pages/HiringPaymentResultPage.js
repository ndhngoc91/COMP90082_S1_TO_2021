import React from "react"
import { Result, Button } from "antd";
import {useHistory} from "react-router-dom";

const HiringPaymentResultPage = () => {
    const history = useHistory();

    return (
        <Result
            status="success"
            title="Successfully made a hiring contract!"
            subTitle="Order number: 12345 created, your order is being prepared shortly."
            extra={[
                <Button type="primary" key="console" onClick={_ => history.push("/login")}>
                    Go back to main page
                </Button>,
                <Button key="buy">Print receipt</Button>,
            ]}
        />
    )
};

export default HiringPaymentResultPage;