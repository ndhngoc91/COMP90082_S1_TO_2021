import {useEffect, useState} from "react";
import axios from "axios";

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
