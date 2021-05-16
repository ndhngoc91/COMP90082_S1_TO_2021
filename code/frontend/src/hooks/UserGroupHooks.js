import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";
import {BACKEND_ENDPOINT} from "../../appSettings";

export const useUserGroups = (userId) => {
    const [userGroups, setUserGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${BACKEND_ENDPOINT}user-groups?user_id=${userId}`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then(response => {
            const data = response.data;
            data.forEach(dataItem => {
                try {
                    dataItem.contacts = JSON.parse(dataItem.contacts);
                } catch (e) {
                    dataItem.contacts = [];
                }
            });
            setUserGroups(response.data);
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    return [userGroups, {loading}];
};

export const useHandleAddUserGroup = () => {
    const [handling, setHandling] = useState(false);

    const {authStore: {id: user_id, userRole}} = useStores();

    const handleAddUserGroup = useCallback(({
                                                name,
                                                contacts
                                            }, success, failure = () => {
    }) => {
        if (userRole === USER_ROLE.CUSTOMER) {
            setHandling(true);
            axios.post('http://127.0.0.1:8000/user-groups', {
                name: name,
                contacts: contacts,
                user_id: user_id
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

    return [handleAddUserGroup, {handling}];
};

export const useHandleDeleteUserGroup = () => {
    const [handling, setHandling] = useState(false);

    const handleDeleteUserGroup = useCallback((user_group_id, success, failure = () => {
    }) => {
        setHandling(true);
        axios.delete(`http://127.0.0.1:8000/user-groups/${user_group_id}`, {
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
    }, []);

    return [handleDeleteUserGroup, {handling}];
};

export const useHandleEditUserGroup = () => {
    const [handling, setHandling] = useState(false);

    const {authStore: {id: user_id, userRole}} = useStores();

    const handleEditUserGroup = useCallback(({
                                                id: user_group_id,
                                                name,
                                                contacts
                                            }, success, failure = () => {
    }) => {
        if (userRole === USER_ROLE.CUSTOMER) {
            setHandling(true);
            axios.put(`http://127.0.0.1:8000/user-groups/${user_group_id}`, {
                name: name,
                contacts: contacts,
                user_id: user_id
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

    return [handleEditUserGroup, {handling}];
};
