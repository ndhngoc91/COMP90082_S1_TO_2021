import {useCallback, useState} from "react";
import axios from "axios";
import {UserType} from "../consts/UserType";
import {BACKEND_ENDPOINT} from "../../appSettings";

export const useHandleFilterUsers = () => {
    const [users, setUsers] = useState([]);
    const [filtering, setFiltering] = useState(false);

    const handleFilterUsers = useCallback((query = "") => {
        setFiltering(true);
        axios.get(`${BACKEND_ENDPOINT}users/filter`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
            params: {query: query}
        }).then((response) => {
            if (response.status === 200) {
                response.data.forEach((dataItem, index) => {
                    dataItem.key = index
                });
                setUsers(response.data);
            }
        }).finally(() => {
            setFiltering(false);
        });
    }, [])

    return [handleFilterUsers, {users, filtering}];
};

export const useHandleRegisterCustomer = () => {
    const [handling, setHandling] = useState(false);

    const handleRegisterCustomer = useCallback(({
                                                    username,
                                                    email,
                                                    password,
                                                    first_name,
                                                    last_name,
                                                    phone,
                                                    birthday,
                                                    gender,
                                                    skill_level_id,
                                                    address_line,
                                                    state,
                                                    city,
                                                    postcode
                                                }, success, failure = () => {
    }) => {
        setHandling(true);
        axios.post('http://127.0.0.1:8000/users', {
            username: username,
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            birthday: birthday,
            gender: gender,
            skill_level_id: skill_level_id,
            address_list: [{
                address_line: address_line,
                state: state,
                city: city,
                postcode: postcode
            }],
            user_type_id: UserType.CUSTOMER
        }, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then(response => {
            if (response.status === 201) {
                success();
            } else if (response.status === 409){
                failure(response.data['detail']);
            } else {
                failure()
            }
        }).catch(e => {
            if (e.response.status === 409){
                failure(e.response.data['detail']);
            } else {
                failure("Failed to create an account!")
            } //failure();
        }).finally(() => {
            setHandling(false);
        });
    }, []);

    return [handleRegisterCustomer, {handling}];
};

export const useHandleRegisterAdmin = () => {
    const [handling, setHandling] = useState(false);

    const handleRegisterAdmin = useCallback(({
                                                 username,
                                                 email,
                                                 first_name,
                                                 last_name,
                                                 phone,
                                                 password
                                             }, success, failure = () => {
    }) => {
        setHandling(true);
        axios.post('http://127.0.0.1:8000/users', {
            username: username,
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            password: password,
            user_type_id: UserType.STAFF,
            address_list: []
        }, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then(response => {
            if (response.status === 201) {
                success();
            } else if (response.status === 409){
                failure(response.data);
            } else {
                failure()
            }
        }).catch((e) => {
            if (e.response.status === 409){
                failure(e.response.data['detail']);
            } else {
                failure("Failed to create an admin account!")
            } //failure();
        }).finally(() => {
            setHandling(false);
        });
    }, []);

    return [handleRegisterAdmin, {handling}];
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
                                               email,
                                               din,
                                               skill_level_id,
                                               user_type_id,
                                               is_enabled
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
            email:email,
            din: din,
            skill_level_id: skill_level_id,
            user_type_id: user_type_id,
            is_enabled: is_enabled,
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
