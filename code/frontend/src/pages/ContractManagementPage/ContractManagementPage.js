import React, {useEffect} from "react";
import {Col, Layout, Row, Space, Table, Input} from "antd";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import {useHandleFilterContracts} from "../../hooks/ContractHooks";

const {Content} = Layout;
const {Column} = Table;
const {Search} = Input;

const ContractManagementPage = () => {
    const [handleFilterContracts, {contracts, filtering}] = useHandleFilterContracts();

    useEffect(() => {
        handleFilterContracts();
    }, []);

    return (
        <>
            <Layout style={{minHeight: "100vh"}}>
                <NavigationBar/>
                <Layout style={{height: "100%"}}>
                    <Row style={{margin: "2em 0"}} gutter={{lg: 24}}>
                        <Col lg={8}>
                            <Search placeholder="Search for contracts"
                                    allowClear
                                    enterButton="Search"
                                    loading={filtering}
                                    size="large" onSearch={value => handleFilterContracts(value)}/>
                        </Col>
                    </Row>
                    <Content>
                        <Table dataSource={contracts} loading={filtering}>
                            <Column title="Name" dataIndex="name"/>
                            <Column title="Created At" dataIndex="created_at"/>
                            <Column title="Created_By" dataIndex="created_by"/>
                            <Column title="Action" key="action" render={(text, record) =>
                                <a onClick={() => alert("print contract")}>Print</a>
                            }/>
                        </Table>
                    </Content>
                </Layout>
            </Layout>
        </>

    );
};

export default ContractManagementPage;
