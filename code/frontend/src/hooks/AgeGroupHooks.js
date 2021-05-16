import {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_ENDPOINT} from "../../appSettings";

export const useAgeGroups = () => {
    const [ageGroups, setAgeGroups] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_ENDPOINT}age-groups`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
            if (response.status === 200) {
                setAgeGroups(response.data);
            }
        });
    }, []);

    return ageGroups;
};
