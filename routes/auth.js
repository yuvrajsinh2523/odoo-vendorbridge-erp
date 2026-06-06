const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Login Page
router.get("/login", (req, res) => {
    res.render("auth/login");
});

// Signup Page
router.get("/signup", (req, res) => {
    res.render("auth/signup");
});

// Signup Logic
router.post("/signup", (req, res) => {

    const {
        name,
        email,
        password,
        role
    } = req.body;

    const sql =
    `INSERT INTO users
    (name, email, password, role)
    VALUES (?, ?, ?, ?)`;

    db.query(
        sql,
        [name, email, password, role],
        (err, result) => {

            if (err) throw err;

            res.redirect("/login");
        }
    );
});

// Login Logic
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql =
    `SELECT * FROM users
     WHERE email = ?
     AND password = ?`;

    db.query(
        sql,
        [email, password],
        (err, result) => {

            if (err) throw err;

            if (result.length > 0) {

                req.session.user =
                result[0];

                res.redirect("/dashboard");

            } else {

                res.send(
                "Invalid Credentials"
                );
            }
        }
    );
});

// Logout
router.get("/logout",
(req, res) => {

    req.session.destroy();

    res.redirect("/login");
});

module.exports = router;
