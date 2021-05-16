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

export const usePackage = (package_id) => {
    const [loading, setLoading] = useState(false);
    const [package_, setPackage_] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://127.0.0.1:8000/packages/${package_id}`, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then(response => {
            if (response.status === 200) {
                setPackage_(response.data);
            }
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return [package_, {loading}];
}

export const useHandleFilterPackages = () => {
    const [packages, setPackages] = useState([]);
    const [filtering, setFiltering] = useState(false);

    const handleFilterPackages = useCallback((filterParams) => {
        setFiltering(true);
        axios.get("http://localhost:8000/packages/filter", {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"},
            params: filterParams
        }).then((response) => {
            setPackages(response.data);
        }).finally(() => {
            setFiltering(false);
        });
    }, [])

    return [handleFilterPackages, {packages, filtering}];
};

export const useHandleAddPackage = () => {
    const [handling, setHandling] = useState(false);

    const handleAddPackage = useCallback(({
                                              name,
                                              description,
                                              age_group_id,
                                              category_id,
                                              skill_level_id,
                                              product_group_ids
                                          }, success, failure = () => {
    }) => {
        setHandling(true);
        axios.post('http://127.0.0.1:8000/packages', {
            name: name,
            description: description,
            age_group_id: age_group_id,
            category_id: category_id,
            skill_level_id: skill_level_id,
            product_group_ids: product_group_ids
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

export const useHandleEditPackage = () => {
    const [handling, setHandling] = useState(false);

    const handleEditPackage = useCallback(({
                                               id,
                                               name,
                                               description,
                                               age_group_id,
                                               category_id,
                                               skill_level_id
                                           }, success, failure = () => {
    }) => {
        setHandling(true);
        axios.put(`http://127.0.0.1:8000/packages/${id}`, {
            name: name,
            description: description,
            age_group_id: age_group_id,
            category_id: category_id,
            skill_level_id: skill_level_id,
            product_group_ids: []
        }, {
            headers: {"Content-Type": "application/JSON; charset=UTF-8"}
        }).then(response => {
            if (response.status === 202) {
                success();
            } else {
                failure();
            }
        }).catch(err => {
            console.log(err);
            failure();
        }).finally(() => {
            setHandling(false);
        });
    }, []);

    return [handleEditPackage, {handling}];
};
