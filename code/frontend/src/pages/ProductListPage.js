import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import imageComing from "../assets/imageComing.png";
import {
    HomeOutlined,
    ShopOutlined
} from "@ant-design/icons";
import CategoryTree from "../components/CategoryTree";
import {
    List,
    Card,
    Image,
    Layout,
    Spin,
    Breadcrumb,
    Pagination,
    Statistic
} from "antd";

const {Meta} = Card;
const {Content, Sider, Footer} = Layout;
import NavigationBar from "../components/NavigationBar";
import {useHandleGetItems} from "../hooks/ProductHooks";

const ProductListPage = () => {
    const [pageCurrent, setPageCurrent] = useState(parseInt(window.location.hash.slice(1), 0) || 1);

    const [getItems, {loading, items, totalItems}] = useHandleGetItems();

    useEffect(() => {
        getItems(pageCurrent);
    }, [pageCurrent])

    const getImage = (image) => {
        if (image != null && image !== "") {
            return image.smallImageLocation;
        }
        return imageComing;
    }

    const onPageNumChange = (pageCurrent) => {
        setPageCurrent(pageCurrent);
        window.location.hash = `#${pageCurrent}`;
    };

    return (
        <Layout>
            <NavigationBar defaultSelected="/productList"/>
            <Layout>
                <Sider width={256} className="site-layout-background">
                    <CategoryTree/>
                </Sider>
                <Layout style={{padding: "0 24px 24px"}}>
                    <Content className="site-layout" style={{padding: "0 50px"}}>
                        <Breadcrumb style={{margin: "16px 0"}}>
                            <Breadcrumb.Item href="/">
                                <HomeOutlined/>
                                <span>Home</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/productList">
                                <ShopOutlined/>
                                <span>Products</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        {loading ? <Spin size="large"/> :
                            <List
                                grid={{
                                    gutter: 16, column: 4
                                }}
                                dataSource={items}
                                renderItem={item => (
                                    <List.Item>
                                        <Link to={`/products/${item.productCode}`}>
                                            <Card title={<div style={{whiteSpace: "pre-line"}}>{item.name}</div>}
                                                  key={item.name}
                                                  hoverable
                                                  cover={<Image alt="example"
                                                                src={getImage(item.image[0])}
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = imageComing
                                                                }}/>}>
                                                <Meta key={item.productCode}
                                                      title={<Statistic value={item.price} prefix="$"
                                                                        precision={2}/>}
                                                      description={item.barcode ? ("Barcode: " + item.barcode) : ("ProductCode: " + item.productCode)}
                                                />
                                            </Card>
                                        </Link>
                                    </List.Item>
                                )}
                            />}
                        <Pagination total={totalItems}
                                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                                    pageSize={20}
                                    current={pageCurrent}
                                    onChange={onPageNumChange}
                                    showQuickJumper/>
                        <Footer style={{textAlign: "center"}}>SQUIZZ ©2020 Created by SQ-Wombat and SQ-Koala</Footer>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default ProductListPage;
