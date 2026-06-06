const express = require("express");
const router = express.Router();
const db = require("../models/db");

const sendInvoiceEmail =
require(
"../services/emailService"
);


// Show invoices
router.get("/", (req, res) => {

    const sql = `
    SELECT invoices.*,
    purchase_orders.po_number,
    vendors.vendor_name

    FROM invoices

    JOIN purchase_orders
    ON invoices.po_id =
    purchase_orders.id

    JOIN quotations
    ON purchase_orders.quotation_id =
    quotations.id

    JOIN vendors
    ON quotations.vendor_id =
    vendors.id
    `;

    db.query(sql,
    (err, result) => {

        if (err) throw err;

        res.render(
            "invoices/index",
            {
                invoices: result
            }
        );
    });
});


// New invoice form
router.get("/new",
(req, res) => {

    const sql = `
    SELECT purchase_orders.*,
    rfqs.title,
    quotations.price

    FROM purchase_orders

    JOIN quotations
    ON purchase_orders.quotation_id =
    quotations.id

    JOIN rfqs
    ON quotations.rfq_id =
    rfqs.id
    `;

    db.query(sql,
    (err, orders) => {

        if (err) throw err;

        res.render(
            "invoices/new",
            {
                orders
            }
        );
    });
});


// Generate invoice
router.post("/new",
(req, res) => {

   let {
    po_id,
    tax,
    total_amount,
    status
} = req.body;

tax = tax || 0;
total_amount =
total_amount || 0;

    const invoiceNumber =
    "INV-" +
    Math.floor(
        1000 +
        Math.random() * 9000
    );

    const sql =
    `INSERT INTO invoices
    (
        invoice_number,
        po_id,
        tax,
        total_amount,
        status
    )

    VALUES (?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [
            invoiceNumber,
            po_id,
            tax,
            total_amount,
            status
        ],
        (err) => {

            if (err) throw err;

            res.redirect(
                "/invoices"
            );
        }
    );
});


// Print invoice page
router.get("/print/:id",
(req, res) => {

    const { id } =
    req.params;

    const sql = `
    SELECT invoices.*,
    purchase_orders.po_number,
    vendors.vendor_name

    FROM invoices

    JOIN purchase_orders
    ON invoices.po_id =
    purchase_orders.id

    JOIN quotations
    ON purchase_orders.quotation_id =
    quotations.id

    JOIN vendors
    ON quotations.vendor_id =
    vendors.id

    WHERE invoices.id = ?
    `;

    db.query(
        sql,
        [id],
        (err, result) => {

            if (err) throw err;

            res.render(
                "invoices/print",
                {
                    invoice:
                    result[0]
                }
            );
        }
    );
});



router.post(
"/send/:id",
(req,res)=>{

    const id =
    req.params.id;

    const sql = `
    SELECT *
    FROM invoices
    WHERE id = ?
    `;

    db.query(
    sql,
    [id],
    async(err,result)=>{

        if(err){
            console.log(err);
            return res.send(
            err.sqlMessage
            );
        }

        const invoice =
        result[0];

        try{

            await
            sendInvoiceEmail(
                invoice.email,
                invoice.id,
                invoice.amount
            );

            res.send(
            "Email Sent Successfully"
            );

        }catch(error){

            console.log(error);

            res.send(
            error.message
            );
        }
    });
});

module.exports = router;
