import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Menu} from "antd";
import {useCategories} from "../hooks/CategoryHooks";

const {SubMenu} = Menu;

const CategoryTree = () => {
    const [openKeys, setOpenKeys] = useState("");

    const categories = useCategories();

    const renderMenuItem = ({id, name}) => {
        return (
            <Menu.Item key={id}>
                <Link to={`/productCategories/${id}`}>
                    <span>{name}</span>
                </Link>
            </Menu.Item>
        );
    };

    const renderSubMenu = ({id, name, Children}) => {
        return (
            <SubMenu key={id} title={name}>
                {Children && Children.map(item => {
                    return item.Children && item.Children.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
                })}
            </SubMenu>
        );
    };

    const onOpenChange = (openKeys) => {
        // duplicate click the same menu list
        if (openKeys.length === 0 || openKeys.length === 1) {
            setOpenKeys(openKeys);
            return;
        }
        // New operation to open another menu list
        const latestOpenKey = openKeys[openKeys.length - 1]
        // if click the same one
        if (latestOpenKey.includes(openKeys[0])) {
            setOpenKeys(openKeys);
        } else {
            setOpenKeys([latestOpenKey]);
        }
    };

    return (
        <Menu onOpenChange={onOpenChange} // click on one parent category to show its children
              mode="inline"
              style={{width: 256, height: "100%", borderRight: 0}}
              theme="light"
              openKeys={openKeys}>
            <Menu.Item key="/productList">Products</Menu.Item>
            {categories && categories.map(item => {
                return item.Children && item.Children.length > 0 ? renderSubMenu(item) : renderMenuItem(item);
            })}
        </Menu>
    );
}


export default CategoryTree
