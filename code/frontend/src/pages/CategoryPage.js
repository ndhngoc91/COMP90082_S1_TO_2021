import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import imageComing from "../assets/imageComing.png";
import {
    HomeOutlined,
    ShopOutlined,
    TagOutlined,
    RotateLeftOutlined,
    ZoomInOutlined,
    DragOutlined
} from "@ant-design/icons";
import ThreeDModelPresenter from "../components/3DModel/ThreeDModelPresenter"
import modelIcon from "../assets/3dmodel.png";
import {
    List,
    Card,
    Image,
    Layout,
    Spin,
    Breadcrumb,
    Pagination,
    Modal,
    Button,
    Row,
    Col,
    Divider,
    Statistic
} from "antd";

const {Meta} = Card;
const {Content, Footer, Sider} = Layout;

import NavigationBar from "../components/NavigationBar/NavigationBar";
import CategoryTree from "../components/CategoryTree";
import {useHandleGetItems} from "../hooks/ProductHooks";
import PageFooter from "../components/PageFooter/PageFooter";

const CategoryPage = () => {
    const {id: cate} = useParams();

    const [pageCurrent, setPageCurrent] = useState(parseInt(window.location.hash.slice(1), 0) || 1);
    const [presenter, setPresenter] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [getItems, {loading, items, totalItems}] = useHandleGetItems();

    useEffect(() => {
        getItems(pageCurrent, cate);
    }, [pageCurrent, cate]);

    const onPageNumChange = (pageCurrent) => {
        setPageCurrent(pageCurrent);
        window.location.hash = `#${pageCurrent}`;
    }

    //if item.image cannot be gotten in a normal way, show the default image
    const getImage = (image) => {
        if (image !== null && image !== undefined && image !== "") {
            return image.smallImageLocation;
        }
        return imageComing;
    };

    const get3dModel = (images) => {
        const models = images.filter((imageInfo) => imageInfo.is3DModelType === "Y")
        if (models && models.length)
            return models[0].threeDModelLocation;
        else return null
    };

    const getPlaneImage = (images) => {

        const models = images.filter((imageInfo) => imageInfo.is3DModelType === "N")
        if (models && models.length) {

            console.log(models[0].smallImageLocation);
            return models[0].smallImageLocation;
        }
        console.log("-> " + imageComing);
        return imageComing
    };

    // Displays the modal to interact with the 3D model if this product has one
    const handleImageClick = (modelURL) => {
        if (modelURL) {
            setPresenter(null);
            setShowModal(true);

            setTimeout(() => {
                setPresenter(<ThreeDModelPresenter modelUrl={modelURL}/>);
            }, 1000);
        }
    };

    return (
        <>
            <Layout>
                <Spin size="large"/>
                <NavigationBar defaultSeletced="/productList"/>
                <Layout>
                    <Sider width={256} className="site-layout-background">
                        <CategoryTree/>
                    </Sider>
                    <Layout style={{padding: "0 24px 24px"}}>
                        <Content className="site-layout" style={{padding: "0 50px", marginTop: 64}}>
                            <Breadcrumb style={{margin: "16px 0"}}>
                                <Breadcrumb.Item href="/">
                                    <HomeOutlined/>
                                    <span>Home</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="/productList">
                                    <ShopOutlined/>
                                    <span>Products</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <TagOutlined/>
                                    <span>Category</span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            {loading ? <Spin size="large"/> :
                                <List grid={{gutter: 16, column: 4}}
                                      dataSource={items}
                                      renderItem={item => (
                                          <List.Item>
                                              {
                                                  get3dModel(item.image) == null
                                                      ?
                                                      <Link to={"/products/" + item.productCode}>
                                                          <Card title={<div style={{whiteSpace: "pre-line"}}>{item.name}</div>}
                                                                key={item.name}
                                                                hoverable
                                                                cover=
                                                                    {
                                                                        <Image alt="example"
                                                                               src={getImage(item.image[0])}
                                                                            //if image is 404 not found, show the default image
                                                                               onError={(e) => {
                                                                                   e.target.onerror = null;
                                                                                   e.target.src = imageComing
                                                                               }}/>

                                                                    }>
                                                              <Meta key={item.productCode}
                                                                  //title={item.price ? ("$ "+item.price) : ("99.99")}
                                                                    title={<Statistic value={item.price} prefix="$"
                                                                                      precision={2}/>}
                                                                    description={item.barcode ? ("Barcode: " + item.barcode) : ("ProductCode: " + item.productCode)}
                                                              />
                                                          </Card>
                                                      </Link>
                                                      :

                                                      <Card
                                                          title=
                                                              {
                                                                  <Link to={"/products/" + item.productCode} style={{
                                                                      color: "black",
                                                                      whiteSpace: "pre-line"
                                                                  }}>
                                                                      {item.name}
                                                                  </Link>
                                                              }
                                                          key={item.name}
                                                          hoverable
                                                          cover=
                                                              {
                                                                  <Link to={"/products/" + item.productCode}>
                                                                      <Image alt="example"
                                                                             src={getPlaneImage(item.image)}
                                                                             onError={(e) => {
                                                                                 e.target.onerror = null;
                                                                                 e.target.src = imageComing
                                                                             }}/>

                                                                  </Link>
                                                              }>
                                                          <Meta key={item.productCode}
                                                                title=
                                                                    {
                                                                        <>
                                                                            <Row>
                                                                                <Col flex={5}>
                                                                                    <Link
                                                                                        to={"/products/" + item.productCode}
                                                                                        style={{
                                                                                            color: "black",
                                                                                            whiteSpace: "pre-line",
                                                                                            float: "bottom"
                                                                                        }}>
                                                                                        {<Statistic
                                                                                            title={"Price (AUD)"}
                                                                                            value={item.price}
                                                                                            prefix="$"
                                                                                            precision={2}/>}
                                                                                    </Link>
                                                                                </Col>
                                                                                <Col flex={1}>
                                                                                    <div onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        handleImageClick(get3dModel(item.image))
                                                                                    }}>
                                                                                        {<Image
                                                                                            width={50}
                                                                                            src={modelIcon}
                                                                                            preview={modelIcon !== modelIcon}
                                                                                            alt="HolySAS Product"
                                                                                            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                                                                                        />}
                                                                                    </div>
                                                                                </Col>
                                                                            </Row>

                                                                        </>
                                                                    }
                                                                description=
                                                                    {
                                                                        <Link to={"/products/" + item.productCode}
                                                                              style={{
                                                                                  color: "#00000073",
                                                                                  whiteSpace: "pre-line"
                                                                              }}>
                                                                            {item.barcode ? ("Barcode: " + item.barcode) : ("ProductCode: " + item.productCode)}
                                                                        </Link>
                                                                    }
                                                          />
                                                      </Card>

                                              }
                                          </List.Item>
                                      )}
                                />
                            }
                            <Pagination //add active url for each productlist page
                                total={totalItems}
                                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                                pageSize={20}
                                current={pageCurrent}
                                onChange={onPageNumChange}
                                showQuickJumper
                            />

                            <PageFooter/>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>

            <Modal title={`3D Model Preview`}
                   visible={showModal}
                   centered={true}
                   closable={false}
                   width="50vw"
                   footer={<Button type="secondary" onClick={() => setShowModal(false)}>Close</Button>}
                   maskClosable={true}>
                <Row justify="center" align="middle">
                    <Col>
                        <div style={{height: "50vh", width: "35vw"}}>
                            {presenter}
                        </div>
                        <Divider>Instructions</Divider>
                        <div>
                            <RotateLeftOutlined/> Click and Drag to Rotate <br/>
                            <ZoomInOutlined/> Scroll to Zoom <br/>
                            <DragOutlined/> Arrow Keys to Pan
                        </div>
                    </Col>
                </Row>
            </Modal>

        </>
    );
}

export default CategoryPage;
