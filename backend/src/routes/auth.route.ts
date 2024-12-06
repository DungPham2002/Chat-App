import express from 'express';

const route = express.Router();

route.get("/signup", (req, res) => {
    res.send("Sign up")
});

route.get("/login", (req, res) => {
    res.send("Log in")
});

route.get("/logout", (req, res) => {
    res.send("Log out")
});

export default route;