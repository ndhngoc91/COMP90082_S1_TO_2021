import React from "react";
import {notification} from "antd";
import {CheckSquareOutlined} from "@ant-design/icons";
import {useHandleAddPackage} from "../../hooks/PackageHooks";
import PackageForm from "./PackageForm";

const AddPackageForm = () => {
    const [handleAddPackage, {handling}] = useHandleAddPackage();

    const onFinish = values => {
        handleAddPackage(values, () => {
            notification.open({
                message: "Added a package successfullly!",
                description: "Added a package successfullly!",
                icon: <CheckSquareOutlined style={{color: '#108ee9'}}/>,
                duration: 2
            });
        });
    };

    return <PackageForm onFinish={onFinish} finishing={handling} clearFormAfterFinishing/>;
};

export default AddPackageForm;
