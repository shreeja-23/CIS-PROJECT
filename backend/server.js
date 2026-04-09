const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running on AWS 🚀");
});

app.post("/api/test", async (req, res) => {
  const { url, method } = req.body;

  try {
    const response = await axios({ url, method });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "API failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});