import axios from "axios";
import {useCallback, useState} from "react";
import {message as antdMessage} from "antd";
import {useStores} from "../stores";

export const useHandleLogin = () => {
    const [handling, setHandling] = useState(false);

    const {authStore} = useStores();

    const handleLogin = useCallback((username, password, success) => {
        const formData = new FormData();
        formData.set("username", username);
        formData.set("password", password);
        axios.post("http://localhost:8000/auth/login", formData, {
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
        }).then(response => {
            if (response.status === 200) {
                authStore.login(username, response.data['access_token']);
            }
            success();
        }).catch(e => {
            if (e.response.status === 404) {
                antdMessage.info(e.response.data['detail']);
            }
        }).finally(() => {
            setHandling(false);
        });
    }, []);

    return [handleLogin, {handling}];
};
