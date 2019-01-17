const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const User = new Schema({
    userId: {type:String, required:true, unique:true},
    passWord: {type:String, required:true},
    ProjectList: [{type:Schema.Types.ObjectId, ref: 'Project'}]
});

User.statics.create = function(userId, passWord) {
    const value= bcrypt.hashSync(passWord,8);
    
    const users = new this({
        userId,
        passWord: value,
    });
    return users.save();
}

User.statics.findOneByuserId = function(userId) {
    return this.findOne({
        userId
    }).populate('ProjectList').exec();
}



User.methods.verify = function(passWord) {
    return  bcrypt.compareSync(passWord,this.passWord);
}




module.exports = mongoose.model('User', User);