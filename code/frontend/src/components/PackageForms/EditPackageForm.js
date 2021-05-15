import React from "react";
import {notification} from "antd";
import {CheckSquareOutlined} from "@ant-design/icons";
import { useHandleEditPackage} from "../../hooks/PackageHooks";
import PackageForm from "./PackageForm";

const EditPackageForm = ({fieldValues}) => {
    const [handleEditPackage, {handling}] = useHandleEditPackage();

    const onFinish = values => {
        handleEditPackage(values, () => {
            notification.open({
                message: "Edited a package successfullly!",
                description: "Edited a package successfullly!",
                icon: <CheckSquareOutlined style={{color: '#108ee9'}}/>,
                duration: 2
            });
        });
    };

    return <PackageForm fieldValues={fieldValues} onFinish={onFinish} finishing={handling} updateProductGroups={false}/>;
};

export default EditPackageForm;
