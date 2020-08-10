const cors = require("cors");
const express = require("express");

const stripe = require("stripe")(
  "sk_test_51HCmJtFqMX5kB68LtbbKhXmi0r1Vk88zSrTGyhMbm3xDiUbj4AQYq9BoYAzh6li73nZ5C73reigjfLs4pR5qy1oF00EHSblZVo"
);

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("Stripe checkout server for MaxBank");
});

app.post("/payment", (req, res) => {
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

//listen
app.listen(8282, () => console.log("LISTENING AT PORT 8282"));
