import React from "react";
import {Layout, Table, Tag} from "antd";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import {useProducts} from "../../hooks/ProductHooks";
import {ProductStatus} from "../../consts/ProductStatus";

const {Content} = Layout;
const {Column} = Table;

const ProductManagementPage = () => {
    const products = useProducts();

    return (
        <>
            <Layout style={{minHeight: "100vh"}}>
                <NavigationBar/>
                <Layout style={{height: "100%"}}>
                    <Content>
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
                        </Table>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default ProductManagementPage;
