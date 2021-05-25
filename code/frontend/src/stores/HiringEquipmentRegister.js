import {action, computed, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";

export class HiringEquipmentRegister {
    @persist("object") order
    @persist("list") orderDetails;
    @persist("object") recipientMap;
    @persist selectedRecipientIndex;

    constructor() {
        makeObservable(this, {
            order: observable,
            orderDetails: observable,
            recipientMap: observable,
            selectedRecipientIndex: observable,
            recipients: computed,
            isMakingContract: computed,
            isReadyToMakeContract: computed,
            selectedRecipientId: computed,
            nextProductGroup: computed,
            contractDetails: computed,
            pickupOrder: action,
            selectProduct: action,
            cancelSelection: action,
            clearEquipmentRegisterProcess: action
        });
        this.order = null;
        this.orderDetails = [];
        this.recipientMap = {};
        this.selectedRecipientIndex = 0;
    }

    get recipients() {
        return Object.values(this.recipientMap).map(recipient => recipient.recipient)
    }

    get isMakingContract() {
        if (this.order === null) {
            return false;
        }

        return !this.isReadyToMakeContract;
    }

    get isReadyToMakeContract() {
        const recipients = Object.values(this.recipientMap);
        if (recipients.length > 0) {
            let isPickingProducts = false;
            recipients.forEach(recipient => {
                let numberOfProductGroups = Object.keys(recipient.productGroups).length;
                let numberOfSelectedProducts = recipient.selectedProducts.length;
                if (numberOfSelectedProducts !== numberOfProductGroups) {
                    isPickingProducts = true;
                }
            });

            return !isPickingProducts;
        } else {
            return false;
        }
    }

    get selectedRecipientId() {
        return parseInt(Object.keys(this.recipientMap)[this.selectedRecipientIndex]);
    }

    get nextProductGroup() {
        if (this.isReadyToMakeContract) {
            return null;
        } else {
            if (this.isMakingContract) {
                const recipient = this.recipientMap[this.selectedRecipientId];
                return recipient.productGroups[recipient.selectedProducts.length];
            } else {
                return null;
            }
        }
    }

    get contractDetails() {
        const contractDetails = [];
        Object.values(this.recipientMap).forEach(recipient => {
            recipient.selectedProducts.forEach(product => {
                contractDetails.push({
                    recipient_id: recipient.recipient.id,
                    product_id: product.id
                });
            });
        });

        return contractDetails;
    }

    pickupOrder = (order, orderDetails, recipientMap) => {
        this.order = order;
        this.orderDetails = orderDetails;
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

    cancelSelection = () => {
        Object.values(this.recipientMap).forEach(recipient => {
            recipient.selectedProducts = [];
        });
        this.selectedRecipientIndex = 0;
    }

    clearEquipmentRegisterProcess = () => {
        this.order = null;
        this.orderDetails = [];
        this.recipientMap = {};
        this.selectedRecipientIndex = 0;
    }
}
