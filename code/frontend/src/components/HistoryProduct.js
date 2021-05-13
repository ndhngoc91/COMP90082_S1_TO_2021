import React, {useState, useEffect} from "react";
import axios from "axios";
import {
    Button,
    Card,
    Col,
    Divider,
    Image,
    Modal,
    notification,
    Row,
    Statistic,
    Typography
} from "antd";
import {
    FileDoneOutlined,
    FileTextOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";

const {Title, Text} = Typography;
import {useHistory} from "react-router-dom";
import {useStores} from "../stores";

const HistoryProduct = ({product}) => {
    const [showModal, setShowModal] = useState(false);
    const [metadata, setMetadata] = useState(null);

    const {cartStore: {readdProduct}} = useStores();

    const history = useHistory();

    // Before rendering the component, fetch product 3D model metadata (if it exists)
    useEffect(() => {
        const {productCode} = product;
        (async () => {
            // Retrieve 3D model metadata (if it exists) for the product
            const response = await axios.get(`http://127.0.0.1:8000/products/${productCode}/metadata/get`);

            // Check if 3D model metadata exists for the product
            if (response.data.found) {
                setMetadata(response.data.json_data);
            }
        })();
    }, []);


    // Button to readd product from order history to the cart
    const readdButton = (
        <Button
            icon={<ShoppingCartOutlined/>}
            type="secondary"
            onClick={() => handleClick()}
        >
            Add To Cart
        </Button>
    )

    // Handles click of readd button
    const handleClick = () => {
        readdProduct(product);
        notification.success({
            message: "Product was successfully readded to the cart",
            placement: "topRight"
        });
    }


    /**
     * Returns the component that will either render a 3D model
     * or display a 2D image for a given HolySAS product
     */
    const productImage = () => {
        const {imageList} = product;

        let src;
        if (!imageList) {
            src = "error";
        } else {
            let model = imageList.find(image => image.is3DModelType === "Y");
            if (model) {
                return (
                    <Col span={18}>
                        <div style={{height: 300}}>
                            3D Presenter (deprecated)
                        </div>
                    </Col>
                )
            }
        }

        if (!src) {
            let image = imageList.find(image => image.is3DModelType === "N");
            src = image ? image.largeImageLocation : "error";
        }

        return (
            <Image
                width={256}
                src={src}
                alt="HolySAS Product"
                fallback="data:image/png;base64,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"
            />
        );
    }


    return (
        <Row justify="center" gutter={[32, 32]}>
            <Col span={24}>
                <Card title={product.productName} style={{borderRadius: "1.25rem"}} extra={readdButton} hoverable>
                    <Row>
                        {/* Product image */}
                        <Col span={12}>
                            <Row justify="center" align="middle">
                                {productImage()}
                            </Row>
                        </Col>

                        {/* Product details, specification, quantity and subtotal */}
                        <Col span={10} offset={2}>
                            <Row gutter={[0, 32]}>
                                <Col span={12}>
                                    <Title level={5}>Product Code</Title>
                                    <Text>{product.productCode}</Text>
                                </Col>
                                <Col offset={1}>
                                    <Title level={5}>Price (Ex GST)</Title>
                                    <div style={{textAlign: "end"}}>
                                        <Text>${Number(product.unitPrice).toFixed(2)}</Text>
                                    </div>
                                </Col>
                            </Row>

                            <Row gutter={[0, 16]}>
                                {/* Button to redirect to product details page */}
                                <Button
                                    type="secondary"
                                    onClick={() => history.push(`/products/${product.productCode}`)}
                                    icon={<FileTextOutlined/>}
                                >
                                    Product Details
                                </Button>

                                {/* Button to show modal for product specifications */}
                                {metadata && (
                                    <Button
                                        style={{marginLeft: 8}}
                                        type="secondary"
                                        onClick={() => setShowModal(true)}
                                        icon={<FileDoneOutlined/>}
                                    >
                                        Product Specifications
                                    </Button>
                                )}
                            </Row>

                            <Divider/>
                            <Row>
                                <Col span={12}>
                                    <Title level={5}>Quantity</Title>
                                    <Text>{product.quantity}</Text>
                                </Col>
                                <Col>
                                    <Title level={5}>Subtotal (Ex GST)</Title>
                                    <div style={{textAlign: "end"}}>
                                        <Statistic value={product.totalPrice} prefix="$" precision={2}/>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>

            {/* Modal for 3D image parameter data */}
            <Modal
                title="Product Specifications"
                visible={showModal}
                centered={true}
                closable={false}
                footer={<Button type="secondary" onClick={() => setShowModal(false)}>Close</Button>}
                style={{top: 20}}
                width="80vw"
                maskClosable={true}
            >
                Model Metadata
            </Modal>
        </Row>
    );
}

export default HistoryProduct;
