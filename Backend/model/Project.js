const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Project = new Schema({
    content: Schema.Types.Mixed,
    creator:{type:Schema.Types.ObjectId, ref:'User'},
    createDate: {type: Date, default: new Date()},
    stars : [String]
});


Project.statics.findProject = function(projectId){
    return this.findById(projectId).populate('creator').exec();
}

Project.statics.create = function(content,creator,dateValue) {
    const createDate = new Date(dateValue);
    const Projectitem = new this({
        content,
        creator,
        createDate
    });
    return Projectitem.save();
}

Project.statics.getList = function(type,ObjectId){
    let ObjId = new mongoose.Types.ObjectId(ObjectId);
    if(type === 'new') {
        return this.find({_id : {$gt: ObjId}}).sort({_id: -1}).limit(6).exec();
    } else {
        return this.find({_id: {$lt: ObjId}}).sort({_id: -1}).limit(6).exec();
    }
}

Project.statics.starsModify = function(ProjectId) {
    return this.findById(ProjectId).exec();
}



module.exports = mongoose.model('Project',Project);