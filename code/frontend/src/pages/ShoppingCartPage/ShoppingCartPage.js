import React from "react";
import {
    Button, Row, Col, Descriptions, Divider, Image, Layout, Space, Typography, DatePicker,
    Tag, Table, Checkbox, notification, message
} from "antd";
import NavigatorBar from "../../components/NavigationBar/NavigationBar";
import {useHistory} from "react-router-dom";
import {useStores} from "../../stores";
import {useShoppingCartPageStyles} from "./styles";
import {observer} from "mobx-react-lite";
import {USER_ROLE} from "../../consts/UserRole";
import bikePhoto from "../../assets/packages/Ski Packages/Performance Package.png";
import moment from "moment";
import CheckoutProgressBar from "../../components/CheckoutProgressBar/CheckoutProgressBar";

const {Content} = Layout;
const {Title} = Typography;
const {RangePicker} = DatePicker;
const {Column} = Table;

const ShoppingCartPage = observer(() => {
    const {
        authStore: {userRole},
        shoppingCartStore: {
            cartItems,
            startDate,
            endDate,
            totalCost,
            isCheckedOut,
            deleteCartItem,
            setDates,
            toggleExtraItem
        }
    } = useStores();

    const history = useHistory();

    if (isCheckedOut) {
        history.push("/finish");
    }

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
                            <CheckoutProgressBar current={0}/>
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
                                                        return <Checkbox checked={selected} onChange={e => {
                                                            toggleExtraItem(cartItem["id"], record["id"])
                                                            if (e.target.checked) {
                                                                message.success(`Added ${record["name"]}`).then();
                                                            } else {
                                                                message.error(`Removed ${record["name"]}`).then();
                                                            }
                                                        }}/>;
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
                                Input Recipients
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
