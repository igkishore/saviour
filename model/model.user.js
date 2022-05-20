const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name : {
        type : String,
        required:true
    },
    age : {
        type: String,
        required:true
    },
    mailid : {
        type: String,
        required:true
    },
    contact : {
        type: Number,
        required:true
    },
    gender : {
        type: String,
        required:true
    },
    location : {
        type: Number,
        required:true
    },
    password:
    {
      type:String,
      required:true,
    }
},{timestamps:true});
const user = mongoose.model('user',userSchema);
module.exports = user;