const express = require("express")

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("TaskFlow Backend Running: Welcome to Taskflow server")
})

app.listen(PORT,()=>{
    console.log("http://localhost:5000")
})