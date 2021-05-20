import React, {useEffect, useState }  from 'react';
import { InputNumber, Col, Table } from "antd";

const SelectPackages = (props) => {


    const setPackageItem = props.setPackageItem;
    const packages = props.packages;

    const columns = [
        { title: 'Package Name', dataIndex: 'package_name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
    ];

    


    // Only change the quantity of a package type
    var changeQuantity = (quan, packageItem) => {
        return packageItem = {'PackageId': packageItem.PackageId, 'Name': packageItem.Name,'Type': packageItem.Type, 'Price': packageItem.Price, 'Age':packageItem.Age, 'Quantity': quan,  'Extras': packageItem.Extras};
    }

    // Handle Change on quantity
    const onChange = (id, val, name, type, price, age, extras) => {
        var same = 0;

        setPackageItem(oldPackages => {
           
            for (let i = 0; i < oldPackages.length; i ++){
                if (oldPackages[i].Name === name && oldPackages[i].Type == type){
                    oldPackages[i] = changeQuantity(val, oldPackages[i]);
                    same = 1;
                }
            }
            if (same === 0){
                return [...oldPackages, {'PackageId': id, 'Name': name, 'Type':type, 'Price': price, 'Age': age, 'Quantity':val, 'Extras': extras}]
            }else{
                return oldPackages
            }

        }, []);

    }


    // Shows Package Type and let customer edit the quantity they want
    const extandTable = (record) => {

        let types = record.types;
        
        for (var i = 0; i < types.length; i++){
            types[i].key = types[i].type_id;
        }

        const columns = [
            { title: 'Package Type', dataIndex: 'type_name', key: 'name' },
            
            {
                title: 'Quantity',
                dataIndex: 'operation',
                render: (_, type) => (

                    <InputNumber min={0} max={10} defaultValue={0} 
                    onChange={val => onChange(record.package_id, val, record.package_name, type.type_name, record.price, record.age_group_id, record.extras)}></InputNumber>

                  ),
              },
        ];
        
        return ( 
        <Col span={18} offset={4}>
            <p>{record.description}</p>
            <Table pagination={false} columns={columns} dataSource={types} expandable = {record => extandTable(record)}/>
        </Col>

    )};


    return (
        <Col span={24} className="step1-content">
                    {packages.length !== 0 ? 
                    
                        <Table  columns={columns} 
                                dataSource={packages}
                                pagination={false}
                                expandable={{
                                    expandedRowRender: record => extandTable(record)
                                }}>
                        </Table>
                        
                    : "No Package Selected"}
                
            </Col>
    )
}

export default SelectPackages;