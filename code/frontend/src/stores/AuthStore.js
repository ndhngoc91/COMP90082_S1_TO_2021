import {action, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";
import {USER_ROLE} from "../consts/UserRole";

export class AuthStore {
    @persist username;
    @persist accessToken;
    @persist("object") user;
    @persist authenticated;
    @persist userRole;

    constructor() {
        makeObservable(this, {
            login: action,
            logout: action,
            username: observable,
            accessToken: observable,
            user: observable,
            authenticated: observable,
            userRole: observable
        });
        this.username = "";
        this.accessToken = "";
        this.user = {};
        this.authenticated = false;
        this.userRole = USER_ROLE.GUEST;
    }

    login = (username, accessToken, user, signInAsStaff) => {
        this.username = username;
        this.accessToken = accessToken;
        this.user = user;
        this.authenticated = true;
        if (signInAsStaff) {
            this.userRole = USER_ROLE.ADMIN;
        } else {
            this.userRole = USER_ROLE.CUSTOMER;
        }
    }

    logout = () => {
        this.username = "";
        this.accessToken = "";
        this.user = {};
        this.authenticated = false;
        this.userRole = USER_ROLE.GUEST;
    }
}
