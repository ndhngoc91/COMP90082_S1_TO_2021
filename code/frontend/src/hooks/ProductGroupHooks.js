import {useEffect, useState} from "react";
import axios from "axios";

export const useProductGroups = () => {
    const [productGroups, setProductGroups] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/product-groups", {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
            if (response.status === 200) {
                setProductGroups(response.data);
            }
        });
    }, []);

    return productGroups;
};
