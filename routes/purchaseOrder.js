const express = require("express");
const router = express.Router();
const db = require("../models/db");


// Show Purchase Orders
router.get("/", (req, res) => {

    const sql = `
    SELECT purchase_orders.*,
    vendors.vendor_name,
    rfqs.title AS rfq_title

    FROM purchase_orders

    JOIN quotations
    ON purchase_orders.quotation_id =
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
            "purchaseOrders/index",
            {
                orders: result
            }
        );
    });
});


// New PO Form
router.get("/new",
(req, res) => {

    const sql = `
    SELECT approvals.*,
    quotations.price,
    vendors.vendor_name,
    rfqs.title

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

    WHERE approvals.status =
    'Approved'
    `;

    db.query(sql,
    (err, approvals) => {

        if (err) throw err;

        res.render(
            "purchaseOrders/new",
            {
                approvals
            }
        );
    });
});


// Create PO
router.post("/new",
(req, res) => {

    const {
        quotation_id,
        status
    } = req.body;

    const poNumber =
    "PO-" +
    Math.floor(
        1000 +
        Math.random() * 9000
    );

    const sql =
    `INSERT INTO purchase_orders
    (
        po_number,
        quotation_id,
        status
    )

    VALUES (?, ?, ?)`;

    db.query(
        sql,
        [
            poNumber,
            quotation_id,
            status
        ],
        (err) => {

            if (err) throw err;

            res.redirect(
                "/purchase-orders"
            );
        }
    );
});

module.exports = router;
