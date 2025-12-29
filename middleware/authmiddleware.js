const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const protect = async (req,res, next) => {
    try {
        // get token from header

        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({message:"Not authorized , no Token"})
        }

        const token = authHeader.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //attaching user to request
        req.user = await User.findById(decoded.userId).select("-password");

        next();
    } catch (error){
        return res.status(401).json({message:"Not authorized"})
    }
}

module.exports = protect;