import {action, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";

export class CustomerStore {
    @persist customerId;
    @persist deliveryAddrId;
    @persist billingAddrId;

    constructor() {
        makeObservable(this, {
            customerId: observable,
            deliveryAddrId: observable,
            billingAddrId: observable,
            setCustomerId: action,
            setDeliveryAddrId: action,
            setBillingAddrId: action

        });
        this.customerId = null;
        this.deliveryAddrId = null;
        this.billingAddrId = null;
    }

    setCustomerId = (customerId) => {
        this.customerId = customerId;
    }

    setDeliveryAddrId = (deliveryAddrId) => {
        this.deliveryAddrId = deliveryAddrId;
    }

    setBillingAddrId = (billingAddrId) => {
        this.billingAddrId = billingAddrId;
    }
}
