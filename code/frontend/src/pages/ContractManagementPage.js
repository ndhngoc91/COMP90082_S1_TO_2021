import React, {useEffect} from "react";
import {Col, Layout, Row, Space, Table, Input} from "antd";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {useHandleContracts} from "../hooks/ContractHooks";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";

const {Content} = Layout;
const {Column} = Table;
const {Search} = Input;

const ContractManagementPage = () => {
    const {authStore: {userRole}} = useStores();
    const [handleFilterContracts, handlePrintContract, {contracts, filtering}] = useHandleContracts();

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
                            <Column title="Customer Name"
                                dataIndex="customer_first_name"
                                render={(customer_first_name, record) =>
                                    <span>{
                                        record.customer_last_name ?
                                            record.customer_last_name + ", " + customer_first_name :
                                            customer_first_name
                                    }</span>
                                }
                            />
                            <Column title="Customer Contact"
                                dataIndex="customer_phone"
                                render={(text, record) =>
                                    <span>{text}<br></br>{record.customer_email}</span>
                                }
                            />
                            <Column title="Staff Name"
                                dataIndex="staff_first_name"
                                render={(staff_first_name, record) =>
                                    <span>{
                                        record.staff_last_name ?
                                            record.staff_last_name + ", " + staff_first_name :
                                            staff_first_name
                                    }</span>
                                }
                            />
                            <Column title="Order ID" dataIndex="id"/>
                            <Column title="Start Date" dataIndex="start_date"/>
                            <Column title="End Date" dataIndex="end_date"/>
                            <Column title="Description" dataIndex="description"/>
                            <Column title="Action" key="action" render={(text, record) =>
                                <a onClick={() => handlePrintContract(record.id)}>Print</a>
                            }/>
                        </Table>
                    </Content>
                </Layout>
            </Layout>
        </>

    );
};

export default ContractManagementPage;