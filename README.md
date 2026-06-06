# 🏢 VendorBridge ERP

VendorBridge ERP is an end-to-end **Procurement & Vendor Management System** inspired by Odoo. It digitizes the complete procurement lifecycle from vendor onboarding to invoice generation.

## 🚀 Problem Statement

Traditional procurement systems rely heavily on:

* Manual vendor tracking
* Emails & spreadsheets
* Delayed approvals
* Manual invoice handling
* Lack of centralized workflow

VendorBridge ERP solves these issues by providing a centralized procurement platform.

---

# ✨ Features

## 🔐 Authentication & Authorization

* Login & Signup
* Session Authentication
* Secure Protected Routes
* Role-Based Access Control

### Roles Supported

* **Admin** → Full Access
* **Procurement Officer** → Vendor, RFQ & Quotation Access
* **Manager** → Approval, Purchase Orders & Invoice Access
* **Vendor** → Quotation Access

---

## 👨‍💼 Vendor Management

Manage vendor details in one place.

### Features

* Add Vendor
* View Vendor
* Delete Vendor
* Search Vendor
* Vendor Status Tracking

### Vendor Information

* Vendor Name
* Category
* GST Number
* Email
* Phone
* Address
* Status

---

## 📄 RFQ (Request For Quotation)

Procurement officers can create RFQs for vendors.

### Features

* Create RFQ
* Assign Vendor
* Product Tracking
* Quantity Management
* Deadline Management

### RFQ Details

* Product Name
* Quantity
* Vendor Assignment
* Description
* Deadline

---

## 💰 Quotation Management

Vendors can submit quotations for RFQs.

### Features

* Submit Quotation
* Price Tracking
* Delivery Timeline
* Notes & Remarks
* Status Tracking

---

## ✅ Approval Workflow

Managers review procurement quotations.

### Features

* Approve Quotation
* Reject Quotation
* Add Remarks
* Approval Tracking

---

## 📦 Purchase Order Generation

Approved quotations automatically generate Purchase Orders.

### Features

* Auto PO Number Generation
* Procurement Tracking
* Order Status

---

## 🧾 Invoice Management

Generate invoices for approved purchase orders.

### Features

* Auto Invoice Number
* Tax Calculation
* Total Amount Calculation
* Payment Status
* Print Invoice

---

## 📊 Dashboard Analytics

Real-time dashboard insights.

### Dashboard Metrics

* Total Vendors
* Total RFQs
* Pending Approvals
* Total Invoices

---

# 🔄 Procurement Workflow

Vendor Management
⬇
RFQ Creation
⬇
Quotation Submission
⬇
Approval Workflow
⬇
Purchase Order Generation
⬇
Invoice Generation
⬇
Invoice Printing

---

# 🛠️ Tech Stack

## Frontend

* EJS
* EJS-Mate
* Bootstrap 5
* HTML5
* CSS3

## Backend

* Node.js
* Express.js

## Database

* MySQL

## Authentication

* Express Session

## Other Tools

* Method Override
* EJS Layout Engine

---

# 📂 Project Structure

```txt
vendorbridge-procurement-erp/

│── public/
│   ├── css/
│   ├── js/
│   └── images/

│── views/
│   ├── layouts/
│   ├── partials/
│   ├── auth/
│   ├── dashboard/
│   ├── vendors/
│   ├── rfq/
│   ├── quotations/
│   ├── approvals/
│   ├── purchaseOrders/
│   └── invoices/

│── routes/
│── middleware/
│── models/

│── app.js
│── package.json
│── README.md
```

---

# ⚙️ Installation Guide

## 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

## 2. Navigate to Project

```bash
cd vendorbridge-procurement-erp
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Setup Database

Create MySQL Database:

```sql
CREATE DATABASE vendorbridge_erp;
```

Import tables.

## 5. Run Project

```bash
npx nodemon app.js
```

OR

```bash
node app.js
```

Open:

```txt
http://localhost:8080
```

---

# 🔒 Security Features

* Session Authentication
* Protected Routes
* Role-Based Access
* Unauthorized Access Restriction

---

# 📸 Screenshots

Add screenshots here:

* Login Page
* Dashboard
* Vendor Management
* RFQ Module
* Quotation Module
* Approval Workflow
* Purchase Orders
* Invoice Generation

---

# 👨‍💻 Team Members

### Yuvrajsinh Jadeja

Backend Developer

### Urmit Modha

Frontend/UI Support

---

# 🔮 Future Scope

* Email Notifications
* PDF Invoice Download
* Vendor Comparison Analytics
* Real-Time Notifications
* Advanced Reporting
* Multi-Vendor RFQ Comparison

---

# 🎯 Conclusion

VendorBridge ERP provides a complete procurement lifecycle management system inspired by Odoo. It improves procurement efficiency by digitizing vendor management, RFQ handling, quotation approval, purchase order generation, and invoice management through a centralized role-based platform.
