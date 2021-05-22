import {action, computed, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";
import {USER_ROLE} from "../consts/UserRole";
import moment from "moment";
import {UserType} from "../consts/UserType";

export class HiringEquipmentRegister {
    @persist("object") order

    constructor() {
        makeObservable(this, {
            order: observable
        });
        this.order = {};
    }

    pickupOrder = (order) => {
        this.order = order;
    }
}
