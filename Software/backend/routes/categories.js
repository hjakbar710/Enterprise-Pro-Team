const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM categories ORDER BY name");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;

  const result = await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );

  res.json(result.rows[0]);
});

module.exports = router;