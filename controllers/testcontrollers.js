exports.testPost = (req,res) =>{
    res.json({
        message:"controllers data recieved",
        data:req.body,
    })
}