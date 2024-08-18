const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        requires:true
    },
    lastName:{
        type:String,
        requires:true
    },
    email:{
        type:String,
        requires:true
    },

    username:{
        type:String,
        requires:true
    },
    password:{
        type:String,
        requires:true
    }


});

module.exports = mongoose.model('User',UserSchema);