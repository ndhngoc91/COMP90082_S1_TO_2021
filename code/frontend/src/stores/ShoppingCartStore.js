import {action, computed, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";
import {USER_ROLE} from "../consts/UserRole";
import moment from "moment";
import {UserType} from "../consts/UserType";

export class ShoppingCartStore {
    @persist("list") cartItems;

    constructor() {
        makeObservable(this, {
            cartItems: observable,
            lastId: computed,
            totalCost: computed,
            addNewCartItem: action,
            deleteCartItem: action,
            clearShoppingCart: action
        });
        this.cartItems = [];
    }

    get lastId() {
        return this.cartItems.length + 1;
    }

    get totalCost() {
        return this.cartItems.reduce((previousValue, currentItem) => {
            return previousValue + currentItem.cost;
        }, 0);
    }

    addNewCartItem = (cartItem) => {
        cartItem.id = this.lastId;
        this.cartItems = [...this.cartItems, cartItem];
    }

    deleteCartItem = (cartItemId) => {
        this.cartItems = [...this.cartItems.filter(cartItem => cartItem.id !== cartItemId)];
    }

    clearShoppingCart = () => {
        this.cartItems = [];
    }
}
