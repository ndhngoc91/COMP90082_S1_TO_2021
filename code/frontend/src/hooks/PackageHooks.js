import {useEffect, useState} from "react";
import axios from "axios";

export const usePackages = () => {
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get('http://127.0.0.1:8000/packages', {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then(response => {
            if (response.status === 200) {
                setPackages(response.data);
            }
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return [packages, {loading}];
};

