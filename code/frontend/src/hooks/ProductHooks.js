import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export const useHandleGetItems = () => {
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState("");
    const [totalItems, setTotalItems] = useState("");
    const [pageItems, setPageItems] = useState("");
    const [loading, setLoading] = useState(false);

    const getItems = useCallback((pageCurrent, cate) => {
        const params = {
            page: pageCurrent
        };
        if (cate) {
            params.cate = cate;
        }
        setLoading(true);
        axios.get("/api/products", {
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
            const response = await axios.get("/api/product", {
                params: {
                    sessionKey: sessionStorage.getItem("sessionKey"),
                    productCode: productCode
                },
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
        axios.get("/api/product", {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
            params: {
                productCode: productCode
            }
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
        axios.get("/api/metadata/get", {
            params: {
                productCode: productCode
            }
        }).then(response => {
            if (response.data["found"]) {
                setProductMetaData(response.data["json_data"])
            }
        });
    }, []);

    return productMetaData;
};
