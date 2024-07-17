const mongoose=require('mongoose');


const taskSchema =mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    status:{
        type:String,
        enum:['pending','completed'],
        default:'pending'
    },
    completedAt:Date,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel',
        required:true
    }
},{
    versionKey:false
})


const taskModel =mongoose.model('Task',taskSchema);

module.exports ={
    taskModel
}