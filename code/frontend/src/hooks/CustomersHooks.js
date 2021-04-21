import {useEffect, useState} from "react";
import axios from "axios";

export const useCustomersList = () => {
    const [customers, setCustomerId] = useState([]);

    useEffect(() => {
        // axios.get("http://127.0.0.1:8000/customers", {
        //     headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        // }).then((response) => {
        //     setCustomerId(response.data);
        // });

        axios.get("http://127.0.0.1:8000/customers")
             .then((response) => {
                console.log(response);
             });

        console.log("Try to get customers");
    }, []);

    return customers;
};
