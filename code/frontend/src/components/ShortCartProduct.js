import React, {useState, useEffect} from "react";
import modelIcon from "../assets/3dmodel.png";
import ThreeDModelPresenter from "./3DModel/ThreeDModelPresenter";
import {
    RotateLeftOutlined,
    ZoomInOutlined,
    DragOutlined,
} from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Image,
    InputNumber,
    Modal,
    Row,
    Typography,
    Divider
} from "antd";
const {Text, Title} = Typography;
import {
    DeleteOutlined,
    MinusOutlined,
    PlusOutlined,
} from "@ant-design/icons";

const ShortCartProduct = ({product, onQuantityChange, onRemove}) => {
    const [subtotal, setSubtotal] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);
    const [showModal, setShowModal] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [modelURL, setModelURL] = useState(null);
    const [presenter, setPresenter] = useState(null);

    // Set image location and/or model URL before rendering the component
    useEffect(() => {
        const {imageList} = product;

        let src;
        if (!imageList) {
            src = "error";
        } else {
            let model = imageList.find(image => image.is3DModelType === "Y");
            if (model) {
                src = modelIcon;
                setModelURL(model.threeDModelLocation);
            }
        }

        if (!src) {
            let image = imageList.find(image => image.is3DModelType === "N");
            src = image ? image.largeImageLocation : "error";
        }

        setImageURL(src);
    }, []);

    // Handles subtotal change as a result of quantity change.
    // Also notifies the parent component OrderPage of the quantity change
    useEffect(() => {
        setSubtotal(quantity * product.price);
        onQuantityChange(product.keyProductID, quantity);
    }, [quantity]);

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

    // Displays the modal to interact with the 3D model if this product has one
    const handleImageClick = () => {
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
            <Row justify="center">
                <Col span={18}>
                    <Card
                        style={{borderRadius: "1.25rem", marginTop: 8}}
                        hoverable
                    >
                        <Row justify="space-around" align="middle">
                            <Col>
                                <div onClick={() => handleImageClick()}>
                                    <Image
                                        width={64}
                                        src={imageURL}
                                        preview={imageURL !== modelIcon}
                                        alt="HolySAS Product"
                                        fallback="data:image/png;base64,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"
                                    />
                                </div>
                            </Col>
                            <Col span={8}>
                                <Title level={5}>{product.productName}</Title>
                                <Text type="secondary">Product Code: {product.productCode}</Text>
                            </Col>
                            <Col>
                                <Title level={5}>Price (Ex GST)</Title>
                                <div style={{textAlign: "end"}}>
                                    <Text>AUD ${product.price ? product.price : "0.00"}</Text>
                                </div>
                            </Col>
                            <Col>
                                <Title level={5}>Quantity</Title>
                                <Button size="small" type="secondary" icon={<MinusOutlined/>}
                                        onClick={() => handleIncrement(-1)}/>
                                <InputNumber size="small" min={1} max={100} defaultValue={1} value={quantity}
                                             onChange={(value) => handleChange(value)}/>
                                <Button size="small" type="secondary" icon={<PlusOutlined/>}
                                        onClick={() => handleIncrement(1)}/>
                            </Col>
                            <Col>
                                <Title level={5}>Subtotal (Ex GST)</Title>
                                <div style={{textAlign: "end"}}>
                                    <Text>AUD ${subtotal.toFixed(2)}</Text>
                                </div>
                            </Col>
                            <Col>
                                <Button
                                    type="danger"
                                    onClick={() => onRemove(product.keyProductID)}
                                    icon={<DeleteOutlined/>}
                                >
                                    Remove
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            <Modal
                title={`${product.productName} 3D Model`}
                visible={showModal}
                centered={true}
                closable={false}
                width="50vw"
                //heigh="400" // new
                footer={<Button type="secondary" onClick={() => setShowModal(false)}>Close</Button>}
                maskClosable={true}
            >
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

export default ShortCartProduct;
