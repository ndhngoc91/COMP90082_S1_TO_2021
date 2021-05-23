import React from "react";
import {Button, Checkbox, Col, Divider, Layout, List, notification, Row, Table, Tag, Typography} from "antd";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import {useProducts} from "../../hooks/ProductHooks";
import {ProductStatus} from "../../consts/ProductStatus";
import {useStores} from "../../stores";
import Avatar from "antd/es/avatar/avatar";
import {useProductManagementPageStyle} from "./styles";
import {observer} from "mobx-react-lite";
import {useHandleAddContract} from "../../hooks/ContractHooks";

const {Content} = Layout;
const {Column} = Table;
const {Title} = Typography;

const avatarUrl = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

const ProductManagementPage = observer(() => {
    const {
        hiringEquipmentRegister: {
            selectedRecipientId,
            recipients,
            isReadyToMakeContract,
            contractDetails,
            selectProduct,
            clearEquipmentRegisterProcess
        }
    } = useStores();

    const products = useProducts();
    const [handleAddContract, {handling}] = useHandleAddContract();

    const onCheckoutButtonClick = () => {
        handleAddContract({
            name: "",
            contract_details: contractDetails
        }, () => {
            notification.success({
                message: "Make a contract successfully!"
            });
            clearEquipmentRegisterProcess();
        });
    };

    const {mainContentCls, fullWidthCls, recipientListCls} = useProductManagementPageStyle();

    return (
        <>
            <Layout style={{minHeight: "100vh"}}>
                <NavigationBar/>
                <Layout style={{height: "100%"}}>
                    <Content className={mainContentCls}>
                        <Row justify="space-around" gutter={16}>
                            <Col span={6}>
                                <Title level={3}>Recipient List</Title>
                                <Divider/>
                                <List className={recipientListCls}
                                      itemLayout="horizontal"
                                      dataSource={recipients}
                                      renderItem={recipient => {
                                          return <List.Item>
                                              <List.Item.Meta
                                                  avatar={<Avatar src={avatarUrl}/>}
                                                  title={<a href="https://ant.design">
                                                      {recipient.first_name} {recipient.last_name}
                                                  </a>}
                                                  description={selectedRecipientId === recipient.id ?
                                                      <Tag color="green" style={{fontSize: "1em"}}>Handling</Tag> :
                                                      <Tag color="purple" style={{fontSize: "1em"}}>Processed</Tag>}
                                              />
                                          </List.Item>;
                                      }}/>
                                {isReadyToMakeContract &&
                                <>
                                    <Divider/>
                                    <Button className={fullWidthCls} type="primary" size="large" loading={handling}
                                            onClick={onCheckoutButtonClick}>
                                        Checkout
                                    </Button>
                                </>}
                            </Col>
                            <Col span={18}>
                                <Table dataSource={products} rowKey="id">
                                    <Column title="Name" dataIndex="name"/>
                                    <Column title="Description" dataIndex="description"/>
                                    <Column title="Product Code" dataIndex="product_code"/>
                                    <Column title="Key Product Id" dataIndex="key_product_id"/>
                                    <Column title="Key Taxcode Id" dataIndex="key_taxcode_id"/>
                                    <Column title="Status" dataIndex="status"
                                            render={status => {
                                                switch (status) {
                                                    case ProductStatus.RESERVED:
                                                        return <Tag color="red"
                                                                    style={{fontSize: "1em"}}>Reserved</Tag>;
                                                    case ProductStatus.HIRED:
                                                        return <Tag color="red" style={{fontSize: "1em"}}>Hired</Tag>;
                                                    case ProductStatus.AVAILABLE:
                                                        return <Tag color="green"
                                                                    style={{fontSize: "1em"}}>Available</Tag>;
                                                }
                                            }}/>
                                    {!isReadyToMakeContract &&
                                    <Column title="Select"
                                            render={record => {
                                                return <Checkbox onClick={() => {
                                                    selectProduct(record);
                                                }}/>
                                            }}/>}
                                </Table>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
});

export default ProductManagementPage;
