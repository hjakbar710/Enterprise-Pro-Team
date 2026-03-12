const express = require("express");
const db = require("../db");

const router = express.Router();


router.get("/", (req, res) => {

const sql = `
SELECT
assets.id,
ratepayer,
address,
postcode,
latitude,
longitude,
rateable_value,
job_count,
categories.name AS category
FROM assets
LEFT JOIN categories
ON assets.category_id = categories.id
`;

db.query(sql, (err, results) => {

if (err) {
console.error(err);
res.status(500).send("Database error");
return;
}

res.json(results);

});

});


router.post("/", (req, res) => {

const {
ratepayer,
address,
postcode,
latitude,
longitude,
rateable_value
} = req.body;

const sql = `
INSERT INTO assets
(ratepayer,address,postcode,latitude,longitude,rateable_value)
VALUES (?,?,?,?,?,?)
`;

db.query(
sql,
[ratepayer,address,postcode,latitude,longitude,rateable_value],
(err, result) => {

if (err) {
console.error(err);
res.status(500).send("Insert failed");
return;
}

res.json({
message: "Asset added successfully",
id: result.insertId
});

}
);

});


module.exports = router;