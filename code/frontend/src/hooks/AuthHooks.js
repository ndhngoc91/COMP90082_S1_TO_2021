import axios from "axios";
import {useCallback, useState} from "react";
import {message as antdMessage} from "antd";

export const useHandleLogin = () => {
    const [handling, setHandling] = useState(false);

    const handleLogin = useCallback( (username, password, success) => {
        axios.post("api/login", {
            "username": username,
            "password": password
        }, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then(response => {
            let {status} = response.data;
            let {session_id} = response.data.data;
            if (status === "success") {
                sessionStorage.setItem("user", username);
                sessionStorage.setItem("sessionKey", session_id);
                success();
            } else {
                antdMessage.info("Sorry, your username and/or password are incorrect. Please try again.");
            }
        }).catch((e) => {
            antdMessage.info(e.response.data);
        }).finally(() => {
            setHandling(false);
        });
    }, []);

    return [handleLogin, {handling}];
};

export const useHandleLogout = () => {
    const [handling, setHandling] = useState(false);

    const handleLogout = useCallback((success) => {
        setHandling(true);
        axios.get("api/logout").then(() => {
            sessionStorage.removeItem("user");
            success();
        }).finally(() => {
            setHandling(false);
        });
    }, []);

    return [handleLogout, {handling}];
};
