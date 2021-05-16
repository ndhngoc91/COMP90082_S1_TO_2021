import React from "react";
import NavigatorBar from "../components/NavigationBar/NavigationBar";
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
    Typography
} from "antd";
import bikePhoto from "../assets/packages/Ski Packages/Performance Package.png";
import {usePackage} from "../hooks/PackageHooks";
import {useStores} from "../stores";

const {Content} = Layout;
const {Title} = Typography;

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
}

const PackageDetailsPage = () => {
    const params = useParams();

    const [package_] = usePackage(parseInt(params["packageId"]));

    const history = useHistory();

    const {shoppingCartStore: {addNewCartItem}} = useStores();

    const onFinish = values => {
        const total = Object.values(values).reduce((previousValue, currentValue) => previousValue + currentValue);
        if (total >= 1) {
            Object.keys(values).forEach(key => {
                if (values[key] > 0) {
                    addNewCartItem({
                        name: package_.name,
                        trailTypeId: key,
                        quantity: values[key],
                        cost: values[key] * 50
                    });
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
                            <Image style={{width: "100%"}} src={bikePhoto} preview={false}/>
                        </Col>
                        <Col span={12}>
                            <Space direction="vertical">
                                <Title level={2}>{package_.name}</Title>
                                <Descriptions bordered>
                                    <Descriptions.Item label="Status" span={3}>
                                        Available
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Summary" span={3}>
                                        {package_.description}
                                    </Descriptions.Item>
                                </Descriptions>
                                <Divider/>
                                {package_["trail_types"] &&
                                <Form {...layout} name="basic" initialValues={initialValues} onFinish={onFinish}>
                                    {package_["trail_types"].map((trailType, key) => {
                                        return <Form.Item label={trailType.name} key={key}
                                                          name={trailType.id}>
                                            <InputNumber size={"large"}/>
                                        </Form.Item>
                                    })}
                                    <Form.Item {...tailLayout}>
                                        <Button type="primary" htmlType="submit" size="large">Add to Cart</Button>
                                    </Form.Item>
                                </Form>}
                            </Space>
                        </Col>
                    </Row>}
                </Content>
            </Layout>
        </BrowserRouter>
    </Layout>
};

export default PackageDetailsPage;
