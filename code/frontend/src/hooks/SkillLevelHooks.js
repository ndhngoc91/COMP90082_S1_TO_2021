import {useEffect, useState} from "react";
import axios from "axios";

export const useSkillLevels = () => {
    const [skillLevels, setSkillLevels] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/skill-levels", {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
            if (response.status === 200) {
                setSkillLevels(response.data);
            }
        });
    }, []);

    return skillLevels;
};
