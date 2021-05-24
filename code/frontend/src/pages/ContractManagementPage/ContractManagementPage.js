import React, {useEffect} from "react";
import {Col, Layout, Row, Space, Table, Input} from "antd";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import {useHandleFilterContracts, useHandleRetrieveContract} from "../../hooks/ContractHooks";
import {exportContract} from "../../utils/ContractExporter";

const {Content} = Layout;
const {Column} = Table;
const {Search} = Input;

const ContractManagementPage = () => {
    const [handleFilterContracts, {contracts, filtering}] = useHandleFilterContracts();
    const [handleRetrieveContract, {contract}] = useHandleRetrieveContract();

    useEffect(() => {
        handleFilterContracts();
    }, []);

    useEffect(() => {
        if (contract) {
            exportContract(contract);
        }
    }, [contract]);

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
                        <Table dataSource={contracts} loading={filtering} rowKey={"id"}>
                            <Column title="Name" dataIndex="name"/>
                            <Column title="Created At" dataIndex="created_at"/>
                            <Column title="Created_By" dataIndex="created_by"/>
                            <Column title="Action" key="action" render={record =>
                                <a onClick={() => {
                                    handleRetrieveContract(record["id"], () => {
                                        console.log(contract);
                                    });
                                }}>Print</a>
                            }/>
                        </Table>
                    </Content>
                </Layout>
            </Layout>
        </>

    );
};

export default ContractManagementPage;
