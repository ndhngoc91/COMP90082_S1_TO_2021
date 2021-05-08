import {createContext, useContext} from "react"
import {create} from "mobx-persist";
import {AddressStore} from "./AddressStore";
import {CartStore} from "./CartStore";
import {CustomerStore} from "./CustomerStore";
import {AuthStore} from "./AuthStore";

const hydrate = create({
    storage: localStorage,
    jsonify: true
});

export const createStore = async () => {
    const addressStore = new AddressStore();
    const authStore = new AuthStore();
    const cartStore = new CartStore();
    const customerStore = new CustomerStore();
    await hydrate("rv_auth", authStore);
    await hydrate("rv_cart", cartStore);
    await hydrate("rv_customer", customerStore);

    return {
        addressStore: addressStore,
        authStore: authStore,
        cartStore: cartStore,
        customerStore: customerStore
    };
};

export const StoreContext = createContext({
    addressStore: new AddressStore(),
    authStore: new AuthStore(),
    cartStore: new CartStore(),
    customerStore: new CustomerStore()
});

export const useStores = () => useContext(StoreContext);
