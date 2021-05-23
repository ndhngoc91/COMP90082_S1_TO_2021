import {action, computed, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";

export class HiringEquipmentRegister {
    @persist("object") order
    @persist("object") recipientMap;
    @persist selectedRecipientIndex;

    constructor() {
        makeObservable(this, {
            order: observable,
            recipientMap: observable,
            selectedRecipientIndex: observable,
            recipients: computed,
            isReadyToMakeContract: computed,
            selectedRecipientId: computed,
            pickupOrder: action,
            selectProduct: action
        });
        this.order = {};
        this.recipientMap = {};
        this.selectedRecipientIndex = 0;
    }

    get recipients() {
        return Object.values(this.recipientMap).map(recipient => recipient.recipient)
    }

    get isReadyToMakeContract() {
        let isPickingProducts = false;
        const recipients = Object.values(this.recipientMap);
        recipients.forEach(recipient => {
            let numberOfProductGroups = Object.keys(recipient.productGroups).length;
            let numberOfSelectedProducts = recipient.selectedProducts.length;
            if (numberOfSelectedProducts !== numberOfProductGroups) {
                isPickingProducts = true;
            }
        });

        return !isPickingProducts;
    }

    get selectedRecipientId() {
        return parseInt(Object.keys(this.recipientMap)[this.selectedRecipientIndex]);
    }

    pickupOrder = (order, recipientMap) => {
        this.order = order;
        this.recipientMap = recipientMap;
        this.selectedRecipientIndex = 0;
    }

    selectProduct = (product) => {
        const recipient = this.recipientMap[this.selectedRecipientId];
        if (recipient.selectedProducts.length < recipient.productGroups.length) {
            recipient.selectedProducts = [...recipient.selectedProducts, product];
        }
        if (recipient.selectedProducts.length === recipient.productGroups.length) {
            this.selectedRecipientIndex = this.selectedRecipientIndex + 1;
        }
    }
}
