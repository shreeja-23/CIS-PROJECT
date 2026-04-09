const express = require("express");
const axios = require("axios");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const router = express.Router();

const adapter = new JSONFile("./db.json");
const db = new Low(adapter, { history: [] });

const THRESHOLD = 1000;

// ✅ GET ROUTE (for browser test)
router.get("/test", (req, res) => {
  res.json({
    message: "Route is working ✅",
    instruction: "Use POST method to test API"
  });
});

// ✅ POST ROUTE (main logic)
router.post("/test", async (req, res) => {
  const { url, method, body } = req.body;

  const start = Date.now();

  try {
    const response = await axios({
      url,
      method,
      data: body
    });

    const responseTime = Date.now() - start;

    await db.read();

    db.data.history.push({
      url,
      method,
      status: response.status,
      responseTime,
      createdAt: new Date()
    });

    await db.write();

    // 🔥 limit data (clean output)
    const limitedData = Array.isArray(response.data)
      ? response.data.slice(0, 3)
      : response.data;

    res.json({
      status: response.status,
      responseTime,
      previewItems: limitedData.length,
      totalItems: Array.isArray(response.data) ? response.data.length : 1,
      data: limitedData,
      slow: responseTime > THRESHOLD
    });

  } catch (error) {
    const responseTime = Date.now() - start;

    await db.read();

    db.data.history.push({
      url,
      method,
      status: 500,
      responseTime,
      createdAt: new Date()
    });

    await db.write();

    res.status(500).json({
      error: error.message,
      responseTime
    });
  }
});

// ✅ HISTORY ROUTE
router.get("/history", async (req, res) => {
  await db.read();

  const clean = db.data.history.map(item => ({
    API: item.url,
    Method: item.method,
    Status: item.status,
    Time: item.responseTime + " ms"
  }));

  res.json(clean);
});

module.exports = router;