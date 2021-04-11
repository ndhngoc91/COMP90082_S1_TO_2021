import {useEffect, useState} from "react";
import axios from "axios";
import {useStores} from "../stores";

export const useRecentOrders = () => {
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const {authStore: {accessToken}} = useStores();

    useEffect(() => {
        setLoading(true);
        axios.get("http://127.0.0.1:8000/orders", {
            headers: {"Authorization": `Bearer ${accessToken}`}
        }).then((response => {
            setRecentOrders(response.data.orders);
        })).finally(() => {
            setLoading(false);
        });
    }, []);

    return [recentOrders, {loading}];
};
