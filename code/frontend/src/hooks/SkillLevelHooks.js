import {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_ENDPOINT} from "../../appSettings";

export const useSkillLevels = () => {
    const [skillLevels, setSkillLevels] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_ENDPOINT}skill-levels`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
            if (response.status === 200) {
                setSkillLevels(response.data);
            }
        });
    }, []);

    return skillLevels;
};
