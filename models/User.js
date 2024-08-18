const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    resetPwdToken: String,
    resetPwdExpires: Date


});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User',UserSchema);