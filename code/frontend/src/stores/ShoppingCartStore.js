import {action, computed, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";
import moment from "moment";

export class ShoppingCartStore {
    @persist("list") cartItems;
    @persist startDate;
    @persist endDate;
    @persist("object") recipients;
    @persist isCheckedOut;

    constructor() {
        makeObservable(this, {
            cartItems: observable,
            startDate: observable,
            endDate: observable,
            recipients: observable,
            isCheckedOut: observable,
            lastId: computed,
            intendedNumberOfHiringDays: computed,
            totalCost: computed,
            ableToCheckout: computed,
            orderPostData: computed,
            addNewCartItem: action,
            deleteCartItem: action,
            clearShoppingCart: action,
            setDates: action,
            toggleExtraItem: action,
            addRecipientForCartItem: action,
            checkout: action
        });
        this.cartItems = [];
        this.startDate = moment().format("YYYY-MM-DD hh:mm:ss");
        this.endDate = moment().add(8, "hours").format("YYYY-MM-DD hh:mm:ss");
        this.recipients = {};
        this.isCheckedOut = false;
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

    get ableToCheckout() {
        return this.cartItems.length === Object.keys(this.recipients).length;
    }

    get orderPostData() {
        const orderDetails = [];
        this.cartItems.forEach(cartItem => {
            const extras = cartItem.extraItems.reduce((previousValue, extraItem) => {
                if (extraItem.selected) {
                    previousValue.push({
                        id: extraItem.id,
                        cost: extraItem.cost
                    });
                }

                return previousValue;
            }, []);
            const orderDetail = {
                package_id: cartItem.packageId,
                trail_id: cartItem.trailType.id,
                package_cost: cartItem.cost,
                extras: extras
            };
            if (this.recipients[cartItem.id]) {
                const recipient = this.recipients[cartItem.id];
                orderDetail.recipient = {
                    first_name: recipient.firstName,
                    last_name: recipient.lastName,
                    dob: moment(recipient.birthday).format("YYYY-MM-DD"),
                    height: recipient.height,
                    weight: recipient.weight,
                    foot_size: recipient.footSize,
                    skill_level_id: recipient.skillLevelId
                };
            }
            orderDetails.push(orderDetail);
        });
        return {
            start_date: moment(this.startDate).format("YYYY-MM-DD"),
            end_date: moment(this.endDate).format("YYYY-MM-DD"),
            description: "... some descriptions", // hardcoded
            order_details: orderDetails
        };
    }

    addNewCartItem = (cartItem) => {
        if (this.isCheckedOut) {
            this.cartItems = [];
            this.recipients = {};
            this.isCheckedOut = false;
        }
        cartItem.id = this.lastId;
        this.cartItems = [...this.cartItems, cartItem];
    }

    deleteCartItem = (cartItemId) => {
        this.cartItems = [...this.cartItems.filter(cartItem => cartItem.id !== cartItemId)];
        delete this.recipients[cartItemId]
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

    addRecipientForCartItem = (recipient, cartItemId) => {
        this.recipients[cartItemId] = recipient;
    }

    checkout = () => {
        this.isCheckedOut = true;
    }
}
