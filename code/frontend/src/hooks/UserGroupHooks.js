import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {UserType} from "../consts/UserType";
import {useStores} from "../stores";

export const useUserGroups = (userId) => {
    const [userGroups, setUserGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8000/user-groups?user_id=${userId}`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then((response) => {
            setUserGroups(response.data);
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    return [userGroups, {loading}];
};

export const useHandleAddUserGroup = () => {
    const [handling, setHandling] = useState(false);

    const {authStore: {user}} = useStores();

    const handleAddUserGroup = useCallback(({
                                                name,
                                                contacts,
                                                user_id
                                            }, success, failure = () => {
    }) => {
        setHandling(true);
        axios.post('http://127.0.0.1:8000/user-groups', {
            name: name,
            contacts: contacts,
            user_id: user.id
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
    }, []);

    return [handleAddUserGroup, {handling}];
};
