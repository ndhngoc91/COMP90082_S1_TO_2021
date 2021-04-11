import {action, computed, makeObservable, observable} from "mobx";

export class AddressStore {
    addresses;
    selectedDeliveryAddressIndex;
    selectedBillingAddressIndex;

    constructor() {
        makeObservable(this, {
            addresses: observable,
            selectedDeliveryAddressIndex: observable,
            selectedBillingAddressIndex: observable,
            currentDeliveryAddress: computed,
            currentBillingAddress: computed,
            setAddresses: action,
            selectDeliveryAddressIndex: action,
            selectBillingAddressIndex: action,
            addAddress: action
        });
        this.addresses = [];
        this.selectedDeliveryAddressIndex = -1;
        this.selectedBillingAddressIndex = -1;
    }

    get currentDeliveryAddress() {
        if (this.addresses.length === 0) {
            return {};
        } else {
            return this.addresses[this.selectedDeliveryAddressIndex];
        }
    }

    get currentBillingAddress() {
        if (this.addresses.length === 0) {
            return {};
        } else {
            return this.addresses[this.selectedBillingAddressIndex];
        }
    }

    setAddresses = (addresses) => {
        this.addresses = addresses;
        this.selectedDeliveryAddressIndex = 0;
        this.selectedBillingAddressIndex = 0;
    }

    selectDeliveryAddressIndex = (index) => {
        if (index >= 0 && index < this.addresses.length) {
            this.selectedDeliveryAddressIndex = index;
        }
    }

    selectBillingAddressIndex = (index) => {
        if (index >= 0 && index < this.addresses.length) {
            this.selectedBillingAddressIndex = index;
        }
    }

    getAddressString = (index) => {
        if (index >= 0 && index < this.addresses.length) {
            let strAddress = "";
            for (let attribute in this.addresses[index]) {
                if (attribute !== "id" && attribute !== "customer_id" && this.addresses[index][attribute] !== null) {
                    strAddress += this.addresses[index][attribute] + "; "
                }
            }
            return strAddress.slice(0, -2);
        }

        return "";
    }

    addAddress = (address) => {
        this.addresses.push(address);
    }
}
