const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Show Vendors
router.get("/", (req, res) => {

    const search =
    req.query.search || "";

    const sql =
    `SELECT * FROM vendors
    WHERE vendor_name
    LIKE ?`;

    db.query(
        sql,
        [`%${search}%`],
        (err, result) => {

            if (err) throw err;

            res.render(
                "vendors/index",
                {
                    vendors: result,
                    search
                }
            );
        }
    );
});


// Add Form
router.get("/new",
(req, res) => {

    res.render(
        "vendors/new"
    );
});


// Add Vendor
router.post("/new",
(req, res) => {

    const {
        vendor_name,
        category,
        gst_number,
        email,
        phone,
        address,
        status
    } = req.body;

    const sql =
    `INSERT INTO vendors
    (vendor_name,
    category,
    gst_number,
    email,
    phone,
    address,
    status)

    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [
            vendor_name,
            category,
            gst_number,
            email,
            phone,
            address,
            status
        ],
        (err) => {

            if (err) throw err;

            res.redirect("/vendors");
        }
    );
});


// Delete Vendor
router.get("/delete/:id",
(req, res) => {

    const { id } =
    req.params;

    const sql =
    "DELETE FROM vendors WHERE id=?";

    db.query(
        sql,
        [id],
        (err) => {

            if (err) throw err;

            res.redirect("/vendors");
        }
    );
});

module.exports = router;
