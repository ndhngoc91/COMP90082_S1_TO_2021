import {useCallback, useState} from "react";
import axios from "axios";
import {BACKEND_ENDPOINT} from "../../appSettings";
import {useStores} from "../stores";
import {USER_ROLE} from "../consts/UserRole";

export const useHandleRetrieveProducts = () => {
    const [success, setSuccess] = useState(false);
    const [retrieving, setRetrieving] = useState(false);

    const {authStore: {userRole, accessToken}} = useStores();

    const handleFilterContracts = useCallback(() => {
        if (userRole === USER_ROLE.SUPER) {
            setRetrieving(true);
            axios.post(`${BACKEND_ENDPOINT}squizz/retrieve-products`, {}, {
                headers: {
                    "Content-Type": "application/JSON; charset=UTF-8",
                    "Authorization": `Bearer ${accessToken}`
                }
            }).then((response) => {
                setSuccess(true);
            }).finally(() => {
                setRetrieving(false);
            });
        }
    }, [])

    return [handleFilterContracts, {success, retrieving}];
};
