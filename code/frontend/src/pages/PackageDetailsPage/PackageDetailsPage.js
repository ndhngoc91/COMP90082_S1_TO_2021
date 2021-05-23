import React, {useState} from "react";
import NavigatorBar from "../../components/NavigationBar/NavigationBar";
import {BrowserRouter, useHistory, useParams} from "react-router-dom";
import {
    Button,
    Col,
    Descriptions, Divider,
    Form,
    Image,
    InputNumber,
    Layout,
    notification,
    Row,
    Space,
    Typography,
    Checkbox
} from "antd";
import {usePackage} from "../../hooks/PackageHooks";
import {useStores} from "../../stores";
import imageComing from "../../assets/imageComing.png";

const {Content} = Layout;
const {Title, Paragraph, Text} = Typography;

const layout = {
    labelCol: {span: 16},
    wrapperCol: {span: 8},
};
const tailLayout = {
    wrapperCol: {offset: 16, span: 8},
};

const initialValues = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
};

const PackageDetailsPage = () => {
    const params = useParams();

    const [selectedExtraItems, setSelectedExtraItems] = useState([]);
    const [package_] = usePackage(parseInt(params["packageId"]));

    const history = useHistory();

    const {shoppingCartStore: {addNewCartItem}} = useStores();

    const selectExtraItems = values => {
        setSelectedExtraItems(values);
    };

    const onFinish = values => {
        const total = Object.values(values).reduce((previousValue, currentValue) => previousValue + currentValue);
        if (total >= 1) {
            const extraItems = [];
            package_["extra_items"].forEach(extraItem => {
                extraItems.push({
                    id: extraItem["id"],
                    name: extraItem["name"],
                    basePrice: extraItem["base_price"],
                    priceLevels: extraItem["price_levels"].split(","),
                    cost: extraItem["base_price"],
                    selected: selectedExtraItems.includes(extraItem["id"])
                });
            });

            Object.keys(values).forEach(key => {
                if (values[key] > 0) {
                    for (let i = 0; i < values[key]; i++) {
                        addNewCartItem({
                            packageId: package_["id"],
                            name: package_["name"],
                            trailType: package_["trail_types"].find(trailType => trailType["id"] === parseInt(key)),
                            basePrice: package_["base_price"],
                            priceLevels: package_["price_levels"].split(","),
                            cost: package_["base_price"],
                            extraItems: extraItems
                        });
                    }
                }
            });
            history.push("/shopping-cart");
        } else {
            notification.error({message: "Please input counts!", placement: "bottomRight"});
        }
    };

    return <Layout style={{minHeight: "100vh"}}>
        <NavigatorBar/>
        <BrowserRouter>
            <Layout>
                <Content style={{padding: "3em", backgroundColor: "#FFFFFF"}}>
                    {package_ &&
                    <Row justify="space-between" gutter={80}>
                        <Col span={12}>
                            <Image style={{width: "100%"}} src={package_["image_url"]} fallback={imageComing}/>
                        </Col>
                        <Col span={12}>
                            <Space direction="vertical">
                                <Row justify="space-between">
                                    <Text strong style={{fontSize: "2em"}}>{package_["name"]}</Text>
                                    <Text strong style={{fontSize: "2em"}}>${package_["base_price"]}</Text>
                                </Row>
                                <Descriptions bordered>
                                    <Descriptions.Item label="Status" span={3}>
                                        Available
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Summary" span={3}>
                                        {package_["description"] && package_["description"].split("/").map((description, key) => {
                                            return <Paragraph key={key}>{description}</Paragraph>;
                                        })}
                                    </Descriptions.Item>
                                </Descriptions>
                                <Divider/>
                                <Row>
                                    <Col span={12}>
                                        {package_["extra_items"] &&
                                        <>
                                            <Row><Title level={2}>Extra Items</Title></Row>
                                            <Checkbox.Group name="extra_items" onChange={selectExtraItems}>
                                                {package_["extra_items"].map((extraItem, key) => {
                                                    return <Row key={key}>
                                                        <Checkbox value={extraItem["id"]}>
                                                            {extraItem["name"]}
                                                        </Checkbox>
                                                    </Row>;
                                                })}
                                            </Checkbox.Group>
                                        </>}
                                    </Col>
                                    <Col span={12}>
                                        {package_["trail_types"] &&
                                        <Form {...layout} name="basic" initialValues={initialValues}
                                              onFinish={onFinish}>
                                            {package_["trail_types"].map((trailType, key) => {
                                                return <Form.Item label={trailType.name} key={key}
                                                                  name={trailType.id}>
                                                    <InputNumber size={"large"}/>
                                                </Form.Item>
                                            })}
                                            <Form.Item {...tailLayout}>
                                                <Button type="primary" htmlType="submit" size="large">Add to
                                                    Cart</Button>
                                            </Form.Item>
                                        </Form>}
                                    </Col>
                                </Row>
                            </Space>
                        </Col>
                    </Row>}
                </Content>
            </Layout>
        </BrowserRouter>
    </Layout>
};

export default PackageDetailsPage;
