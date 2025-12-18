require("dotenv").config();
const express = require("express")

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("TaskFlow Backend Running: Welcome to Taskflow server")
})

app.post("/test",(req,res)=>{
    res.json({
        recievedData:req.body,
    })
})
app.listen(PORT,()=>{
    console.log("http://localhost:5000")
})