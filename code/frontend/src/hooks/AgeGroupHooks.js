import {useEffect, useState} from "react";
import axios from "axios";

export const useAgeGroups = () => {
    const [ageGroups, setAgeGroups] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/age-groups", {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
            if (response.status === 200) {
                setAgeGroups(response.data);
            }
        });
    }, []);

    return ageGroups;
};
