import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export const useHandleGetItems = () => {
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState("");
    const [totalItems, setTotalItems] = useState("");
    const [pageItems, setPageItems] = useState("");
    const [loading, setLoading] = useState(false);

    const getItems = useCallback((pageCurrent, categoryId) => {
        const params = {
            page: pageCurrent
        };
        if (categoryId) {
            params.category_id = categoryId;
        }
        setLoading(true);
        axios.get("http://127.0.0.1:8000/products", {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
            params: params
        }).then((response) => {
            setItems(response.data["items"]);
            setTotalPages(response.data["total_pages"]);
            setTotalItems(response.data["total_items"]);
            setPageItems(response.data["page_items"]);
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    return [getItems, {loading, items, totalItems, pageItems, totalPages}];
};

export const useProducts = (...lines) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async (line) => {
            const {productCode} = line;
            const response = await axios.get(`http://127.0.0.1:8000/products/${productCode}`, {
                headers: {"Content-Type": "application/JSON; charset=UTF-8"}
            });
            const product = {...response.data.data, ...line};
            setProducts(prev => [...prev, product]);
        };

        setLoading(true);
        (async () => {
            await Promise.all(lines.map(line => fetchProduct(line)));
            setLoading(false);
        })();

    }, []);

    return [products, {loading}];
};

export const useProductInfo = (productCode) => {
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/products/${productCode}`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then(response => {
            response.data["data"]["quality"] = 1;
            setProductInfo(response.data["data"]);
        });
    }, []);

    return productInfo;
};

export const useProductMetaData = (productCode) => {
    const [productMetaData, setProductMetaData] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/products/${productCode}/metadata/get`).then(response => {
            if (response.data["found"]) {
                setProductMetaData(response.data["json_data"])
            }
        });
    }, []);

    return productMetaData;
};
