import React, {useEffect, useState} from "react";
import {
    Button,
    Checkbox,
    Col,
    Divider,
    Layout,
    List, Modal,
    notification,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Typography,
    Input
} from "antd";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import {useHandleFilterProducts} from "../../hooks/ProductHooks";
import {ProductStatus} from "../../consts/ProductStatus";
import {useStores} from "../../stores";
import Avatar from "antd/es/avatar/avatar";
import {useProductManagementPageStyle} from "./styles";
import {observer} from "mobx-react-lite";
import {useHandleAddContract} from "../../hooks/ContractHooks";

const {Content} = Layout;
const {Column} = Table;
const {Title, Text} = Typography;
const {Option} = Select;
const {Search} = Input;

const avatarUrl = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

const ProductManagementPage = observer(() => {
    const [query, setQuery] = useState("");
    const [selectedProductStatus, setSelectedProductStatus] = useState(ProductStatus.AVAILABLE);
    const [isViewDetailsModalVisible, setIsViewDetailsModalVisible] = useState(false);
    const [selectedViewProducts, setSelectedViewProducts] = useState([]);

    const {
        hiringEquipmentRegister: {
            selectedRecipientId,
            recipients,
            recipientMap,
            isMakingContract,
            isReadyToMakeContract,
            contractDetails,
            selectProduct,
            cancelSelection,
            clearEquipmentRegisterProcess
        }
    } = useStores();

    const [handleFilterProducts, {products, filtering}] = useHandleFilterProducts();
    const [handleAddContract, {handling}] = useHandleAddContract();

    useEffect(() => {
        handleFilterProducts({
            query: query,
            product_status: selectedProductStatus
        });
    }, [query, selectedProductStatus]);

    const onSearch = queryValue => {
        setQuery(queryValue);
    };

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
                                          const selectedProducts = recipientMap[recipient.id].selectedProducts;
                                          return <List.Item actions={[
                                              selectedProducts.length > 0 && <Button type="primary" onClick={() => {
                                                  setSelectedViewProducts(selectedProducts);
                                                  setIsViewDetailsModalVisible(true);
                                              }}>View Details</Button>
                                          ]}>
                                              <List.Item.Meta style={{padding: ".5em"}}
                                                              avatar={<Avatar src={avatarUrl}/>}
                                                              title={<a href="https://ant.design">
                                                                  {recipient.first_name} {recipient.last_name}
                                                              </a>}
                                                              description={selectedRecipientId === recipient.id ?
                                                                  <Tag color="blue"
                                                                       style={{fontSize: "1em"}}>Handling</Tag> :
                                                                  <Tag color="green"
                                                                       style={{fontSize: "1em"}}>Processed</Tag>}/>
                                          </List.Item>
                                      }}/>
                                {isReadyToMakeContract &&
                                <>
                                    <Divider/>
                                    <Space direction="vertical" className={fullWidthCls}>
                                        <Button className={fullWidthCls} type="primary" size="large" loading={handling}
                                                onClick={onCheckoutButtonClick}>
                                            Checkout
                                        </Button>
                                        <Button className={fullWidthCls} size="large" onClick={cancelSelection}>
                                            Cancel
                                        </Button>
                                    </Space>
                                </>}
                            </Col>
                            <Col span={18}>
                                <Space direction="vertical" style={{width: "100%"}}>
                                    <Row gutter={24}>
                                        <Col lg={8}>
                                            <Search placeholder="Search for products"
                                                    allowClear
                                                    enterButton="Search"
                                                    size="large"
                                                    onSearch={onSearch}
                                                    loading={filtering}/>
                                        </Col>
                                        <Col span={4}>
                                            <Select defaultValue={ProductStatus.AVAILABLE} size="large"
                                                    style={{width: "100%"}}
                                                    value={selectedProductStatus}
                                                    onSelect={productStatus => {
                                                        setSelectedProductStatus(productStatus);
                                                    }}>
                                                <Option value={ProductStatus.AVAILABLE}>Available</Option>
                                                <Option value={ProductStatus.RESERVED}>Reserved</Option>
                                                <Option value={ProductStatus.HIRED}>Hired</Option>
                                            </Select>
                                        </Col>
                                        <Col>
                                            <Button size="large"
                                                    onClick={() => {
                                                        setQuery("");
                                                        setSelectedProductStatus(ProductStatus.AVAILABLE);
                                                    }}>
                                                Clear
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Table dataSource={products} rowKey="id" loading={filtering}>
                                        <Column title="Name" dataIndex="name"
                                                render={value => <Text strong>{value}</Text>}/>
                                        <Column title="Description" dataIndex="description"/>
                                        <Column title="Product Code" dataIndex="product_code"
                                                render={value => <Tag color="purple" style={{fontSize: "1em"}}>
                                                    {value}
                                                </Tag>}/>/>
                                        <Column title="Key Product Id" dataIndex="key_product_id"
                                                render={value => <Tag color="purple" style={{fontSize: "1em"}}>
                                                    {value}
                                                </Tag>}/>
                                        <Column title="Key Taxcode Id" dataIndex="key_taxcode_id"
                                                render={value => <Tag color="blue" style={{fontSize: "1em"}}>
                                                    {value}
                                                </Tag>}/>
                                        <Column title="Status" dataIndex="status"
                                                render={status => {
                                                    switch (status) {
                                                        case ProductStatus.RESERVED:
                                                            return <Tag color="red"
                                                                        style={{fontSize: "1em"}}>Reserved</Tag>;
                                                        case ProductStatus.HIRED:
                                                            return <Tag color="red"
                                                                        style={{fontSize: "1em"}}>Hired</Tag>;
                                                        case ProductStatus.AVAILABLE:
                                                            return <Tag color="green"
                                                                        style={{fontSize: "1em"}}>Available</Tag>;
                                                    }
                                                }}/>
                                        {isMakingContract &&
                                        <Column title="Select"
                                                render={record => {
                                                    if (record.status === ProductStatus.AVAILABLE) {
                                                        return <Checkbox onClick={() => {
                                                            selectProduct(record);
                                                        }}/>
                                                    }
                                                }}/>}
                                    </Table>
                                </Space>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
                <Modal visible={isViewDetailsModalVisible} closable={false}
                       onCancel={() => {
                           setIsViewDetailsModalVisible(false);
                       }}
                       onOk={() => {
                           setIsViewDetailsModalVisible(false);
                       }}>
                    <Table dataSource={selectedViewProducts} pagination={false}>
                        <Column title="Name" dataIndex="name" render={value => <Text strong>{value}</Text>}/>
                        <Column title="Description" dataIndex="description"/>
                        <Column title="Key Taxcode Id" dataIndex="key_taxcode_id"/>
                    </Table>
                </Modal>
            </Layout>
        </>
    );
});

export default ProductManagementPage;
