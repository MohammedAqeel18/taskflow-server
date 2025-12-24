const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registeruser  = async(req,res)=>{
    try{
        const {email,name,password} = req.body;

        if(!email||!name||!password){
            return res.status(400).json({message:"All fields are required"})
        }

       const existingUser = await User.findOne({email});
       if(existingUser){
        return res.status(400).json({message:"User already exists" })
       }

      const  salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);

      const user = await User.create({
        name,
        email,
        password:hashedPassword,
      })
       res.status(201).json({
        message:"User registered successfully",
        userId: user._id,
       })


    }catch(error){
        res.status(500).json({message:"Server Error"})
    }
}

exports.loginuser  = async(req,res) => {

    try{
        const {email,password} = req.body 

        if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid credentials"})
    }

    //Compare passowrd

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"})
    }


    //Create JWT token

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );
    res.json({
        message:"Login successful",
        userId: user._id,
        token,
    })
    }catch(error){
        res.status(500).json({message:"Server Error"})
    }
    
} 
