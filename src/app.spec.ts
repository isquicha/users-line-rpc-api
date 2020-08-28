import app from "./app";
import chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
let error_string = "You made a bad request!";

const person_one = {
    "name": "Person One",
    "email": "personone@mail.com",
    "gender": "male"
};
const person_two = {
    "name": "Person Two",
    "email": "persontwo@mail.com",
    "gender": "female"
};
const person_three = {
    "name": "Person Three",
    "email": "personthree@mail.com",
    "gender": "ufutfyj"
};
const person_four = {
    "name": "Person Four",
    "email": "personfour@mail.com",
    "gender": "female"
};

describe("Create user", () => {
    let missing_email = { "missing_email": "You must provide a email for the user!" };
    let missing_name = { "missing_name": "You must provide a name for the user!" };
    let missing_gender = { "missing_gender": "You must provide a gender for the user!" };
    let user_exists = { "user_already_exists": "This user name or user email is already registered!" };


    it("Should return created user one info json on call", async () => {
        return chai
            .request(app)
            .post("/createUser")
            .send(person_one)
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string.id).to.eql(0);
                expect(json_string.email).to.eql(person_one.email);
                expect(json_string.gender).to.eql(person_one.gender);
                expect(json_string.name).to.eql(person_one.name);
            })
    });
    it("Should return created user two info json on call", async () => {
        return chai
            .request(app)
            .post("/createUser")
            .send(person_two)
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string.id).to.eql(1);
                expect(json_string.email).to.eql(person_two.email);
                expect(json_string.gender).to.eql(person_two.gender);
                expect(json_string.name).to.eql(person_two.name);
            })
    });
    it("Should return a user with 'other' gender if gender is invalid", async () => {
        return chai
            .request(app)
            .post("/createUser")
            .send(person_three)
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string.gender).to.eql("other");
            })
    });
    it("Should return created user two info json on call", async () => {
        return chai
            .request(app)
            .post("/createUser")
            .send(person_four)
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string.id).to.eql(3);
                expect(json_string.email).to.eql(person_four.email);
                expect(json_string.gender).to.eql(person_four.gender);
                expect(json_string.name).to.eql(person_four.name);
            })
    });
    it("Should return missing_name if no name is given", async () => {
        return chai
            .request(app)
            .post("/createUser")
            .send({
                "email": "person@mail.com",
                "gender": "male"
            })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(400);
                expect(json_string).to.deep.equal([error_string, [missing_name]]);
            })
    });
    it("Should return missing_email if no email is given", async () => {
        return chai
            .request(app)
            .post("/createUser")
            .send({
                "name": "Person",
                "gender": "male"
            })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(400);
                expect(json_string).to.deep.equal([error_string, [missing_email]]);
            })
    });
    it("Should return missing_gender if no gender is given", async () => {
        return chai
            .request(app)
            .post("/createUser")
            .send({
                "name": "Person",
                "email": "person@mail.com"
            })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(400);
                expect(json_string).to.deep.equal([error_string, [missing_gender]]);
            })
    });
    it("Should return missing_name and missing_email if no name and email are given", async () => {
        return chai
            .request(app)
            .post("/createUser")
            .send({
                "gender": "male"
            })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(400);
                expect(json_string).to.deep.equal([error_string, [missing_name, missing_email]]);
            })
    });
    it("Should return missing_name and missing_gender if no name and gender are given", async () => {
        return chai
            .request(app)
            .post("/createUser")
            .send({
                "email": "person@mail.com"
            })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(400);
                expect(json_string).to.deep.equal([error_string, [missing_name, missing_gender]]);
            })
    });
    it("Should return missing_email and missing_gender if no email and gender are given", async () => {
        return chai
            .request(app)
            .post("/createUser")
            .send({
                "name": "Person"
            })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(400);
                expect(json_string).to.deep.equal([error_string, [missing_email, missing_gender]]);
            })
    });
    it("Should return missing_name, missing_email and\
    \b\b\bmissing_gender if no name, email and gender are given", async () => {
        return chai
            .request(app)
            .post("/createUser")
            .send({
            })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(400);
                expect(json_string).to.deep.equal([error_string, [missing_name, missing_email, missing_gender]]);
            })
    });
    it("Should return user_exists if a name already registered is given", async () => {
        return chai
            .request(app)
            .post("/createUser")
            .send({
                "name": "Person One",
                "email": "person@mail.com",
                "gender": "male"
            })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal(user_exists);
            })
    });
    it("Should return user_exists if an email already registered is given", async () => {
        return chai
            .request(app)
            .post("/createUser")
            .send({
                "name": "Person Four",
                "email": "personone@mail.com",
                "gender": "male"
            })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal(user_exists);
            })
    });
    it("Should return all created users", async () => {
        return chai
            .request(app)
            .get("/listUsers")
            .then(res => {
                let json_string = JSON.parse(res.text);
                let local_person_three = person_three;
                local_person_three.gender = "other";
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal([person_one, person_two, local_person_three, person_four]);
            })
    });
});

