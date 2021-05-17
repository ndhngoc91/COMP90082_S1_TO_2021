import {useCallback, useState} from "react";
import axios from "axios";
import {BACKEND_ENDPOINT} from "../../appSettings";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";

export const useHandleFilterOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filtering, setFiltering] = useState(false);
    const {authStore: {id: user_id, userRole}} = useStores();

    const handleFilterOrders = useCallback((query = "") => {
        setFiltering(true);
        if (userRole == USER_ROLE.STAFF) {
            axios.get(`${BACKEND_ENDPOINT}orders/filter`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
                params: {query: query}
            }).then((response) => {
                if (response.status === 200) {
                    response.data.forEach((dataItem, index) => {
                        dataItem.key = index
                    });
                    setOrders(response.data);
                }
            }).finally(() => {
                setFiltering(false);
            });
        } else if (userRole == USER_ROLE.CUSTOMER) {
            axios.get(`${BACKEND_ENDPOINT}orders/filter?userId=${user_id}`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
                params: {query: query}
            }).then((response) => {
                if (response.status === 200) {
                    response.data.forEach((dataItem, index) => {
                        dataItem.key = index
                    });
                    setOrders(response.data);
                }
            }).finally(() => {
                setFiltering(false);
            });
        };
    }, []);

    return [handleFilterOrders, {orders, filtering}];
};