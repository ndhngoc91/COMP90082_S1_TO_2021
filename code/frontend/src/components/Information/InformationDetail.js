import React, {useState} from "react";
import "antd/dist/antd.css"
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons";
import {
    Button,
    Select,
    Descriptions,
    Card,
} from "antd";

const {Option} = Select;

const InformationDetail = () => {
    const [gender, setGender] = useState("Male");
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Wick");
    const [contact, setContact] = useState("6137708899");
    const [organization, setOrganization] = useState("");
    const [email, setEmail] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [addressLine3, setAddressLine3] = useState("");
    const [postcode, setPostcode] = useState("3054");
    const [region, setRegion] = useState("VIC");
    const [country, setCountry] = useState("Australia");
    const [height, setHeght] = useState(180);
    const [weight, setWeight] = useState(50);
    const [birthdate, setBirthdate] = useState("2013/1/1");
    const [dinResult, setDinResult] = useState(1314);
    const [shoeSize, setShoeSize] = useState(24);
    const [skierAbility, setSkierAbility] = useState(3);

    const editButton = (
        <div>
            <Button type="primary">
                <AppstoreOutlined/>
                Edit
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary">
                <BarsOutlined/>
                Calculate Din
            </Button>
        </div>
    )

    return (
        <div>
            <Card title={"User Profile"} extra={editButton}>
                <Descriptions bordered column={{xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1}}>
                    <Descriptions.Item label="First Name" key="1">{firstName}</Descriptions.Item>
                    <Descriptions.Item label="Last Name" key="2">{lastName}</Descriptions.Item>
                    <Descriptions.Item label="Gender" key="3">{gender}</Descriptions.Item>
                    <Descriptions.Item label="Birth date" key="4">{birthdate}</Descriptions.Item>
                    <Descriptions.Item label="Height" key="5">{height}</Descriptions.Item>
                    <Descriptions.Item label="Weight" key="6">{weight}</Descriptions.Item>
                    <Descriptions.Item label="Shoe size" key="7">{shoeSize}</Descriptions.Item>
                    <Descriptions.Item label="skier ability" key="8">{skierAbility}</Descriptions.Item>
                    <Descriptions.Item label="Din result" key="9">{dinResult}</Descriptions.Item>
                    <Descriptions.Item label="Organization" key="10">{organization}</Descriptions.Item>
                    <Descriptions.Item label="E-mail" key="11">{email}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number" key="12">{contact}</Descriptions.Item>
                    <Descriptions.Item label="Address 1" key="13">{addressLine1}</Descriptions.Item>
                    <Descriptions.Item label="Address 2" key="14">{addressLine2}</Descriptions.Item>
                    <Descriptions.Item label="Address 3" key="15">{addressLine3}</Descriptions.Item>
                    <Descriptions.Item label="Region" key="16">{region}</Descriptions.Item>
                    <Descriptions.Item label="Postcode" key="17">{postcode}</Descriptions.Item>
                    <Descriptions.Item label="Country" key="18">{country}</Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
}

export default InformationDetail
