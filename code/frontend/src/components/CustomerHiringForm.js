import React, {useState} from "react";
import {Card, DatePicker, Space} from "antd";

const { RangePicker } = DatePicker;
// const { Step } = Steps;

const CustomerHiringForm = () => {
    const [current, setCurrent] = useState(0);

    const onChange = value => console.log(value);

    const onOk = value => console.log(value[0]._d);

    return (
        <div className="customer-hiring-form">
            <Space direction="vertical">
                <div className="site-card-border-less-wrapper" id="step1">
                    <Card title="Select Hiring Dates and Category" bordered={false} style={{ width: 300 }}>
                        <RangePicker
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            onChange={onChange}
                            onOk={onOk}
                        />
                    </Card>
                </div>

                <div className="site-card-border-less-wrapper" id="step2">
                    <Card title="Select Hiring Dates and Category" bordered={false} style={{ width: 300 }}>
                    </Card>
                </div>

                <div className="site-card-border-less-wrapper" id="step3">
                    <Card title="Select Hiring Dates and Category" bordered={false} style={{ width: 300 }}>
                    </Card>
                </div>

                <div className="site-card-border-less-wrapper" id="step4">
                    <Card title="Select Hiring Dates and Category" bordered={false} style={{ width: 300 }}>
                    </Card>
                </div>
            </Space>
        </div>
    );
};

export default CustomerHiringForm;