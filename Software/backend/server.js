const express = require("express");
const cors = require("cors");

const assetsRoute = require("./routes/assets");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Bradford Asset Map server running")
})

app.use("/assets", assetsRoute);

app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})