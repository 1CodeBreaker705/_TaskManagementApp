const mongoose=require('mongoose')
const schema=new mongoose.Schema({
     title:{
      type:String,
      required:true
     },
     description:{
      type:String,
      required:true
     },
     category:{
      type:String,
      required:true
     },
     status:{
      type:String,
      required:true
     },
     dueDate: {    // optional
     type: Date,
     required: false, 
     },
     createdAt: {
     type: Date,
     default: Date.now, // automatically set on creation
     },
     priority:{
      type:String,
      required:true
     },
     user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user',
      required:true
     }
})

const model=mongoose.model('task',schema)

exports.TaskModel=model