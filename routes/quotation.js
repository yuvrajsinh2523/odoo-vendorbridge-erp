const express = require("express");
const router = express.Router();
const db = require("../models/db");


// Show quotations
router.get("/", (req, res) => {

    const sql = `
    SELECT quotations.*,
    rfqs.title AS rfq_title,
    vendors.vendor_name

    FROM quotations

    JOIN rfqs
    ON quotations.rfq_id =
    rfqs.id

    JOIN vendors
    ON quotations.vendor_id =
    vendors.id
    `;

    db.query(sql,
    (err, result) => {

        if (err) throw err;

        res.render(
            "quotations/index",
            {
                quotations: result
            }
        );
    });
});


// Form Page
router.get("/new",
(req, res) => {

    const rfqSql =
    "SELECT * FROM rfqs";

    const vendorSql =
    "SELECT * FROM vendors";

    db.query(rfqSql,
    (err, rfqs) => {

        if (err) throw err;

        db.query(vendorSql,
        (err, vendors) => {

            if (err) throw err;

            res.render(
                "quotations/new",
                {
                    rfqs,
                    vendors
                }
            );
        });
    });
});


// Add quotation
router.post("/new",
(req, res) => {

    const {
        rfq_id,
        vendor_id,
        price,
        delivery_days,
        notes,
        status
    } = req.body;

    const sql =
    `INSERT INTO quotations
    (
        rfq_id,
        vendor_id,
        price,
        delivery_days,
        notes,
        status
    )

    VALUES
    (?, ?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [
            rfq_id,
            vendor_id,
            price,
            delivery_days,
            notes,
            status
        ],
        (err) => {

            if (err) throw err;

            res.redirect("/quotations");
        }
    );
});

module.exports = router;
