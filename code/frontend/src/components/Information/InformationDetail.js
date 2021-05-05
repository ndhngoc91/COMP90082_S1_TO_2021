import React from "react";
import 'antd/dist/antd.css'
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons";
import {
    Form,
    Input,
    Button,
    Select,
    Descriptions,
    Card,
    Modal, DatePicker, Rate,
} from 'antd';
import moment from 'moment';

const { Option } = Select;


class InformationDetail extends React.Component{


    state ={
        modelVisible: 0,
        profile: {
            id: '2',
            customer_id: '2',
            gender: 'Male',
            first_name: 'John',
            last_name: 'Wick',
            contact: '6137708899',
            organization: '',
            email: '123456@gmail.com',
            address_line1: 'hello street',
            address_line2: 'apt2',
            address_line3: '',
            postcode: '3054',
            region: 'VIC',
            country: 'Australia',
            height:'180',
            weight:'50',
            birthDate:'2013/1/1',
            dinResult:'1314',
            shoeSize:'24',
            skierAbility:3

        }
    }

    handleCancel = () =>{
        this.setState({
            modelVisible: 0
        })
    }

    showProfile = () =>{
        this.setState({
            modelVisible: 1
        })
    }

    editProfile = () =>{
        this.setState({
            modelVisible: 0
        })
    }

    showCalculateDin = () =>{
        this.setState({
            modelVisible: 2
        })
    }

    calculateDIn = () =>{
        this.setState({
            modelVisible: 0
        })
    }

