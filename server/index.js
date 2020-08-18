const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

//middleware
app.use(express.json());
app.use(cors());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../react-app/build")));

//routes
app.post("/api", (req, res) => {
  const { product, token } = req.body;

  return stripe.charges
    .create({
      amount: product.price * 100,
      currency: "inr",
      source: token.id,
      receipt_email: token.email,
      description: `${product.name}`,
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err));
});

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../react-app/build", "index.html"));
});

//listen
app.listen(process.env.PORT, "0.0.0.0", () => console.log(`LISTENING AT PORT ${process.env.PORT}`));
