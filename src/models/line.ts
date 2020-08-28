import { User, getUser } from "./user";

let line: any[] = [];
const invalid_user_email = {
    "invalid_user_email": "The user with the given email does not exists or is not on the line!",
    "position": "undefined"
}
const invalid_user_id = {
    "invalid_user_id": "The user with the given id does not exists!"
}
const user_already_on_line = {
    "user_already_on_line": "This user is already on the Line"
}


export const findPosition = (user_email: string) => {
    let position = 0;
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

export const addUserToLine = (user_id: number) => {
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
    return line;
}

export const filterLine = (gender: string) => {
    return line
        .filter((user: User) => {
            return user.gender === gender;
        })
        .map((user: User) => {
            let local_user: any = user;
            local_user.position = findPosition(user.email).position;
            return local_user;
        })
}