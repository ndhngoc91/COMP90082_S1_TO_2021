import axios from "axios";
import {useCallback, useState} from "react";
import {message as antdMessage} from "antd";
import {useStores} from "../stores";

export const useHandleLogin = () => {
    const [handling, setHandling] = useState(false);

    const {authStore} = useStores();

    const handleLogin = useCallback(({username, password, signInAsStaff = false}, success, failure) => {
        setHandling(true);
        const formData = new FormData();
        formData.set("username", username);
        formData.set("password", password);
        axios.post("http://localhost:8000/auth/login", formData, {
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
        }).then(response => {
            if (response.status === 200) {
                const accessToken = response.data["access_token"];
                const user = response.data["user"];
                authStore.login(username, accessToken, user, signInAsStaff);
            }
            success();
        }).catch(e => {
            if (e.response.status === 404) {
                failure(e.response.data['detail']);
            } else {
                failure("Failed to login!");
            }
        }).finally(() => {
            setHandling(false);
        });
    }, []);

    return [handleLogin, {handling}];
};
