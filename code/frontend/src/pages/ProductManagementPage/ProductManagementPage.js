import React from "react";
import {
    Button,
    Checkbox,
    Col,
    Divider,
    Layout,
    List,
    notification,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Typography
} from "antd";
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
const {Option} = Select;

const avatarUrl = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

const ProductManagementPage = observer(() => {
    const {
        hiringEquipmentRegister: {
            selectedRecipientId,
            recipients,
            isMakingContract,
            isReadyToMakeContract,
            contractDetails,
            selectProduct,
            cancelSelection,
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
                                                  style={{padding: ".5em"}}
                                                  avatar={<Avatar src={avatarUrl}/>}
                                                  title={<a href="https://ant.design">
                                                      {recipient.first_name} {recipient.last_name}
                                                  </a>}
                                                  description={selectedRecipientId === recipient.id ?
                                                      <Tag color="blue" style={{fontSize: "1em"}}>Handling</Tag> :
                                                      <Tag color="green" style={{fontSize: "1em"}}>Processed</Tag>}
                                              />
                                          </List.Item>;
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
                                    <Select defaultValue={ProductStatus.AVAILABLE} size="large">
                                        <Option value={ProductStatus.AVAILABLE}>Available</Option>
                                        <Option value={ProductStatus.RESERVED}>Reserved</Option>
                                        <Option value={ProductStatus.HIRED}>Hired</Option>
                                    </Select>
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
            </Layout>
        </>
    );
});

export default ProductManagementPage;
