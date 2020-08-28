import app from "./app";
import chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Create user", () => {
    let missing_email = { "missing_email": "You must provide a email for the user!" };
    let missing_name = { "missing_name": "You must provide a name for the user!" };
    let missing_gender = { "missing_gender": "You must provide a gender for the user!" };
    let user_exists = { "user_already_exists": "This user name or user email is already registered!" };
    let error_string = "Your made a bad request!";
    let person_one = {
        "name": "Person One",
        "email": "personone@mail.com",
        "gender": "male"
    };
    let person_two = {
        "name": "Person Two",
        "email": "persontwo@mail.com",
        "gender": "female"
    };
    let person_three = {
        "name": "Person Three",
        "email": "personthree@mail.com",
        "gender": "ufutfyj"
    };

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
    \rmissing_gender if no name, email and gender are given", async () => {
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
                expect(json_string).to.deep.equal([person_one, person_two, local_person_three]);
            })
    });
})