describe("Add to line", () => {
    const invalid_user_id = {
        "invalid_user_id": "The user with the given id does not exists!"
    };
    const user_already_on_line = {
        "user_already_on_line": "This user is already on the Line!"
    };
    const missing_id = {
        "missing_id": "You must provide an user id to be added to the line!"
    };
    it("Should return position 0 for the first user added to the Line", async () => {
        return chai
            .request(app)
            .post("/addToLine")
            .send({ "id": 0 })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.eql({ "position": 0 });
            })
    });
    it("Should return position 1 for the second user added to the Line", async () => {
        return chai
            .request(app)
            .post("/addToLine")
            .send({ "id": 1 })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.eql({ "position": 1 });
            });
    });
    it("Should return position 2 for the third user added to the Line", async () => {
        return chai
            .request(app)
            .post("/addToLine")
            .send({ "id": 2 })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.eql({ "position": 2 });
            });
    });
    it("Should return position 3 for the fourth user added to the Line", async () => {
        return chai
            .request(app)
            .post("/addToLine")
            .send({ "id": 3 })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.eql({ "position": 3 });
            });
    });
    it("Should return invalid user id when trying to add\
    \b\b\ban invalid user id to the Line", async () => {
        return chai
            .request(app)
            .post("/addToLine")
            .send({ "id": 10 })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.eql(invalid_user_id);
            });
    });
    it("Should return user already on line when trying to add\
    \b\b\ban user that already is on the Line", async () => {
        return chai
            .request(app)
            .post("/addToLine")
            .send({ "id": 2 })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.eql(user_already_on_line);
            });
    });
    it("Should return missing_id if no id is given", async () => {
        return chai
            .request(app)
            .post("/addToLine")
            .send({})
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(400);
                expect(json_string).to.deep.equal([error_string, [missing_id]]);
            })
    });
});

describe("Find position", () => {
    const missing_email = {
        "missing_email": "You must provide an email for the search in the Line!"
    };
    const invalid_user_email = {
        "invalid_user_email": "The user with the given email does not exists or is not on the Line!",
        "position": "undefined"
    };

    it("Should return position 0 for the first user added to the Line", async () => {
        return chai
            .request(app)
            .post("/findPosition")
            .send({ "email": "PERSONONE@mail.com" })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.eql({ "position": 0 });
            })
    });
    it("Should return position 1 for the second user added to the Line", async () => {
        return chai
            .request(app)
            .post("/findPosition")
            .send({ "email": "persontwo@mail.com" })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.eql({ "position": 1 });
            })
    });
    it("Should return position 2 for the third user added to the Line", async () => {
        return chai
            .request(app)
            .post("/findPosition")
            .send({ "email": "personthree@mail.com" })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.eql({ "position": 2 });
            })
    });
    it("Should return invalid_user_email if no user with this email exists", async () => {
        return chai
            .request(app)
            .post("/findPosition")
            .send({ "email": "invalidemail@mail.com" })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal(invalid_user_email);
            })
    });
    it("Should return missing_email if no email is given", async () => {
        return chai
            .request(app)
            .post("/findPosition")
            .send({})
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(400);
                expect(json_string).to.deep.equal([error_string, [missing_email]]);
            })
    });
});

