const nodemailer = require("nodemailer");

const transporter =
nodemailer.createTransport({
    service:"gmail",

    auth:{
        user:"yourgmail@gmail.com",
        pass:"your_app_password"
    }
});

const sendInvoiceEmail =
async (
vendorEmail,
invoiceNumber,
amount
)=>{

    const mailOptions = {

        from:"yourgmail@gmail.com",

        to:vendorEmail,

        subject:
        `Invoice #${invoiceNumber}`,

        html:`
        <h2>
        Invoice Generated
        </h2>

        <p>
        Invoice Number:
        <b>${invoiceNumber}</b>
        </p>

        <p>
        Amount:
        <b>₹${amount}</b>
        </p>

        <p>
        Regards,<br>
        VendorBridge Team
        </p>
        `
    };

    await transporter
    .sendMail(mailOptions);
};

module.exports =
sendInvoiceEmail;
