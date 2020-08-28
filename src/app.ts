import express = require("express");
import { createUser, listUsers } from "./models/user";
import { addToLine, showLine, findPosition, filterLine, popLine } from "./models/line";

const app = express();
app.use(express.json());
app.set("port", process.env.PORT || 3000);

app.post("/createUser", (req, res) => {
    let name: string = req.body.name;
    let email: string = req.body.email;
    let gender: string = req.body.gender;

    let error = {
        "has_error": false,
        "error_list": Array()
    };
    if (name == undefined) {
        error.has_error = true;
        error.error_list.push({
            "missing_name": "You must provide a name for the user!"
        })
    }
    if (email == undefined) {
        error.has_error = true;
        error.error_list.push({
            "missing_email": "You must provide a email for the user!"
        })
    }
    if (gender == undefined) {
        error.has_error = true;
        error.error_list.push({
            "missing_gender": "You must provide a gender for the user!"
        })
    }

    if (error.has_error) {
        res.status(400).json(["Your made a bad request!", error.error_list]);
    }
    else {
        res.json(createUser(name, email, gender));
    }
});

app.get("/listUsers", (req, res) => {
    res.json(listUsers());
});

app.post("/addToLine", (req, res) => {
    let id: number = req.body.id;
    res.json(addToLine(id));
});

app.post("/findPosition", (req, res) => {
    let email: string = req.body.email;
    res.json(findPosition(email));
});

app.post("/filterLine", (req, res) => {
    let gender: string = req.body.gender;
    res.json(filterLine(gender));
});

app.get("/popLine", (req, res) => {
    res.json(popLine());
});

app.get("/showLine", (req, res) => {
    res.json(showLine());
});
export default app;