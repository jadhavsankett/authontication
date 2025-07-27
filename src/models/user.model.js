const mongoose = require('mongoose');


const userschema = new mongoose.Schema({
    username:String,
    password:String
})

const usermodel = new mongoose.model('user',userschema)

module.exports = usermodel