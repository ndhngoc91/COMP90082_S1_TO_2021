import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";
import {BACKEND_ENDPOINT} from "../../appSettings";

export const usePersonalAddresses = () => {
    const [personalAddresses, setPersonalAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const {authStore: {id: user_id, userRole}} = useStores();

    useEffect(() => {
        setLoading(true);
        if (userRole !== USER_ROLE.GUEST) {
            axios.get(`${BACKEND_ENDPOINT}addresses?user_id=${user_id}`).then(response => {
                if (response.status === 200) {
                    response.data.forEach((dataItem, index) => {
                        dataItem.key = index
                    });
                    setPersonalAddresses(response.data);
                }
            }).catch(err => console.log(err)).finally(() => {
                setLoading(false);
            });
        } else {
            setPersonalAddresses([]);
            setLoading(false);
        }

    }, []);

    return [personalAddresses, {loading}];
};

export const useHandleAddAddress = () => {
    const [handling, setHandling] = useState(false);
    const {authStore: {id: user_id, userRole}} = useStores();

    const handleAddAddress = useCallback(({
                                              state,
                                              city,
                                              postcode,
                                              address_line,
                                              order_id
                                          }, success, failure = () => {
    }) => {
        if (userRole !== USER_ROLE.GUEST) {
            setHandling(true);
            axios.post(`${BACKEND_ENDPOINT}addresses`, {
                state: state,
                city: city,
                postcode: postcode,
                address_line: address_line,
                user_id: user_id,
                order_id: order_id
            }, {
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
        } else {
            setHandling(false);
        }

    }, []);

    return [handleAddAddress, {handling}];
};

export const useHandleDeleteAddress = () => {
    const [handling, setHandling] = useState(false);
    const {authStore: {userRole}} = useStores();

    const handleDeleteAddress = useCallback((addressId, success, failure = () => {
    }) => {
        if (userRole !== USER_ROLE.GUEST) {
            setHandling(true);
            axios.delete(`${BACKEND_ENDPOINT}addresses/${addressId}`, {
                headers: {"Content-Type": "application/JSON; charset=UTF-8"}
            }).then(response => {
                if (response.status === 204) {
                    success();
                } else {
                    failure();
                }
            }).catch(() => {
                failure();
            }).finally(() => {
                setHandling(false);
            });
        } else {
            setHandling(false);
        }

    }, []);

    return [handleDeleteAddress, {handling}];
};

export const useHandleEditAddress = () => {
    const [handling, setHandling] = useState(false);
    const {authStore: {id: user_id, userRole}} = useStores();

    const handleEditAddress = useCallback(({
                                               id: address_id,
                                               state,
                                               city,
                                               postcode,
                                               address_line,
                                               order_id
                                           }, success, failure = () => {
    }) => {
        if (userRole !== USER_ROLE.GUEST) {
            setHandling(true);
            axios.put(`${BACKEND_ENDPOINT}addresses/${address_id}`, {
                state: state,
                city: city,
                postcode: postcode,
                address_line: address_line,
                user_id: user_id,
                order_id: order_id
            }, {
                headers: {"Content-Type": "application/JSON; charset=UTF-8"}
            }).then(response => {
                if (response.status === 202) {
                    success();
                } else {
                    failure();
                }
            }).catch(() => {
                failure();
            }).finally(() => {
                setHandling(false);
            });
        } else {
            setHandling(false);
        }

    }, []);

    return [handleEditAddress, {handling}];
};
