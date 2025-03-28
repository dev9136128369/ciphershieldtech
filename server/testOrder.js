const axios = require("axios");
require("dotenv").config(); // Make sure dotenv is loaded

const headers = {
  "Content-Type": "application/json",
  "x-client-id": process.env.CLIENT_ID,  
  "x-client-secret": process.env.CLIENT_SECRET,
  "x-api-version": "2022-09-01",
};

const requestBody = {
  order_amount: 100,
  order_currency: "INR",
  customer_details: {
    customer_id: "12345",
    customer_email: "test@example.com",
    customer_phone: "9876543210",
  },
};

axios
  .post("https://api.cashfree.com/pg/orders", requestBody, { headers }) // Use correct URL
  .then((res) => console.log("✅ Order Created:", res.data))
  .catch((err) => console.error("❌ Error in PGCreateOrder:", err.response ? err.response.data : err.message));
