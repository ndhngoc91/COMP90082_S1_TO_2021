import {useEffect, useState} from "react";
import axios from "axios";

export const useRecentOrders = () => {
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get("/api/history", {
            params: {
                session_id: sessionStorage.getItem("sessionKey")
            },
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then((response => {
            setRecentOrders(response.data.orders);
        })).finally(() => {
            setLoading(false);
        });
    }, []);

    return [recentOrders, {loading}];
};
