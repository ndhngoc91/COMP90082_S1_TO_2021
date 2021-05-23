import {useCallback, useState} from "react";
import axios from "axios";
import {BACKEND_ENDPOINT} from "../../appSettings";

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

    const handleAddContract = useCallback(({
                                              name,
                                              created_at,
                                              created_by,
                                              contract_details
                                          }, success, failure = () => {
    }) => {
        setHandling(true);
        axios.post(`${BACKEND_ENDPOINT}contracts`, {
            name: name,
            created_at: created_at,
            created_by: created_by,
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
    }, []);

    return [handleAddContract, {handling}];
};
