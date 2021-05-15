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

export const useHandleFilterPackages = () => {
    const [packages, setPackages] = useState([]);
    const [filtering, setFiltering] = useState(false);

    const filterItems = useCallback((query) => {
        setFiltering(true);
        const url = query ? "http://localhost:8000/packages/filter" : "http://localhost:8000/packages";
        const params = query ? {query: query} : {};
        axios.get(url, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
            params: params
        }).then((response) => {
            setPackages(response.data);
        }).finally(() => {
            setFiltering(false);
        });
    }, [])

    return [filterItems, {packages, filtering}];
};

export const useHandleAddPackage = () => {
    const [handling, setHandling] = useState(false);

    const handleAddPackage = useCallback(({name, description, products, available}, success, failure) => {
        setHandling(true);
        axios.post('http://127.0.0.1:8000/packages', {
            name: name,
            description: description,
            what_is_included: products.join("-"),
            available: available
        }, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then(response => {
            if (response.status === 201) {
                success();
            } else {
                failure();
            }
        }).catch(() => {
            failure();
        }).finally(() => {
            setHandling(false);
        });
    }, []);

    return [handleAddPackage, {handling}];
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


  

