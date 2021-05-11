import {useCallback, useEffect, useState} from "react";
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

export const handlePackages = () => {

    const [rentPeriod, setRentPeriod] = useState("");
    const [selectedCategory, setSelectedCatogory] = useState(0);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect (() => {
        console.log(loading)
    }, [loading]);

    
    const getPackages = useCallback(() => {

        if (loading){

            //setLoading(true);
            
            axios.post(
            `http://127.0.0.1:8000/categories/?days=${rentPeriod}&category_id=${selectedCategory}`,
                { headers: { "Content-Type": "application/JSON; charset=UTF-8" } }
            ).then((response) => {
                let packages = response.data;
                for (let i = 0; i < packages.length; i++) {
                    packages[i].key = packages[i].package_id;
                }
                setPackages(packages);
                
            }).finally(() => {
                setLoading(false);
            })
           
        }


    },[rentPeriod, selectedCategory, loading]);    

    return [{ packages, rentPeriod, selectedCategory, loading },
              setRentPeriod, setSelectedCatogory, getPackages, setLoading ];
};


  

