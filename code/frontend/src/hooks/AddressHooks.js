import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useStores} from "../stores";

export const useAddresses = () => {
    const {
        addressStore: {
            setAddresses
        },
        customerStore: {customerId, setDeliveryAddrId, setBillingAddrId}
    } = useStores();

    useEffect(() => {
        axios.get(`api/customer/${customerId}/addresses`).then(res => {
            setAddresses(res.data);
            setDeliveryAddrId(res.data[0].id);
            setBillingAddrId(res.data[0].id);
        }).catch(err => console.log(err));
    }, []);
};

export const useHandleAddAddress = () => {
    const [handling, setHandling] = useState(false);
    const {addressStore: {addAddress}} = useStores();

    const handleAddAddress = useCallback((customerId, {
        contact,
        addr1,
        addr2,
        postcode,
        region,
        country
    }, success, failure) => {
        setHandling(true);
        axios.post(`/api/customer/${customerId}/addresses`, {
            "contact": contact,
            "address_line1": addr1,
            "address_line2": addr2,
            "postcode": postcode,
            "region": region,
            "country": country
        }, {
            headers: {"Content-Type": "application/JSON; charset=UTF- 8"}
        }).then((response) => {
            addAddress(response.data);
            success();
        }).catch(() => {
            failure();
        }).finally(() => {
            setHandling(false);
        });
    }, []);

    return [handleAddAddress, {loading: handling}];
};
