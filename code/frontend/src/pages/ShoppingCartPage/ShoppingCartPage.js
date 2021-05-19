import React from "react";
import {
    Button,
    Col,
    Descriptions,
    Divider,
    Image,
    Layout,
    Row,
    Space,
    Typography,
    DatePicker,
    Tag,
    notification, Table, Steps
} from "antd";
import NavigatorBar from "../../components/NavigationBar/NavigationBar";
import {useHistory} from "react-router-dom";
import {useStores} from "../../stores";
import {useShoppingCartPageStyles} from "./styles";
import {observer} from "mobx-react-lite";
import {USER_ROLE} from "../../consts/UserRole";
import bikePhoto from "../../assets/packages/Ski Packages/Performance Package.png";
import * as pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from "moment";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const {Content} = Layout;
const {Title} = Typography;
const {RangePicker} = DatePicker;
const {Column} = Table;
const {Step} = Steps;

const ShoppingCartPage = observer(() => {
    const history = useHistory();

    const {
        authStore: {userRole},
        shoppingCartStore: {cartItems, startDate, endDate, totalCost, deleteCartItem, setDates, toggleExtraItem}
    } = useStores();

    const onRangePickerSelect = (dates, dateStrings) => {
        const intendedNumberOfHiringDays = dates[1].diff(dates[0], "days");
        if (intendedNumberOfHiringDays >= 7) {
            notification.error({message: "You cannot hire for more than 7 days!"});
        } else {
            const [selectedStartDate, selectedEndDate] = dateStrings;
            setDates({startDate: selectedStartDate, endDate: selectedEndDate});
        }
    };

    const onCheckoutButtonClick = () => {
        history.push("/checkout");
    };

    const {tagCls, fullWidthCls} = useShoppingCartPageStyles();

    return <Layout style={{minHeight: "100vh"}}>
        <NavigatorBar/>
        <Layout>
            <Content style={{padding: "3em", backgroundColor: "#FFFFFF"}}>
                <Row justify="space-between" gutter={80}>
                    <Col span={18}>

                        <Row gutter={16}>
                            <Col span={4}>
                                <Title level={2}>Shopping Cart</Title>
                            </Col>
                            <Col span={16}>
                            </Col>
                            <Col span={4}>
                                <Tag className={tagCls} color="green">
                                    Total Cost: ${totalCost}
                                </Tag>
                            </Col>
                        </Row>
                        <Divider/>
                        <Row>
                            <Steps progressDot current={0}>
                                <Step title="Booking"/>
                                <Step title="Input Contacts"/>
                                <Step title="Done"/>
                            </Steps>
                        </Row>
                        <Divider/>
                        <RangePicker renderExtraFooter={() => "extra footer"} showTime
                                     value={[moment(startDate, "YYYY-MM-DD hh:mm:ss"), moment(endDate, "YYYY-MM-DD hh:mm:ss")]}
                                     onChange={onRangePickerSelect}/>
                        <Divider/>
                        {cartItems.map((cartItem, key) => {
                            return <div key={key}>
                                <Row gutter={16}>
                                    <Col span={4}>
                                        <Image className={fullWidthCls} src={bikePhoto} preview={false}/>
                                    </Col>
                                    <Col span={16}>
                                        <Title level={3}>{cartItem.name}</Title>
                                        <Descriptions>
                                            <Descriptions.Item span={3}>
                                                {cartItem.name}
                                            </Descriptions.Item>
                                        </Descriptions>
                                        <Title level={3}>{cartItem["trailType"]["name"]}</Title>
                                        <Table dataSource={cartItem.extraItems} rowKey={record => {
                                            return record["id"];
                                        }} pagination={false}>
                                            <Column title="Name" dataIndex="name"/>
                                            <Column title="Cost" dataIndex="cost" render={text => {
                                                return `$${text}`;
                                            }}/>
                                            <Column title="Selected" dataIndex="selected"
                                                    render={(selected, record) => {
                                                        return <Tag color={selected ? "green" : "red"} onClick={() => {
                                                            toggleExtraItem(cartItem["id"], record["id"]);
                                                        }}>
                                                            {selected ? "Selected" : "Not Selected"}
                                                        </Tag>;
                                                    }}/>
                                        </Table>
                                    </Col>
                                    <Col span={2}>
                                        <Title level={1}>${cartItem.cost}</Title>
                                    </Col>
                                    <Col span={2}>
                                        <Button size="large" onClick={() => deleteCartItem(cartItem.id)}>
                                            Remove
                                        </Button>
                                    </Col>
                                </Row>
                                <Divider/>
                            </div>
                        })}
                    </Col>
                    <Col span={6}>
                        <Space direction="vertical" className={fullWidthCls}>
                            {userRole === USER_ROLE.CUSTOMER &&
                            <Button className={fullWidthCls} type="primary" size="large"
                                    onClick={onCheckoutButtonClick}>
                                Proceed to checkout
                            </Button>}
                            {userRole === USER_ROLE.GUEST &&
                            <Button className={fullWidthCls} type="primary" size="large" onClick={() => {
                                history.push("/login");
                            }}>
                                Please login to checkout
                            </Button>}
                            <Button className={fullWidthCls} size="large" onClick={() => {
                                history.push("/packages");
                            }}>
                                Continue ordering
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Content>
        </Layout>
    </Layout>;
});

export default ShoppingCartPage;
