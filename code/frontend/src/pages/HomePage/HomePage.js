import React from "react";
import {Layout} from "antd";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import PageFooter from "../../components/PageFooter/PageFooter";
import {useStores} from "../../stores";
import {USER_ROLE} from "../../consts/UserRole";
import {observer} from "mobx-react-lite";
import HomePageStaffView from "./HomePageStaffView";
import HomePageCustomerView from "./HomePageCustomerView";

const {Content} = Layout;

const HomePage = observer(() => {
    const {authStore: {userRole}} = useStores();

    return (
        <Layout style={{minHeight: "100vh"}}>
            <NavigationBar defaultSelected="/"/>
            <Content style={{background: "#fff"}}>
                {userRole === USER_ROLE.STAFF ? <HomePageStaffView/> : <HomePageCustomerView/>}
            </Content>
            <PageFooter/>
        </Layout>
    )
});

export default HomePage;
