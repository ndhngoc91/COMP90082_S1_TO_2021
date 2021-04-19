import {action, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";

export class AuthStore {
    @persist username;
    @persist accessToken;
    @persist isStaff;
    @persist authenticated;

    constructor() {
        makeObservable(this, {
            login: action,
            logout: action,
            username: observable,
            accessToken: observable,
            authenticated: observable
        });
        this.username = "";
        this.accessToken = "";
        this.authenticated = false;
    }

    login = (username, accessToken, isStaff) => {
        this.username = username;
        this.accessToken = accessToken;
        this.isStaff = isStaff;
        this.authenticated = true;
    }

    logout = () => {
        this.username = "";
        this.accessToken = "";
        this.authenticated = false;
    }
}
