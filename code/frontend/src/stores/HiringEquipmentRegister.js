import {action, computed, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";
import {USER_ROLE} from "../consts/UserRole";
import moment from "moment";
import {UserType} from "../consts/UserType";

export class HiringEquipmentRegister {
    @persist("object") order
    @persist("object") recipientMap;

    constructor() {
        makeObservable(this, {
            order: observable,
            recipientMap: observable,
            isPickingProducts: computed
        });
        this.order = {};
        this.recipientMap = {};
    }

    get isPickingProducts() {
        let isPickingProducts = false;
        const recipients = Object.values(this.recipientMap);
        recipients.forEach(recipient => {
            recipient.productGroups.forEach(productGroup => {
                if (productGroup.selected === false) {
                    isPickingProducts = true;
                }
            })
        });

        return isPickingProducts;
    }

    pickupOrder = (order, recipientMap) => {
        this.order = order;
        this.recipientMap = recipientMap;
    }
}
