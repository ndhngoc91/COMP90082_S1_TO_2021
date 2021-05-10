import { useCallback, useState } from "react";
import axios from "axios";

export const useCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [totalCustomers, setTotalCustomers] = useState(-1);
    const [pageSize, setPageSize] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const getCustomers = useCallback(() => {
        setLoading(true);
        axios.post(
            "http://127.0.0.1:8000/customers/search/",
            { page_id: pageCurrent, query: searchQuery },
            { headers: { "Content-Type": "application/JSON; charset=UTF-8" } }
        ).then((response) => {
            setCustomers(response.data["items"]);
            setTotalCustomers(response.data["total_items"]);
            setPageSize(response.data["page_size"]);
            setPageCurrent(response.data["page_num"]);
        }).finally(() => {
            setLoading(false);
        });
    }, [pageCurrent, searchQuery]);

    return [
        getCustomers,
        setPageCurrent,
        setSearchQuery,
        { loading, customers, totalCustomers, pageSize, pageCurrent, searchQuery }
    ];
};

export const useHandleAddAccount = () => {
    const [handling, setHandling] = useState(false);

    const handleAddAccount = useCallback((name, description, products) => {
        setHandling(true);
        //TODO: get url
        axios.post('http://127.0.0.1:8000/packages', {
            name: name,
            description: description,
            what_is_included: products.join("-"),
            available: available
        }, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then(response => {
            if (response.status === 201) {
                description();
            } else {
                products();
            }
        }).catch(() => {
            products();
        }).finally(() => {
            setHandling(false);
        });
    }, []);

    return [handleAddAccount, {handling}];
};

export const useHandleEditAccount = () => {
    const [handling, setHandling] = useState(false);

    const handleEditAccount = useCallback((id, name, description) => {
        setHandling(true);
        //TODO: get url
        axios.put(`http://127.0.0.1:8000/packages/${id}`, {
            name: name,
            description: description,
            what_is_included: products.join("-"),
            available: available
        }, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then(response => {
            if (response.status === 202) {
                name();
            } else {
                description();
            }
        }).catch(err => {
            console.log(err);
            description();
        }).finally(() => {
            setHandling(false);
        });
    }, []);

    return [handleEditAccount, {handling}];
};

