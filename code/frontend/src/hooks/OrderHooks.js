import {useCallback, useState} from "react";
import axios from "axios";
import {BACKEND_ENDPOINT} from "../../appSettings";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";

export const useHandleAddOrder = () => {
    const [handling, setHandling] = useState(false);
    const {authStore: {id: user_id}} = useStores();


    const handleAddOrder = useCallback((orderPostData, success, failure = () => {
    }) => {
        orderPostData.user_id = user_id;
        console.log(orderPostData);
        setHandling(true);
        axios.post(`${BACKEND_ENDPOINT}orders`, orderPostData, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then(response => {
            if (response.status === 201) {
                success();
            } else {
                failure();
            }
        }).catch(() => {
            failure();
        }).finally(() => {
            setHandling(false);
        });
    }, []);

    return [handleAddOrder, {handling}];
};

export const useHandleRetrieveOrderWithDetails = () => {
    const [orderWithDetails, setOrderWithDetails] = useState(null);
    const [retrieving, setRetrieving] = useState(false);

    const handleRetrieveOrderWithDetails = useCallback(orderId => {
        setRetrieving(true);
        axios.get(`${BACKEND_ENDPOINT}orders/${orderId}/order-details`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then((response) => {
            setOrderWithDetails(response.data);
        }).finally(() => {
            setRetrieving(false);
        });
    }, [])

    return [handleRetrieveOrderWithDetails, {orderWithDetails, retrieving}];
}

export const useHandleOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filtering, setFiltering] = useState(false);
    const {authStore: {id: user_id, userRole}} = useStores();

    const handleFilterOrders = useCallback((query = "") => {
        setFiltering(true);
        if (userRole === USER_ROLE.STAFF) {
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
        } else if (userRole === USER_ROLE.CUSTOMER) {
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
        }
    }, []);

    const handleCancelOrder = useCallback((order_id) => {
        setFiltering(true);
        axios.put(`${BACKEND_ENDPOINT}orders/${order_id}/cancel/`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then((response) => {
            if (response.status === 202) {
                response.data.forEach((dataItem, index) => {
                    dataItem.key = index
                });
                setOrders(response.data);
            }
        }).finally(() => {
            setFiltering(false);
        });
    }, []);

    return [handleFilterOrders, handleCancelOrder, {orders, filtering}];
};
