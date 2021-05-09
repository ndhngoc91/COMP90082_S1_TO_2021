import React, {useState} from "react";
import {notification} from "antd";
import {CheckSquareOutlined} from "@ant-design/icons";
import {useHandleEditAccount} from "../../hooks/CustomerHooks";
import UserForm from "./UserForm";

const EditUserForm = ({fieldValues}) => {
    const [handleEditAccount, {handling}] = useHandleEditAccount();
    const [query,setQuery] = useState("edit");

    const onFinish = values => {
        handleEditAccount(values, () => {
            notification.open({
                message: "Edited a user successfullly!",
                description: "Edited a user successfullly!",
                icon: <CheckSquareOutlined style={{color: '#108ee9'}}/>,
                duration: 2
            });
        });
    };

    return <UserForm fieldValues={fieldValues} onFinish={onFinish} finishing={handling} query={query}/>;
};

export default EditUserForm;
