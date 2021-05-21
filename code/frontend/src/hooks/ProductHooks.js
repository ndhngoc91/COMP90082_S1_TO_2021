import {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_ENDPOINT} from "../../appSettings";

export const useProducts = () => {
    const [productGroups, setProductGroups] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_ENDPOINT}products`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
            if (response.status === 200) {
                setProductGroups(response.data);
            }
        });
    }, []);

    return productGroups;
};
