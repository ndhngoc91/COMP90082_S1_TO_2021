import React from "react";
import {Steps} from "antd";

const {Step} = Steps;

const CheckoutProgressBar = ({current}) => {
    return <Steps progressDot current={current}>
        <Step title="Booking"/>
        <Step title="Input Recipients"/>
        <Step title="Done"/>
    </Steps>;
};

export default CheckoutProgressBar;
