import {useEffect, useState} from "react";
import axios from "axios";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/categories", {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
            if (response.status === 200) {
                setCategories(response.data);
            }
        });
    }, []);

    return categories;
};
