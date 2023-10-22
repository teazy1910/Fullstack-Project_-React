const express = require("express");
const app = express();
const cors = require("cors");
let productsJson = require("../client/public/products.json");

app.use(cors());

app.get("/", (req, res) => res.json(productsJson));
app.use(express.static("../client/public/products"));

app.options("*", cors());

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
