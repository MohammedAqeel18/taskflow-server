require("dotenv").config();
const express = require("express")

const app = express();

app.use(express.json());

const testRoutes = require("./router/testroutes")
app.use("/api" ,testRoutes)

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log("http://localhost:5000")
})