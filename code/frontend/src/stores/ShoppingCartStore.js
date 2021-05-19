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
            setDates: action,
            toggleExtraItem: action
        });
        this.cartItems = [];
        this.startDate = moment().format("YYYY-MM-DD hh:mm:ss");
        this.endDate = moment().add(8, "hours").format("YYYY-MM-DD hh:mm:ss");
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
        return this.cartItems.reduce((previousValue, cartItem) => {
            const extraCost = cartItem.extraItems.reduce((previousValue, extraItem) => {
                if (extraItem.selected) {
                    return previousValue + extraItem.basePrice + parseInt(extraItem.priceLevels[this.intendedNumberOfHiringDays]);
                } else {
                    return previousValue;
                }
            }, 0)

            return previousValue + cartItem.basePrice + parseInt(cartItem.priceLevels[this.intendedNumberOfHiringDays]) + extraCost;
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
        const _startDate = moment(startDate, "YYYY-MM-DD hh:mm:ss");
        const _endDate = moment(endDate, "YYYY-MM-DD hh:mm:ss");
        const level = _endDate.diff(_startDate, "days");
        this.cartItems.forEach(cartItem => {
            cartItem.cost = cartItem.basePrice + parseInt(cartItem.priceLevels[level]);
            cartItem.extraItems.forEach(extraItem => {
                extraItem.cost = extraItem.basePrice + parseInt(extraItem.priceLevels[level]);
            });
        });
    }

    toggleExtraItem = (cartId, extraItemId) => {
        const cartItem = this.cartItems.find(cartItem => cartItem.id === cartId);
        const extraItem = cartItem.extraItems.find(extraItem => extraItem.id === extraItemId);
        extraItem.selected = !extraItem.selected;
        this.cartItems = [...this.cartItems];
    }
}
