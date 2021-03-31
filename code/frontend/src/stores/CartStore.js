import {action, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";

export class CartStore {
    @persist("list") products;
    @persist totalPrice;
    @persist totalGST;

    constructor() {
        makeObservable(this, {
            products: observable,
            totalPrice: observable,
            totalGST: observable,
            addProduct: action,
            removeProduct: action,
            changeQuantity: action,
            emptyCart: action,
            readdProduct: action,
            readdOrders: action
        });
        this.products = [];
        this.totalPrice = 0;
        this.totalGST = 0;
    }

    addProduct = (product) => {
        this.products.push(product);
    };

    removeProduct = (keyProductID) => {
        this.products = this.products.filter(product => product.keyProductID !== keyProductID);
    };

    changeQuantity = (keyProductID, quantity) => {
        this.products = this.products.map(product => {
            if (product.keyProductID === keyProductID) {
                product.quantity = quantity;
            }
            return product;
        });
    };

    emptyCart = () => {
        this.products = [];
    };

    checkIfProductExists = (product) => {
        return this.products.some(curr => curr.keyProductID === product.keyProductID);
    }

    readdProduct = (product) => {
        const exists = this.checkIfProductExists(product);
        if (exists) {
            this.products.map(curr => {
                if (curr.keyProductID === product.keyProductID) {
                    curr.quantity += product.quantity;
                }
                return curr;
            });
        } else {
            this.products.push(product);
        }
    };

    readdOrders = (products) => {
        for (let product of products) {
            const exists = this.checkIfProductExists(product);
            if (exists) {
                this.products.map(curr => {
                    if (curr.keyProductID === product.keyProductID) {
                        curr.quantity += product.quantity;
                    }
                    return curr;
                });
            } else {
                this.products.push(product);
            }
        }
    }
}
