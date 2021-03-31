import React, {useState, useEffect} from "react";
import axios from "axios";
import {
    Button,
    Card,
    Col,
    Divider,
    Image,
    InputNumber,
    Modal,
    Row,
    Statistic,
    Typography
} from "antd";
import {
    DeleteOutlined,
    MinusOutlined,
    PlusOutlined,
    ProfileOutlined
} from "@ant-design/icons";

const {Title, Text} = Typography;
import ModelMetadata from "./ModelMetadata";
import ThreeDModelPresenter from "./3DModel/ThreeDModelPresenter";

const TallCartProduct = ({product, onQuantityChange, onRemove}) => {
    const [subtotal, setSubtotal] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);
    const [visible, setVisible] = useState(false);
    const [metadata, setMetadata] = useState(null);

    // Handles subtotal change as a result of quantity change.
    // Also notifies the parent component OrderPage of the quantity change
    useEffect(() => {
        setSubtotal(quantity * product.price);
        onQuantityChange(product.keyProductID, quantity);
    }, [quantity]);

    useEffect(() => {
        const {productCode} = product;
        (async () => {
            // Retrieve 3D model metadata (if it exists) for the product
            const response = await axios.get("/api/metadata/get", {
                params: {
                    productCode: productCode
                }
            });

            // Check if 3D model metadata exists for the product
            if (response.data.found) {
                setMetadata(response.data.json_data);
            }
        })();
    }, []);

    // Shows product specification modal
    const showModal = () => {
        setVisible(true)
    }

    // Handles quantity change as a result of changing input field value
    const handleChange = (newQuantity) => {
        setQuantity(Math.trunc(newQuantity))
    }

    // Handles quantity change as a result of clicking buttons
    const handleIncrement = (delta) => {
        const newQuantity = quantity + delta;
        if (newQuantity > 0 && newQuantity <= 100) {
            setQuantity(newQuantity);
        }
    }

    // Button to remove product from cart
    const removeButton = (
        <Button
            type="danger"
            onClick={() => onRemove(product.keyProductID)}
            icon={<DeleteOutlined/>}
        >
            Remove
        </Button>
    )

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
                            <ThreeDModelPresenter modelUrl={model.threeDModelLocation}/>
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
            <Col span={18}>
                <Card title={product.productName} style={{borderRadius: "1.25rem"}} hoverable={true}
                      extra={removeButton}>

                    {/* Product image */}
                    <Row>
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
                                        <Text>${Number(product.price).toFixed(2)}</Text>
                                    </div>
                                </Col>
                            </Row>

                            {metadata && (
                                <Row gutter={[0, 16]}>
                                    <Button type="secondary" onClick={() => showModal()} icon={<ProfileOutlined/>}>
                                        Product Specifications
                                    </Button>
                                </Row>
                            )}
                            <Divider/>
                            <Row>
                                <Col span={12}>
                                    <Title level={5}>Quantity</Title>
                                    <Button type="secondary" icon={<MinusOutlined/>}
                                            onClick={() => handleIncrement(-1)}/>
                                    <InputNumber min={1} max={100} defaultValue={1} value={quantity}
                                                 onChange={(value) => handleChange(value)}/>
                                    <Button type="secondary" icon={<PlusOutlined/>} onClick={() => handleIncrement(1)}/>
                                </Col>
                                <Col>
                                    <Title level={5}>Subtotal (Ex GST)</Title>
                                    <div style={{textAlign: "end"}}>
                                        <Statistic value={subtotal} prefix="$" precision={2}/>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>

            {/* Modal for Product 3D Image Metadata */}
            <Modal title="Product Specifications"
                   visible={visible}
                   centered={true}
                   closable={false}
                   footer={<Button type="secondary" onClick={() => setVisible(false)}>Close</Button>}
                   style={{top: 20}}
                   width="80vw"
                   maskClosable={true}>
                <ModelMetadata metadata={metadata}/>
            </Modal>
        </Row>
    );
}

export default TallCartProduct;
