const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const pool = require("../db");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  const rows = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      rows.push(row);
    })
    .on("end", async () => {
      try {
        for (const row of rows) {
          const postcode = row.Postcode || row.postcode || null;
          const latitude = parseFloat(row.Latitude || row.latitude);
          const longitude = parseFloat(row.Longitude || row.longitude);
          const ward = row.Ward || row.ward || null;
          const council_area = "Bradford";

          if (!isNaN(latitude) && !isNaN(longitude)) {
            await pool.query(
              `INSERT INTO assets (postcode, latitude, longitude, ward, council_area)
               VALUES ($1, $2, $3, $4, $5)`,
              [postcode, latitude, longitude, ward, council_area]
            );
          }
        }

        fs.unlinkSync(req.file.path);
        res.json({ message: "CSV imported successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
});

module.exports = router;