import {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_ENDPOINT} from "../../appSettings";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_ENDPOINT}categories`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
            if (response.status === 200) {
                setCategories(response.data);
            }
        });
    }, []);

    return categories;
};
