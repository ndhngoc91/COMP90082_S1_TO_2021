import React from "react";
import {notification} from "antd";
import {CheckSquareOutlined} from "@ant-design/icons";
import {useHandleAddAccount} from "../../hooks/CustomerHooks";
import AdminAddForm from "./AdminAddForm";

const AddAdminForm = () => {
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

    return <AdminAddForm onFinish={onFinish} finishing={handling} clearFormAfterFinishing/>;
};

export default AddAdminForm;