describe("Filter line", () => {
    const empty_gender_filter = {
        "empty_gender_filter": "There is no person with this gender on the Line!"
    };
    const missing_gender = {
        "missing_gender": "You must provide a gender for filtering the Line!"
    };

    // Stringfy and parse to create a deepCopy
    let local_person_one: any = JSON.parse(JSON.stringify(person_one));
    let local_person_two: any = JSON.parse(JSON.stringify(person_two));
    let local_person_three: any = JSON.parse(JSON.stringify(person_three));
    let local_person_four: any = JSON.parse(JSON.stringify(person_four));
    local_person_one.position = 0;
    local_person_two.position = 1;
    local_person_three.position = 2;
    local_person_three.gender = 'other';
    local_person_four.position = 3;


    it("Should return Person One for male gender filter", async () => {
        return chai
            .request(app)
            .post("/filterLine")
            .send({ "gender": "MALE" })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.eql([local_person_one]);
            })
    });
    it("Should return Person Three for other gender filter", async () => {
        return chai
            .request(app)
            .post("/filterLine")
            .send({ "gender": "other" })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.eql([local_person_three]);
            })
    });
    it("Should return Person Two and Person Four for female gender filter", async () => {
        return chai
            .request(app)
            .post("/filterLine")
            .send({ "gender": "female" })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.eql([local_person_two, local_person_four]);
            })
    });

    it("Should return empty_gender_filter for a gender filter\
    \b\b\bthat does not have Persons with it", async () => {
        return chai
            .request(app)
            .post("/filterLine")
            .send({ "gender": "agender" })
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.eql(empty_gender_filter);
            })
    });
    it("Should return missing_gender if no gender is given", async () => {
        return chai
            .request(app)
            .post("/filterLine")
            .send({})
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(400);
                expect(json_string).to.eql([error_string, [missing_gender]]);
            })
    });
});

describe("Show line and pop line", () => {
    // A lot of comparison variables because the tests are asynchronous
    // The comparison variables must not be modified during the running of the tests

    let local_first_person_one: any = JSON.parse(JSON.stringify(person_one));
    let local_first_person_two: any = JSON.parse(JSON.stringify(person_two));
    let local_first_person_three: any = JSON.parse(JSON.stringify(person_three));
    let local_first_person_four: any = JSON.parse(JSON.stringify(person_four));
    local_first_person_one.position = 0;
    local_first_person_two.position = 1;
    local_first_person_three.position = 2;
    local_first_person_three.gender = 'other';
    local_first_person_four.position = 3;

    let local_second_person_two: any = JSON.parse(JSON.stringify(person_two));
    let local_second_person_three: any = JSON.parse(JSON.stringify(person_three));
    let local_second_person_four: any = JSON.parse(JSON.stringify(person_four));
    local_second_person_two.position = 0;
    local_second_person_three.position = 1;
    local_second_person_three.gender = 'other';
    local_second_person_four.position = 2;

    let local_third_person_three: any = JSON.parse(JSON.stringify(person_three));
    let local_third_person_four: any = JSON.parse(JSON.stringify(person_four));
    local_third_person_three.position = 0;
    local_third_person_three.gender = 'other';
    local_third_person_four.position = 1;

    let local_fourth_person_four: any = JSON.parse(JSON.stringify(person_four));
    local_fourth_person_four.position = 0;

    const empty_line = {
        "empty_line": "The line is empty!"
    }

    it("Should return all users in the Line when get /showLine", async () => {
        return chai
            .request(app)
            .get("/showLine")
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal([
                    local_first_person_one, local_first_person_two,
                    local_first_person_three, local_first_person_four
                ]);
            })
    });
    it("Should return Person One when get /popLine", async () => {
        return chai
            .request(app)
            .get("/popLine")
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal(person_one);
            })
    });
    it("Should update Line order after get /popLine when get /showLine", async () => {
        return chai
            .request(app)
            .get("/showLine")
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal([
                    local_second_person_two,
                    local_second_person_three,
                    local_second_person_four
                ]);
            })
    });
    it("Should return Person Two when get /popLine again", async () => {
        return chai
            .request(app)
            .get("/popLine")
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal(person_two);
            })
    });
    it("Should update Line order again after another get\
    \b\b\bpopLine when get /showLine", async () => {
        return chai
            .request(app)
            .get("/showLine")
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal([
                    local_third_person_three,
                    local_third_person_four
                ]);
            })
    });
    it("Should return Person Three when get /popLine again", async () => {
        return chai
            .request(app)
            .get("/popLine")
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal(person_three);
            })
    });
    it("Should update Line order again after another get\
    \b\b\bpopLine when get /showLine", async () => {
        return chai
            .request(app)
            .get("/showLine")
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal([
                    local_fourth_person_four
                ]);
            })
    });
    it("Should return Person Four when get /popLine again", async () => {
        return chai
            .request(app)
            .get("/popLine")
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal(person_four);
            })
    });
    it("Should get empty_line after the last get /popLine when get /showLine", async () => {
        return chai
            .request(app)
            .get("/showLine")
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal(empty_line);
            })
    });
    it("Should get empty_line when get /popLine with no users in Line", async () => {
        return chai
            .request(app)
            .get("/popLine")
            .then(res => {
                let json_string = JSON.parse(res.text);
                expect(res.status).to.eql(200);
                expect(json_string).to.deep.equal(empty_line);
            })
    });

});