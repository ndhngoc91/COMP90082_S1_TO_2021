import {createContext, useContext} from "react"
import {create} from "mobx-persist";
import {AddressStore} from "./AddressStore";
import {CartStore} from "./CartStore";
import {CustomerStore} from "./CustomerStore";

const hydrate = create({
    storage: localStorage,
    jsonify: true
});

export const createStore = async () => {
    const addressStore = new AddressStore();
    const cartStore = new CartStore();
    const customerStore = new CustomerStore();
    await hydrate("cart", cartStore);
    await hydrate("customer", customerStore);

    return {
        addressStore: addressStore,
        cartStore: cartStore,
        customerStore: customerStore
    };
};

export const StoreContext = createContext({
    addressStore: new AddressStore(),
    cartStore: new CartStore(),
    customerStore: new CustomerStore()
});

export const useStores = () => useContext(StoreContext);
