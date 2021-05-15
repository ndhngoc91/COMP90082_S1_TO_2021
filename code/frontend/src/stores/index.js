import {createContext, useContext} from "react"
import {create} from "mobx-persist";
import {AuthStore} from "./AuthStore";

const hydrate = create({
    storage: localStorage,
    jsonify: true
});

export const createStore = async () => {
    const authStore = new AuthStore();
    await hydrate("rv_auth", authStore);

    return {
        authStore: authStore
    };
};

export const StoreContext = createContext({
    authStore: new AuthStore()
});

export const useStores = () => useContext(StoreContext);
