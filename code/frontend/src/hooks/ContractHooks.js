import {useCallback, useState} from "react";
import axios from "axios";
import {BACKEND_ENDPOINT} from "../../appSettings";
import {useStores} from "../stores";
import moment from "moment";
import {USER_ROLE} from "../consts/UserRole";

export const useHandleFilterContracts = () => {
    const [contracts, setContracts] = useState([]);
    const [filtering, setFiltering] = useState(false);

    const handleFilterPackages = useCallback(() => {
        setFiltering(true);
        axios.get(`${BACKEND_ENDPOINT}contracts`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then((response) => {
            setContracts(response.data);
        }).finally(() => {
            setFiltering(false);
        });
    }, [])

    return [handleFilterPackages, {contracts, filtering}];
};

export const useHandleAddContract = () => {
    const [handling, setHandling] = useState(false);
    const {authStore: {firstName, lastName, userRole}, hiringEquipmentRegister: {order}} = useStores();

    const handleAddContract = useCallback(({
                                               name,
                                               contract_details
                                           }, success, failure = () => {
    }) => {
        if (userRole === USER_ROLE.STAFF) {
            setHandling(true);
            axios.post(`${BACKEND_ENDPOINT}contracts`, {
                name: name,
                order_id: order.id,
                created_at: moment().format("YYYY-MM-DD"),
                created_by: `${lastName}, ${firstName}`,
                contract_details: contract_details
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
        }
    }, []);

    return [handleAddContract, {handling}];
};
