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
    const [selectedCategories, setSelectedCatogories] = useState([]);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [extras, setExtras] = useState([]);
    const [ageId, setAgeId] = useState([]);
    const [loadingExtras, setloadingExtras] = useState(false);

    useEffect (() => {
        console.log(loading)
    }, [loading]);

    
    const getPackages = useCallback(() => {

        if (selectedCategories.length > 0 && loading){

            //setLoading(true);
            selectedCategories.map(id => (
                axios.post(
                `http://127.0.0.1:8000/categories/?days=${rentPeriod}&category_id=${id}`,
                    { headers: { "Content-Type": "application/JSON; charset=UTF-8" } }
                ).then((response) => {
                    let packages = response.data;
                    for (let i = 0; i < packages.length; i++) {
                        packages[i].key = packages[i].package_id;
                    }
                    setPackages(oldPcks => [...oldPcks, ...packages]);
                    
                }).finally(() => {
                    setLoading(false);
                })
            ))
        }


    },[rentPeriod, selectedCategories, loading]);

    // const getExtras = useCallback(() => {

        

    //     axios.get(
    //     `http://127.0.0.1:8000/categories/extras-${rentPeriod}-${ageId}`,
    //         { headers: { "Content-Type": "application/JSON; charset=UTF-8" } }
    //     ).then((response) => {
    //         let extras = response.data;
    //         for (let i = 0; i < extras.length; i++) {
    //             extras[i].key = extras[i].extra_id;
    //         }
    //         setExtras(oldEx => [...oldEx, ...extras]);
            
    //     }).finally(() => {
    //         setLoading(false);
    //     })
    
    //      },[rentPeriod, ageId]);
       

    return [{ packages, rentPeriod, selectedCategories, loading },
              setRentPeriod, setSelectedCatogories, getPackages, setLoading ];
};


  

