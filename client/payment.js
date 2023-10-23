const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// ***********************************************************************
// Order entgegen nehmen und token für payment oder zubereitung generieren
// ***********************************************************************
function progressToken(prodId, config, nowMs) {
  if (nowMs === undefined) {
    nowMs = Date.now();
  }
  const finishedAt = nowMs + 30 * 1000;
  const expiresAt = finishedAt + 5 * 60 * 1000;
  const result = {
    prodId: prodId,
    startedAt: nowMs,
    finishedAt: finishedAt,
    expiresAt: expiresAt,
    config: config,
  };
  const token = Buffer.from(JSON.stringify(result)).toString("base64");
  return token;
}

function paymentToken(paymentResult, prodId, config) {
  const nowMs = Date.now();
  const finishedAt = nowMs + 30 * 1000;
  const expiresAt = finishedAt + 5 * 60 * 1000;
  const result = {
    startedAt: nowMs,
    finishedAt: finishedAt,
    expiresAt: expiresAt,
    paymentResult: paymentResult,
    prodId: prodId,
    config: config,
  };
  const token = Buffer.from(JSON.stringify(result)).toString("base64");
  return token;
}

// With Payment:
// curl -X POST -H 'Content-Type: application/json' 'http://localhost:3000/purchase/coffee' -d '{"price": 350, "paymentResult": "SUCCESS", "config": {"sugar": 10}}'
// Without Payment:
// curl -X POST -H 'Content-Type: application/json' 'http://localhost:3000/purchase/coffee' -d '{"config": {"milk": 3}}'
app.post("/purchase/:prodId", (req, res) => {
  // req.body = {
  //   price: 350, // optional
  //   paymentResult: 'success' // optional (success/failed/timeout/error)
  //   config: {
  //     sugar: 5,
  //     milk: 0
  //   }
  // }
  const prodId = req.params.prodId;
  const rBody = req.body;
  console.log(rBody);
  const config = rBody.config === undefined ? {} : rBody.config;
  if (rBody.price === undefined || rBody.price <= 0) {
    res.json({ progressToken: progressToken(prodId, config) });
  } else {
    const paymentResult =
      rBody.paymentResult === undefined ? "success" : rBody.paymentResult;
    res.json({ paymentToken: paymentToken(paymentResult, prodId, config) });
  }
});

// ****************************
// Zubereitungs-Status abfragen
// ****************************
// curl -X GET 'http://localhost:3000/purchase/TOKEN'
app.get("/purchase/:progressToken", (req, res) => {
  let token;
  try {
    token = JSON.parse(Buffer.from(req.params.progressToken, "base64"));
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
    return;
  }

  const nowMs = Date.now();
  let status_;
  let percentage;
  if (nowMs < token.finishedAt) {
    status_ = "IN_PROGRESS";
    percentage = Math.floor(
      ((nowMs - token.startedAt) / (token.finishedAt - token.startedAt)) * 100
    );
  } else {
    if (nowMs < token.expiresAt) {
      status_ = "DONE";
      percentage = 100;
    } else {
      res.status(404).json({
        status: "NOT_FOUND",
      });
      return;
    }
  }

  res.json({
    prodId: token.prodId,
    status: status_,
    percentage: percentage,
    config: token.config,
  });
});

// ***********************
// Payment Status abfragen
// ***********************
// curl -X GET 'http://localhost:3000/payment/TOKEN'
app.get("/payment/:paymentToken", (req, res) => {
  let token;
  try {
    token = JSON.parse(Buffer.from(req.params.paymentToken, "base64"));
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      message: error.message,
    });
    return;
  }

  const nowMs = Date.now();
  let status_;
  let secondsRemaining;
  let progressToken_ = "";
  if (nowMs < token.finishedAt) {
    status_ = "PENDING";
    secondsRemaining = Math.floor((token.finishedAt - nowMs) / 1000);
  } else {
    if (nowMs < token.expiresAt) {
      status_ = token.paymentResult;
      if (status_ === "SUCCESS" || status_ === "success") {
        progressToken_ = progressToken(
          token.prodId,
          token.config,
          token.finishedAt
        );
      }
    } else {
      res.status(404).json({
        status: "NOT_FOUND",
      });
      return;
    }
  }

  res.json({
    status: status_,
    secondsRemaining: secondsRemaining,
    progressToken: progressToken_,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
