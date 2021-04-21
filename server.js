const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const app = express();

app.options("/", cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const token = process.env.INSTAMOJO_TOKEN;
const key = process.env.INSTAMOJO_KEY;
const url = process.env.INSTAMOJO_URL;

app.post("/makepayment", function (req, response) {
  console.log(req.body);
  axios
    .post(
      url,
      {
        amount: req.body.amount,
        purpose: req.body.purpose,
        redirect_url: "http://localhost:4200/getDemo", //replace with actual url/route
        email: req.body.email,
        phone: req.body.mobile,
        buyer_name: req.body.name,
      },
      {
        headers: {
          "X-Api-Key": key,
          "X-Auth-token": token,
        },
      }
    )
    .then(
      function (res) {
        console.log("SUCC");
        response.send({ res: res.data });
      },
      function (err) {
        console.log("ERR");
        // response.status(500).send({ err: err.response.data });
      }
    );
});
app.get("/history", function (req, response, body) {
  axios
    .get(url, {
      headers: {
        "X-Api-Key": key,
        "X-Auth-token": token,
      },
    })
    .then(
      function (res) {
        console.log("*SUCC", res);
        response.send({ res: res.data });
      },
      function (err) {
        console.log("*ERR", err);
        response.status(500).send({ err: err.response.data });
      }
    );
});

app.get("/history/:id", function (req, response, body) {
  axios
    .get(url, {
      headers: {
        "X-Api-Key": key,
        "X-Auth-token": token,
      },
    })
    .then(
      function (res) {
        console.log("*SUCC", res);
        response.send({ res: res.data });
      },
      function (err) {
        console.log("*ERR", err);
        response.status(500).send({ err: err.response.data });
      }
    );
});

app.listen(6780, () => {
  console.log("API is running....");
});

module.exports = app;
