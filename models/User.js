const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },

        password:{
            type:String,
            required:true
        },

        role:{
            type:String,
            default:"user"
        },
    },
    {
        timestamps:true,
    }
);

const user = mongoose.model("User",UserSchema);

module.exports = user;