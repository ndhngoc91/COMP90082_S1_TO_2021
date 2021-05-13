import {action, computed, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";
import {USER_ROLE} from "../consts/UserRole";
import moment from "moment";

export class AuthStore {
    @persist id;
    @persist username;
    @persist password;
    @persist height;
    @persist weight;
    @persist footSize;
    @persist firstName;
    @persist lastName;
    @persist gender;
    @persist birthday;
    @persist phone;
    @persist email;
    @persist din;
    @persist skillLevelId;
    @persist organizationId;
    @persist userTypeId;
    @persist accessToken;
    @persist tokenType;
    @persist userRole;

    setData = ({
                   id, username, password, height, weight, foot_size, first_name, last_name, gender,
                   birthday, phone, email, din, skill_level_id, organization_id, user_type_id
               }) => {
        this.id = id;
        this.username = username;
        this.password = password;
        this.height = height;
        this.weight = weight;
        this.footSize = foot_size;
        this.firstName = first_name;
        this.lastName = last_name;
        this.gender = gender;
        this.birthday = birthday;
        this.phone = phone;
        this.email = email;
        this.din = din;
        this.skillLevelId = skill_level_id;
        this.organizationId = organization_id;
        this.userTypeId = user_type_id;
    }

    constructor() {
        makeObservable(this, {
            login: action,
            logout: action,
            id: observable,
            username: observable,
            password: observable,
            height: observable,
            weight: observable,
            footSize: observable,
            firstName: observable,
            lastName: observable,
            gender: observable,
            birthday: observable,
            phone: observable,
            email: observable,
            din: observable,
            skillLevelId: observable,
            organizationId: observable,
            userTypeId: observable,
            values: computed
        });
        this.setData({
            id: 0,
            username: "",
            password: "",
            height: 0,
            weight: 0,
            footSize: 0,
            firstName: "",
            lastName: "",
            gender: "",
            birthday: "",
            phone: "",
            email: "",
            din: "",
            skillLevelId: 0,
            organizationId: 0,
            userTypeId: 0
        });
        this.userRole = USER_ROLE.GUEST;
    }

    get values() {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            height: this.height,
            weight: this.weight,
            foot_size: this.footSize,
            first_name: this.firstName,
            last_name: this.lastName,
            gender: this.gender,
            birthday: moment(this.birthday, "YYYY/MM/DD"),
            phone: this.phone,
            email: this.email,
            din: this.din,
            skill_level_id: this.skillLevelId,
            organization_id: this.organizationId,
            user_type_id: this.userTypeId
        };
    }

    login = (data) => {
        this.setData(data);
        const {user_type_id} = data;
        if (user_type_id === 1) {
            this.userRole = USER_ROLE.CUSTOMER;
        } else {
            this.userRole = USER_ROLE.ADMIN;
        }
    }

    logout = () => {
        this.setData({
            id: 0,
            username: "",
            password: "",
            height: 0,
            weight: 0,
            footSize: 0,
            firstName: "",
            lastName: "",
            gender: "",
            birthday: "",
            phone: "",
            email: "",
            din: "",
            skillLevelId: 0,
            organizationId: 0,
            userTypeId: 0
        });
        this.userRole = USER_ROLE.GUEST;
    }
}
