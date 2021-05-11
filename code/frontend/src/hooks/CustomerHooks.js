import { useCallback, useState } from "react";
import axios from "axios";

export const useCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [totalCustomers, setTotalCustomers] = useState(-1);
    const [pageSize, setPageSize] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const getCustomers = useCallback(() => {
        setLoading(true);
        axios.post(
            "http://127.0.0.1:8000/customers/search/",
            { page_id: pageCurrent, query: searchQuery },
            { headers: { "Content-Type": "application/JSON; charset=UTF-8" } }
        ).then((response) => {
            setCustomers(response.data["items"]);
            setTotalCustomers(response.data["total_items"]);
            setPageSize(response.data["page_size"]);
            setPageCurrent(response.data["page_num"]);
        }).finally(() => {
            setLoading(false);
        });
    }, [pageCurrent, searchQuery]);

    return [
        getCustomers,
        setPageCurrent,
        setSearchQuery,
        { loading, customers, totalCustomers, pageSize, pageCurrent, searchQuery }
    ];
};

export const useHandleAddAccount = () => {
    const [handling, setHandling] = useState(false);

    const handleAddAccount = useCallback(({
                                              user_type,
                                              username,
                                              email,
                                              birthday,
                                              gender,
                                              phone,
                                              address_line,
                                              state,
                                              city,
                                              postcode,
                                              password
                                          },success, failure  = () => {
    }) => {
        setHandling(true);
        axios.post('http://127.0.0.1:8000/user', {
            username: username,
            email: email,
            birthday: birthday.format('YYYY-MM-DD'),
            phone: phone,
            gender: gender,
            address_line: address_line,
            state: state,
            city: city,
            postcode: postcode,
            user_type: user_type,
            password: password
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
    return [handleAddAccount, {handling}];
};

export const useHandleAddAdmin = () => {
    const [handling, setHandling] = useState(false);

    const handleAddAdmin = useCallback(({
                                            username,
                                            email,
                                            user_type,
                                            password
                                        },success, failure  = () => {
    }) => {
        setHandling(true);
        //TODO: get url
        axios.post('http://127.0.0.1:8000/user/admin', {
            username: username,
            email: email,
            user_type: user_type,
            password: password
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

    return [handleAddAdmin, {handling}];
};

export const useHandleEditAccount = () => {
    const [handling, setHandling] = useState(false);

    const handleEditAccount = useCallback(({
                                               id,
                                               name,
                                               description,
                                               age_group_id,
                                               category_id,
                                               skill_level_id,
                                               username,
                                               email,

                                           }, success, failure) => {
        setHandling(true);
        //TODO: get url
        axios.put(`http://127.0.0.1:8000/packages/${id}`, {
            name: name,
            description: description,
            age_group_id: age_group_id,
            category_id: category_id,
            skill_level_id: skill_level_id,
            product_group_ids: [],
            username: "string",
            email: "string",
            birthday: "2021-05-11",
            phone: "string",
            gender: "string",
            first_name: "string",
            last_name: "string",
            address_line: "string",
            state: "string",
            city: "string",
            postcode: "string",
            user_type_id: 0,
            password: "string"
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

    return [handleEditAccount, {handling}];
};

