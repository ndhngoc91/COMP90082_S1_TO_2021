import {action, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";

export class AuthStore {
    @persist username;
    @persist accessToken;
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

    login = (username, accessToken) => {
        this.username = username;
        this.accessToken = accessToken;
        this.authenticated = true;
    }

    logout = () => {
        this.username = "";
        this.accessToken = "";
        this.authenticated = false;
    }
}
