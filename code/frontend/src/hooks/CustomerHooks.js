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