import React from "react";
import {Checkbox, Col, Layout, List, Row, Table, Tag} from "antd";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import {useProducts} from "../../hooks/ProductHooks";
import {ProductStatus} from "../../consts/ProductStatus";
import {useStores} from "../../stores";
import Avatar from "antd/es/avatar/avatar";
import {useProductManagementPageStyle} from "./styles";

const {Content} = Layout;
const {Column} = Table;

const ProductManagementPage = () => {
    const {hiringEquipmentRegister: {isPickingProducts}} = useStores();
    const products = useProducts();

    const data = [1, 2];
    console.log(isPickingProducts);

    const {mainContentCls, recipientListCls} = useProductManagementPageStyle();

    return (
        <>
            <Layout style={{minHeight: "100vh"}}>
                <NavigationBar/>
                <Layout style={{height: "100%"}}>
                    <Content className={mainContentCls}>
                        <Row justify="space-around" gutter={16}>
                            <Col span={6}>
                                <List className={recipientListCls}
                                      itemLayout="horizontal"
                                      dataSource={data}
                                      renderItem={item => (
                                          <List.Item>
                                              <List.Item.Meta
                                                  avatar={<Avatar
                                                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                                  title={<a href="https://ant.design">ABC</a>}
                                                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                              />
                                          </List.Item>
                                      )}
                                />
                            </Col>
                            <Col span={18}>
                                <Table dataSource={products}>
                                    <Column title="Name" dataIndex="name"/>
                                    <Column title="Description" dataIndex="description"/>
                                    <Column title="Product Code" dataIndex="product_code"/>
                                    <Column title="Key Product Id" dataIndex="key_product_id"/>
                                    <Column title="Key Taxcode Id" dataIndex="key_taxcode_id"/>
                                    <Column title="Status" dataIndex="status"
                                            render={status => {
                                                switch (status) {
                                                    case ProductStatus.RESERVED:
                                                        return <Tag color="red">Reserved</Tag>;
                                                    case ProductStatus.HIRED:
                                                        return <Tag color="red">Hired</Tag>;
                                                    case ProductStatus.AVAILABLE:
                                                        return <Tag color="green">Available</Tag>;
                                                }
                                            }}/>
                                    {isPickingProducts &&
                                    <Column title="Select"
                                            render={() => {
                                                return <Checkbox/>
                                            }}/>}
                                </Table>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default ProductManagementPage;
