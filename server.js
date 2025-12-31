const express = require("express");
const dotenv = require("dotenv")
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is running...")
})

app.use("/api/auth",require("./router/authroutes"))

app.use("/api/tasks", require("./router/taskRoute"))
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
