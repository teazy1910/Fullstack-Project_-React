const express = require("express");
const app = express();
const cors = require("cors");
let productsJson = require("../client/public/products.json");

app.use(cors());

app.get("/", (req, res) => res.json(productsJson));

app.options("*", cors());
// app.options("*", (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*").status(200).send("");
// });

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
