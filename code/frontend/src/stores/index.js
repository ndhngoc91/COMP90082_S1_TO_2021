import {createContext, useContext} from "react"
import {create} from "mobx-persist";
import {AuthStore} from "./AuthStore";
import {ShoppingCartStore} from "./ShoppingCartStore";

const hydrate = create({
    storage: localStorage,
    jsonify: true
});

export const createStore = async () => {
    const authStore = new AuthStore();
    const shoppingCartStore = new ShoppingCartStore();
    await hydrate("rv_auth", authStore);
    await hydrate("rv_shopping_cart", shoppingCartStore);

    return {
        authStore: authStore,
        shoppingCartStore: shoppingCartStore
    };
};

export const StoreContext = createContext({
    authStore: new AuthStore(),
    shoppingCartStore: new ShoppingCartStore()
});

export const useStores = () => useContext(StoreContext);
