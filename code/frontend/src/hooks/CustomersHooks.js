import {useEffect, useState} from "react";
import axios from "axios";

export const useCustomersList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:8000/customers",{
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
        }).then((response) => {
                /* Add key for each object */
                for (var i = 0; i < response.data.length; i++) {
                    response.data[i]["key"] = i;
                  }
                setCustomers(response.data);
             });

        
    }, []);

    return customers;
};
