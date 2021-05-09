import React, {useState} from "react";
import {notification} from "antd";
import {CheckSquareOutlined} from "@ant-design/icons";
import {useHandleDeleteAccount} from "../../hooks/CustomerHooks";
import UserForm from "./UserForm";

const DeleteUserForm = ({fieldValues}) => {
    const [handleDeleteAccount, {handling}] = useHandleDeleteAccount();
    const [query,setQuery] = useState("delete");

    const onFinish = values => {
        handleDeleteAccount(values, () => {
            notification.open({
                message: "Deleted a customer successfullly!",
                description: "Deleted a customer successfullly!",
                icon: <CheckSquareOutlined style={{color: '#108ee9'}}/>,
                duration: 2
            });
        });
    };

    return <UserForm fieldValues={fieldValues} onFinish={onFinish} finishing={handling} query={query}/>;
};

export default DeleteUserForm;
