import {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_ENDPOINT} from "../../appSettings";

export const useProductGroups = () => {
    const [productGroups, setProductGroups] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_ENDPOINT}product-groups`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
            if (response.status === 200) {
                setProductGroups(response.data);
            }
        });
    }, []);

    return productGroups;
};
