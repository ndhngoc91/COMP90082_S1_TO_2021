import {useEffect, useState} from "react";
import axios from "axios";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("/api/categories", {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
            setCategories(response.data);
        });
    }, []);

    return categories;
};
