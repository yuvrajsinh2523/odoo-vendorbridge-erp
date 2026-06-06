const express = require("express");
const router = express.Router();
const db = require("../models/db");


// Show approvals
router.get("/", (req, res) => {

    const sql = `
    SELECT approvals.*,
    quotations.price,
    vendors.vendor_name,
    rfqs.title AS rfq_title

    FROM approvals

    JOIN quotations
    ON approvals.quotation_id =
    quotations.id

    JOIN vendors
    ON quotations.vendor_id =
    vendors.id

    JOIN rfqs
    ON quotations.rfq_id =
    rfqs.id
    `;

    db.query(sql,
    (err, result) => {

        if (err) throw err;

        res.render(
            "approvals/index",
            {
                approvals: result
            }
        );
    });
});


// Add approval page
router.get("/new",
(req, res) => {

    const sql = `
    SELECT quotations.*,
    vendors.vendor_name,
    rfqs.title

    FROM quotations

    JOIN vendors
    ON quotations.vendor_id =
    vendors.id

    JOIN rfqs
    ON quotations.rfq_id =
    rfqs.id
    `;

    db.query(sql,
    (err, quotations) => {

        if (err) throw err;

        res.render(
            "approvals/new",
            {
                quotations
            }
        );
    });
});


// Create approval
router.post("/new",
(req, res) => {

    const {
        quotation_id,
        status,
        remarks
    } = req.body;

    const sql =
    `INSERT INTO approvals
    (
        quotation_id,
        status,
        remarks
    )

    VALUES
    (?, ?, ?)`;

    db.query(
        sql,
        [
            quotation_id,
            status,
            remarks
        ],
        (err) => {

            if (err) throw err;

            res.redirect(
                "/approvals"
            );
        }
    );
});

module.exports = router;
