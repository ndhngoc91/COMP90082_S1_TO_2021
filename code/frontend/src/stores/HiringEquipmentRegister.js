import {action, computed, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";
import {USER_ROLE} from "../consts/UserRole";
import moment from "moment";
import {UserType} from "../consts/UserType";

export class HiringEquipmentRegister {
    @persist("object") order
    @persist("object") recipientMap;
    @persist selectedRecipientId;
    @persist selectedRecipientIndex;

    constructor() {
        makeObservable(this, {
            order: observable,
            recipientMap: observable,
            recipients: computed,
            isPickingProducts: computed,
            pickupOrder: action
        });
        this.order = {};
        this.recipientMap = {};
        this.selectedRecipientIndex = 0;
        this.selectedRecipientId = -1;
    }

    get recipients() {
        return Object.values(this.recipientMap).map(recipient => recipient.recipient)
    }

    get isPickingProducts() {
        let isPickingProducts = false;
        const recipients = Object.values(this.recipientMap);
        recipients.forEach(recipient => {
            let numberOfProductGroups = Object.keys(recipient.productGroups).length;
            let numberOfSelectedProducts = recipient.selectedProducts.length;
            if (numberOfSelectedProducts !== numberOfProductGroups) {
                isPickingProducts = true;
            }
        });

        return isPickingProducts;
    }

    pickupOrder = (order, recipientMap) => {
        this.order = order;
        this.recipientMap = recipientMap;
        this.selectedRecipientIndex = 0;
        this.selectedRecipientId = parseInt(Object.keys(this.recipientMap)[this.selectedRecipientIndex]);
    }

    selectProduct = (product) => {
    }
}
