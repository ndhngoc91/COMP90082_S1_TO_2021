import {useEffect, useState} from "react";
import axios from "axios";

export const useUserNames = () => {
    const [userName, setUserName] = useState("");
    const [isExist,setIsExist] = useState();

    useEffect((username) => {
        axios.get("http://127.0.0.1:8000/user", {
            params:{
                username:username
            }
        },
            {headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
            if (response.status === 200) {
                setUserName(response.data);
                setIsExist(false);
            }else{
                setIsExist(true);
            }
        });
    }, []);

    return userName;
};
