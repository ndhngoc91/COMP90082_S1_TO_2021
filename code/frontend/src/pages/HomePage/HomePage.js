import React from "react";
import {Layout} from "antd";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import PageFooter from "../../components/PageFooter/PageFooter";
import {useStores} from "../../stores";
import {USER_ROLE} from "../../consts/UserRole";
import {observer} from "mobx-react-lite";
import HomePageSuperView from "./HomePageSuperView";
import HomePageStaffView from "./HomePageStaffView";
import HomePageCustomerView from "./HomePageCustomerView";
import {useHomePageStyles} from "./styles";

const {Content} = Layout;

const HomePage = observer(() => {
    const {authStore: {userRole}} = useStores();

    const {contentCls} = useHomePageStyles();

    return (
        <Layout style={{minHeight: "100vh"}}>
            <NavigationBar defaultSelected="/"/>
            <Content className={contentCls}>
                {userRole === USER_ROLE.SUPER ? <HomePageSuperView/> :
                    userRole === USER_ROLE.STAFF ? <HomePageStaffView/> : <HomePageCustomerView/>}
            </Content>
            <PageFooter/>
        </Layout>
    )
});

export default HomePage;
