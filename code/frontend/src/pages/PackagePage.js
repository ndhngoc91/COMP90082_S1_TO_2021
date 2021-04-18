import React, {useEffect, useState} from "react";
import {Button, Col, Grid, Layout, Row, Spin, Table, Tag, Typography} from "antd";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";

const {Content, Footer} = Layout;
const {Title} = Typography;

const PackagePage = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users", {}).then(response => {
            if (response.status === 200) {
                setPackages(response.data);
            }
        });
    }, []);

    return (
        <Layout style={{minHeight: "100vh"}}>
            <NavigationBar defaultSelected="/package"/>
            <Content style={{padding: "90px 16px"}}>
                <table>
                    {packages.map(value => <tr>
                        <td>{value.name}</td>
                    </tr>)}
                </table>
            </Content>
            <Footer style={{textAlign: "center"}}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
        </Layout>
    );
}

export default PackagePage;
