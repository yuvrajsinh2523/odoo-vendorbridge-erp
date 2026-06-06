const express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const session = require("express-session");
const methodOverride = require("method-override");

const db = require("./models/db");
const isLoggedIn = require("./middleware/authMiddleware");

const authRoutes = require("./routes/auth");
const vendorRoutes = require("./routes/vendor");
const rfqRoutes = require("./routes/rfq");
const quotationRoutes = require("./routes/quotation");
const approvalRoutes = require("./routes/approval");
const purchaseOrderRoutes = require("./routes/purchaseOrder");
const invoiceRoutes = require("./routes/invoice");
const roleAccess =
require(
"./middleware/roleMiddleware"
);

const app = express();
const PORT = 8080;

// ======================
// EJS Setup
// ======================
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ======================
// Middleware
// ======================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ======================
// Session Middleware
// IMPORTANT: BEFORE ROUTES
// ======================
app.use(
  session({
    secret: "vendorbridge_secret",
    resave: false,
    saveUninitialized: false,
  })
);


app.use((req, res, next) => {

    res.locals.user =
    req.session.user || null;

    next();
});
// ======================
// Routes
// ======================

// Auth Routes
app.use("/", authRoutes);

// Vendors
app.use(
"/vendors",
isLoggedIn,
roleAccess([
"Admin",
"Procurement Officer"
]),
vendorRoutes
);

// Protected Routes
// RFQ
app.use(
"/rfq",
isLoggedIn,
roleAccess([
"Admin",
"Procurement Officer"
]),
rfqRoutes
);


// Quotations
app.use(
"/quotations",
isLoggedIn,
roleAccess([
"Admin",
"Vendor",
"Procurement Officer"
]),
quotationRoutes
);


// Approvals
app.use(
"/approvals",
isLoggedIn,
roleAccess([
"Admin",
"Manager"
]),
approvalRoutes
);


// Purchase Orders
app.use(
"/purchase-orders",
isLoggedIn,
roleAccess([
"Admin",
"Manager"
]),
purchaseOrderRoutes
);

// Invoices
app.use(
"/invoices",
isLoggedIn,
roleAccess([
"Admin",
"Manager"
]),
invoiceRoutes
);

// ======================
// Home Route
// ======================
app.get("/", (req, res) => {
  res.redirect("/login");
});

// ======================
// Dashboard Route
// ======================
app.get(
  "/dashboard",
  isLoggedIn,
  (req, res) => {
    const vendorSql =
      "SELECT COUNT(*) AS totalVendors FROM vendors";

    const rfqSql =
      "SELECT COUNT(*) AS totalRFQ FROM rfqs";

    const approvalSql = `
      SELECT COUNT(*) AS pendingApprovals
      FROM approvals
      WHERE status='Pending'
    `;

    const invoiceSql =
      "SELECT COUNT(*) AS totalInvoices FROM invoices";

    db.query(vendorSql, (err, vendors) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Database Error");
      }

      db.query(rfqSql, (err, rfqs) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Database Error");
        }

        db.query(approvalSql, (err, approvals) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Database Error");
          }

          db.query(invoiceSql, (err, invoices) => {
            if (err) {
              console.error(err);
              return res.status(500).send("Database Error");
            }

            res.render("dashboard/index", {
              user: req.session.user,
              vendors: vendors[0].totalVendors,
              rfqs: rfqs[0].totalRFQ,
              approvals:
                approvals[0].pendingApprovals,
              invoices:
                invoices[0].totalInvoices,
            });
          });
        });
      });
    });
  }
);


app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
