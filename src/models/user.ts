import gender_list from "./gender_list.json";

let user_list: any[] = [];
let last_id = 0;


class User {
    static _id: number = last_id;
    #id: number;
    name: string;
    email: string;
    gender: string;

    public constructor(name: string, email: string, gender: string) {
        this.#id = User._id++;
        this.name = name;
        this.email = email;
        this.gender = "other";
        for (let x of gender_list) {
            if (x === gender)
                this.gender = x;
        }
    }

    public get info() {
        return {
            "id": this.#id,
            "name": this.name,
            "email": this.email,
            "gender": this.gender,
        };
    }
}

const userExists = (name: string, email: string) => {
    for (let user of user_list) {
        if (user.name == name) {
            return true;
        }
    }
    for (let user of user_list) {
        if (user.email == email) {
            return true;
        }
    }
    return false;
}


export const createUser = (name: string, email: string, gender: string) => {
    email = email.toLowerCase();
    if (!userExists(name, email)) {
        gender = gender.toLowerCase();
        let user = new User(name, email, gender);
        user_list.push(user);
        last_id++;
        return user.info;
    }
    else {
        return {
            "user_already_exists": "This user name or user email is already registered!"
        }
    }
}

export const listUsers = () => {
    return user_list
}