import {createContext, useContext} from "react"
import {create} from "mobx-persist";
import {AuthStore} from "./AuthStore";
import {HiringEquipmentRegister} from "./HiringEquipmentRegister";
import {ShoppingCartStore} from "./ShoppingCartStore";

const hydrate = create({
    storage: localStorage,
    jsonify: true
});

export const createStore = async () => {
    const authStore = new AuthStore();
    const hiringEquipmentRegister = new HiringEquipmentRegister();
    const shoppingCartStore = new ShoppingCartStore();
    await hydrate("rv_auth", authStore);
    await hydrate("rv_hiring_equipment_register", hiringEquipmentRegister);
    await hydrate("rv_shopping_cart", shoppingCartStore);

    return {
        authStore: authStore,
        hiringEquipmentRegister: hiringEquipmentRegister,
        shoppingCartStore: shoppingCartStore
    };
};

export const StoreContext = createContext({
    authStore: new AuthStore(),
    hiringEquipmentRegister: new HiringEquipmentRegister(),
    shoppingCartStore: new ShoppingCartStore()
});

export const useStores = () => useContext(StoreContext);
