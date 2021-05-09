import React from "react";
import {notification} from "antd";
import {CheckSquareOutlined} from "@ant-design/icons";
import {useHandleAddAccount} from "../../hooks/CustomerHooks";
import UserAddForm from "./UserAddForm";

const AddUserForm = () => {
    const [handleAddAccount, {handling}] = useHandleAddAccount();

    const onFinish = values => {
        handleAddAccount(values, () => {
            notification.open({
                message: "Added a customer successfullly!",
                description: "Added a customer successfullly!",
                icon: <CheckSquareOutlined style={{color: '#108ee9'}}/>,
                duration: 2
            });
        });
    };

    return <UserAddForm onFinish={onFinish} finishing={handling} clearFormAfterFinishing/>;
};

export default AddUserForm;
