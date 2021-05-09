import {useEffect, useState} from "react";
import axios from "axios";

export const useUserNames = () => {
    const [userNames, setUserNames] = useState([]);

    useEffect(() => {
        //TODO:extract the url of username to replace "http://127.0.0.1:8000/skill-levels"
        axios.get("http://127.0.0.1:8000/skill-levels", {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
            if (response.status === 200) {
                setUserNames(response.data);
            }
        });
    }, []);

    return userNames;
};
