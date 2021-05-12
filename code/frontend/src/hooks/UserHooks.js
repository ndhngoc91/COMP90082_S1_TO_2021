import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export const useHandleFilterUsers = () => {
    const [users, setUsers] = useState([]);
    const [filtering, setFiltering] = useState(false);

    const handleFilterUsers = useCallback((query = "") => {
        setFiltering(true);
        axios.get("http://localhost:8000/users/filter", {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
            params: {query: query}
        }).then((response) => {
            setUsers(response.data);
        }).finally(() => {
            setFiltering(false);
        });
    }, [])

    return [handleFilterUsers, {users, filtering}];
};

export const useUserProfile = (id = 47) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://127.0.0.1:8000/users/${id}`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data);
            }
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return [user, {loading}];
};

export const useHandleEditProfile = () => {
    const [handling, setHandling] = useState(false);

    const handleEditPackage = useCallback(({
                                               id,
                                               username,
                                               height,
                                               weight,
                                               foot_size,
                                               first_name,
                                               last_name,
                                               gender,
                                               birthday,
                                               phone,
                                               din,
                                               skill_level_id,
                                               user_type_id
                                           }, success, failure = () => {
    }) => {
        setHandling(true);
        axios.put(`http://127.0.0.1:8000/users/${id}`, {
            username: username,
            height: height,
            weight: weight,
            foot_size: foot_size,
            first_name: first_name,
            last_name: last_name,
            gender: gender,
            birthday: birthday,
            phone: phone,
            din: din,
            skill_level_id: skill_level_id,
            user_type_id: user_type_id
        }, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then(response => {
            if (response.status === 202) {
                success();
            } else {
                failure();
            }
        }).catch(err => {
            console.log(err);
            failure();
        }).finally(() => {
            setHandling(false);
        });
    }, []);

    return [handleEditPackage, {handling}];
};
