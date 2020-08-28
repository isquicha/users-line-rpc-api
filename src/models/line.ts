import { getUser } from "./user";

let line: any[] = [];

const userPosition = (user_email: string) => {
    let position = 0;
    for (let user of line) {
        if (user.email == user_email) {
            return {
                "user": user,
                "position": position
            };
        }
        position++;
    }
    return {
        "invalid_user_email": "The user with the given email is not on the line!"
    }
}

export const addUserToLine = (user_id: number) => {
    const user = getUser(user_id);
    if (user) {
        line.push(user);
        return (userPosition(user.email));
    }
}