import {action, computed, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";
import moment from "moment";

export class ShoppingCartStore {
    @persist("list") cartItems;
    @persist startDate;
    @persist endDate;

    constructor() {
        makeObservable(this, {
            cartItems: observable,
            startDate: observable,
            endDate: observable,
            lastId: computed,
            intendedNumberOfHiringDays: computed,
            totalCost: computed,
            addNewCartItem: action,
            deleteCartItem: action,
            clearShoppingCart: action,
            setDates: action
        });
        this.cartItems = [];
        this.startDate = "";
        this.endDate = "";
    }

    get lastId() {
        return this.cartItems.length + 1;
    }

    get intendedNumberOfHiringDays() {
        const startDate = moment(this.startDate, "YYYY-MM-DD hh:mm:ss");
        const endDate = moment(this.endDate, "YYYY-MM-DD hh:mm:ss");
        return endDate.diff(startDate, "days");
    }

    get totalCost() {
        return this.cartItems.reduce((previousValue, currentItem) => {
            return previousValue + currentItem.basePrice + parseInt(currentItem.priceLevels[this.intendedNumberOfHiringDays]);
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

    setDates = ({startDate, endDate}) => {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
