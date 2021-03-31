import axios from "axios";
import {useCallback, useState} from "react";

export const useHandleLogin = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = useCallback((username, password) => {
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
                setSuccess(true);
            } else {
                setErrorMessage("Sorry, your username and/or password are incorrect. Please try again.");
            }
        }).catch((e) => {
            setErrorMessage(e.response.data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return [handleLogin, {loading, success, errorMessage}];
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
