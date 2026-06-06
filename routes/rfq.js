const express = require("express");
const router = express.Router();
const db = require("../models/db");


// Show all RFQs
router.get("/", (req, res) => {

    const sql = `
    SELECT rfqs.*,
    vendors.vendor_name

    FROM rfqs

    JOIN vendors
    ON rfqs.vendor_id =
    vendors.id
    `;

    db.query(sql,
    (err, result) => {

        if (err) throw err;

        res.render(
            "rfq/index",
            {
                rfqs: result
            }
        );
    });
});


// RFQ Form
router.get("/new",
(req, res) => {

    const sql =
    "SELECT * FROM vendors";

    db.query(sql,
    (err, vendors) => {

        if (err) throw err;

        res.render(
            "rfq/new",
            {
                vendors
            }
        );
    });
});


// Create RFQ
router.post("/new",
(req, res) => {

    const {
        title,
        product_name,
        quantity,
        deadline,
        description,
        vendor_id
    } = req.body;

    const sql =
    `INSERT INTO rfqs
    (
        title,
        product_name,
        quantity,
        deadline,
        description,
        vendor_id
    )

    VALUES
    (?, ?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [
            title,
            product_name,
            quantity,
            deadline,
            description,
            vendor_id
        ],
        (err) => {

            if (err) throw err;

            res.redirect("/rfq");
        }
    );
});


module.exports = router;
