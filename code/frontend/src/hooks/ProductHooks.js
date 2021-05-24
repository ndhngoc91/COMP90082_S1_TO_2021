import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_ENDPOINT} from "../../appSettings";

export const useHandleFilterProducts = () => {
    const [products, setProducts] = useState([]);
    const [filtering, setFiltering] = useState(false);

    const handleFilterProducts = useCallback(filterParams => {
        setFiltering(true);
        axios.get(`${BACKEND_ENDPOINT}products/filter`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
            params: filterParams
        }).then((response) => {
            setProducts(response.data);
        }).finally(() => {
            setFiltering(false);
        });
    }, [])

    return [handleFilterProducts, {products, filtering}];
};

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
