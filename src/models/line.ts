import { User, getUser } from "./user";

let line: any[] = [];
const invalid_user_email = {
    "invalid_user_email": "The user with the given email does not exists or is not on the Line!",
    "position": "undefined"
}
const invalid_user_id = {
    "invalid_user_id": "The user with the given id does not exists!"
}
const user_already_on_line = {
    "user_already_on_line": "This user is already on the Line!"
}
const empty_line = {
    "empty_line": "The line is empty!"
}
const empty_gender_filter = {
    "empty_gender_filter": "There is no person with this gender on the Line!"
}

export const findPosition = (user_email: string) => {
    user_email = user_email.toLowerCase();
    let position = 0;
    // for ... of scrolls through the list in order, so i don't have to 
    // store the position of each user
    for (let user of line) {
        if (user.email == user_email) {
            return {
                "position": position
            };
        }
        position++;
    }
    return invalid_user_email;
}

export const addToLine = (user_id: number) => {
    const user = getUser(user_id);
    if (user) {
        if (JSON.stringify(findPosition(user.email)) === JSON.stringify(invalid_user_email)) {
            line.push(user);
            return (findPosition(user.email));
        }
        else {
            return user_already_on_line;
        }
    }
    else {
        return invalid_user_id;
    }
}

export const showLine = () => {
    const l = line
        .map((user: User) => {
            let local_user: any = JSON.parse(JSON.stringify(user));
            local_user.position = findPosition(user.email).position;
            return local_user;
        });
    if (l.length > 0) {
        return l;
    }
    return empty_line;
}

export const filterLine = (user_gender: string) => {
    user_gender = user_gender.toLowerCase();
    const l = line
        .filter((user: User) => {
            return user.gender === user_gender;
        })
        .map((user: User) => {
            let local_user: any = JSON.parse(JSON.stringify(user));
            local_user.position = findPosition(user.email).position;
            return local_user;
        });
    if (l.length > 0) {
        return l;
    }
    return empty_gender_filter;
}

export const popLine = () => {
    const user: User = line[0];
    if (user == undefined) {
        return empty_line;
    }
    line.shift();
    return user;
}