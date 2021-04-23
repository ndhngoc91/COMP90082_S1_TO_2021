import React from "react";
import {useCustomFooterStyles} from "./styles";
import {Footer} from "antd/es/layout/layout";

const PageFooter = () => {
    const {customFooterCls} = useCustomFooterStyles();

    return <Footer>
        <div className={customFooterCls}><p>SQUIZZ ©2021 Created by team TO</p></div>
    </Footer>;
};

export default PageFooter;
