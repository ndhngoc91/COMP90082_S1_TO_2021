import {useEffect, useState} from "react";
import axios from "axios";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";

export const usePersonalAddresses = () => {
    const [personalAddresses, setPersonalAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const {authStore: {id, userRole}} = useStores();

    useEffect(() => {
        setLoading(true);
        if (userRole !== USER_ROLE.GUEST) {
            axios.get(`http://127.0.0.1:8000/addresses?user_id=${id}`).then(response => {
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