    render() {
        const title = " User Profile"
        const dateFormat = 'YYYY/MM/DD';
        const profile = this.state.profile
        const birthDate = profile.birthDate
        console.log(birthDate)


        const editButton =(
            <div>
                <Button type = 'primary' onClick={()=>this.showProfile()}>
                    <AppstoreOutlined />
                    Edit
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type = 'primary' onClick={()=>this.showCalculateDin()}>
                    <BarsOutlined />
                    Calculate Din
                </Button>
            </div>
        )

        return (
            <div>
                <Card title={title} extra={editButton}>
                    <Descriptions   bordered column={{ xxl: 1, xl: 1, lg: 1, md:1, sm: 1, xs: 1 }} >
                        <Descriptions.Item label="First Name" key='1'>{profile.first_name}</Descriptions.Item>
                        <Descriptions.Item label="Last Name" key='2'>{profile.last_name}</Descriptions.Item>
                        <Descriptions.Item label="Gender" key='3'>{profile.gender}</Descriptions.Item>
                        <Descriptions.Item label="Birth date" key='4'>{profile.birthDate}</Descriptions.Item>
                        <Descriptions.Item label="Height" key='5'>{profile.height}</Descriptions.Item>
                        <Descriptions.Item label="Weight" key='6'>{profile.height}</Descriptions.Item>
                        <Descriptions.Item label="Shoe size" key='7'>{profile.shoeSize}</Descriptions.Item>
                        <Descriptions.Item label="skier ability" key='8'>{profile.skierAbility}</Descriptions.Item>
                        <Descriptions.Item label="Din result" key='9'>{profile.dinResult}</Descriptions.Item>
                        <Descriptions.Item label="Organization" key='10'>{profile.organization}</Descriptions.Item>
                        <Descriptions.Item label="E-mail" key='11'>{profile.email}</Descriptions.Item>
                        <Descriptions.Item label="Phone Number" key='12'>{profile.contact}</Descriptions.Item>
                        <Descriptions.Item label="Address 1" key='13'>{profile.address_line1}</Descriptions.Item>
                        <Descriptions.Item label="Address 2" key='14'>{profile.address_line2}</Descriptions.Item>
                        <Descriptions.Item label="Address 3" key='15'>{profile.address_line3}</Descriptions.Item>
                        <Descriptions.Item label="Region" key='16'>{profile.region}</Descriptions.Item>
                        <Descriptions.Item label="Postcode" key='17'>{profile.postcode}</Descriptions.Item>
                        <Descriptions.Item label="Country" key='18'>{profile.country}</Descriptions.Item>
                    </Descriptions>
                </Card>

                <Modal title="Edit Profile"
                       visible={this.state.modelVisible===1}
                       onOk={this.editProfile}
                       onCancel={this.handleCancel}
                       width={1200}
                       centered
                >
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                    >
                        <Form.Item name="firstName" label="First Name"
                                   rules={[{ required: true }]}
                        >
                            <Input defaultValue ={profile.first_name}/>
                        </Form.Item>

                        <Form.Item name="lastName" label="Last Name"
                                   rules={[{ required: true }]}
                        >
                            <Input defaultValue ={profile.last_name}/>
                        </Form.Item>

                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true }]}
                        >
                            <Select defaultValue="Male" style={{ width: 120 }} defaultValue ={profile.gender}>
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                                <Option value="Female">Neutral</Option>
                                <Option value="Female">Uncertain</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="birth_date" label="Birth_date">
                            <DatePicker defaultValue={moment(birthDate, dateFormat)} format={dateFormat}/>
                        </Form.Item>

                        <Form.Item
                            name="organization"
                            label="Organization"
                            rules={[{ required: true }]}
                        >
                            <Input  style={{ width: '100%' }} defaultValue ={profile.organization}/>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input defaultValue ={profile.email}/>
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input  style={{ width: '100%' }} defaultValue ={profile.contact}/>
                        </Form.Item>

                        <Form.Item
                            name="address_line1"
                            label="Address_line1"
                            rules={[{ required: true }]}
                        >
                            <Input  style={{ width: '100%' }} defaultValue ={profile.address_line1}/>
                        </Form.Item>

                        <Form.Item
                            name="address_line2"
                            label="Address_line2"
                            rules={[{ required: true }]}
                        >
                            <Input  style={{ width: '100%' }} defaultValue ={profile.address_line2}/>
                        </Form.Item>

                        <Form.Item
                            name="address_line3"
                            label="Address_line3"
                            rules={[{ required: true }]}
                        >
                            <Input  style={{ width: '100%' }} defaultValue ={profile.address_line3}/>
                        </Form.Item>

                        <Form.Item
                            name="postcode"
                            label="Postcode"
                            rules={[{ required: true }]}
                        >
                            <span>
                                <Select defaultValue="VIC" style={{ width: 120 }} defaultValue ={profile.region}>
                                    <Option value="VIC">VIC</Option>
                                </Select>
                                &nbsp;&nbsp;&nbsp;
                                <Input  style={{ width: 120 }} defaultValue ={profile.postcode}/>
                            </span>

                        </Form.Item>

                        <Form.Item
                            name="country"
                            label="Country"
                            rules={[{ required: true }]}
                        >
                            <Select defaultValue="China" style={{ width: 120 }} defaultValue ={profile.country}>
                                <Option value="China">China</Option>
                                <Option value="Australia">Australia</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>

                {/*calculate din*/}
                <Modal title="Calculate Din"
                       visible={this.state.modelVisible===2}
                       onOk={this.calculateDIn}
                       onCancel={this.handleCancel}
                       width={1200}
                       centered
                >
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                    >
                        <Form.Item name="height" label="Height(m)"
                                   rules={[{ required: true, }]}
                        >
                            <Input defaultValue ={profile.height}/>
                        </Form.Item>
                        <Form.Item name="Weight" label="Weight(Kg)"
                                   rules={[{ required: true, }]}
                        >
                            <Input defaultValue ={profile.weight} />
                        </Form.Item>

                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true }]}
                        >
                            <Select defaultValue="Male" style={{ width: 120 }} defaultValue ={profile.gender}>
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                                <Option value="Female">Neutral</Option>
                                <Option value="Female">Uncertain</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="birth_date" label="Birth_date">
                            <DatePicker defaultValue={moment(birthDate, dateFormat)} format={dateFormat}/>
                        </Form.Item>

                        <Form.Item name="shoe size" label="Shoe size"
                                   rules={[{ required: true,}]}
                        >
                            <Input defaultValue ={profile.shoeSize}/>
                        </Form.Item>

                        <Form.Item name="skier ability" label="skier ability"
                                   rules={[{ required: true,}]}
                        >
                            <Rate defaultValue ={profile.skierAbility}/>
                        </Form.Item>
                    </Form>

                </Modal>
            </div>
        )//end return
    }
}

export default InformationDetail