import React from "react";
import {useCustomFooterStyles} from "./styles";
import {Typography} from 'antd';
import {Footer} from "antd/es/layout/layout";

const {Title} = Typography;

const PageFooter = () => {
    const {customFooterCls, customFooterTextCls} = useCustomFooterStyles();

    return <Footer>
        <div className={customFooterCls}>
            <Title className={customFooterTextCls} level={2}>SQUIZZ ©2021 Created by team TO</Title>
        </div>
    </Footer>;
};

export default PageFooter;
