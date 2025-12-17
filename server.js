const express = require("express")

const app = express();

const PORT = 5000;

app.get("/",(req,res)=>{
    res.send("TaskFlow Backend Running")
})

app.listen(PORT,()=>{
    console.log("http://localhost:5000")
})