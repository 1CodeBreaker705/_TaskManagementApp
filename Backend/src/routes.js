const express=require("express")
const { UserModel } = require("./models/user.model")
const router=express.Router()
const mongoose=require('mongoose')
const { TaskModel } = require("./models/task.model")

//register user
router.route('/register')
.post(async(req,res)=>{
  try {

    if(!req.body){
      throw new Error("Enter Payload")
    }
    
    const {name,email,password}=req.body
    
    if(!name){
      throw new Error("Enter Name")
    }
    if(!email){
      throw new Error("Enter Email Address")
    }
    if(!password){
      throw new Error("Enter Password")
    }

    const userExists=await UserModel.findOne({email})

    if(userExists){
      throw new Error("Account Already Exists")
    }

    const user=await UserModel.create({
       name,
       email,
       password
    })

   res.status(201).send({message:"User Registration Successful",token:user._id})

  } catch (error) {
    res.status(400).send({error:error.message})
  }
})

//login user
router.route('/login')
.post(async(req,res)=>{
  try {

    if(!req.body){
      throw new Error("Enter Payload")
    }
    
    const {email,password}=req.body
    
    if(!email){
      throw new Error("Enter Email Address")
    }
    if(!password){
      throw new Error("Enter Password")
    }

    const userExists=await UserModel.findOne({email})

    if(!userExists){
      throw new Error("Email Not Found")
    }

    if(userExists.password!==password){
      throw new Error("Wrong Password Entered")
    }

   res.status(200).send({message:"Login Successful",token:userExists._id})

  } catch (error) {
    res.status(400).send({error:error.message})
  }
})

router.use((req,res,next)=>{
  try {

   const token=req.headers['user']
   if(!token){
    throw new Error("User Profile Not Found Login First")
   }

   if(!mongoose.isValidObjectId(token)){
    throw new Error("Enter Valid UserId")
   }
   req.user=token
   
   next() 
  } catch (error) {
    res.status(400).json({error:error.message})
  }
})

//profile
router.route('/profile')
.get(async(req,res)=>{
  try {
   const user = await UserModel.findById(req.user).select("-password")
   return res.status(200).send(user)

  } catch (error) {
    res.status(400).send({error:error.message})
  }
})

//add task
router.route('/add-task')
.post(async(req,res)=>{
   try {
      if(!req.body){
        throw new Error("Enter Payload")
      }  
      
      const {title,description,category,status}=req.body
     
      if(!title){
        throw new Error("Title is Required")
      }
      if(!description){
        throw new Error("Description is Required")
      }
      if(!category){
        throw new Error("Category is Required")
      }
      if(!status){
        throw new Error("Status is Required")
      }

      await TaskModel.create({
        title,
        description,
        category,
        status,
        user:req.user
      })

      res.status(200).send({message:"Task Added"})

   } catch (error) {
     res.status(400).json({error:error.message})
   }
})

//fetch all tasks
router.route('/all-tasks')
.get(async(req,res)=>{
   try {

    const all_tasks=await TaskModel.find({user:req.user})

    res.status(200).send(all_tasks)
    
   } catch (error) {   
    res.status(400).json({error:error.message})
   }
})

//fetch,update,delete selected task
router.route('/task/:id')
.get(async(req,res)=>{
  try {
    const task= await TaskModel.findById(req.params.id)
    res.status(200).send(task)
    
  } catch (error) {
    res.status(400).json({error:error.message})
  }
})
.put(async(req,res)=>{
  try {
    const id=req.params.id

    const {title,description,category,status}=req.body
     
      if(!title){
        throw new Error("Title is Required")
      }
      if(!description){
        throw new Error("Description is Required")
      }
      if(!category){
        throw new Error("Category is Required")
      }
      if(!status){
        throw new Error("Status is Required")
      }

      await TaskModel.findByIdAndUpdate(id,{
        title,
        description,
        category,
        status
      })

      return res.status(200).send({message:"Task Updated"})
    
  } catch (error) {
    res.status(400).json({error:error.message})
  }
})
.delete(async(req,res)=>{
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id)
    if(!task){
      throw new Error("Task Not Found")
    }
    res.status(200).send({message: "Task Deleted"})
    
  } catch (error) {
    res.status(400).json({error:error.message})
  }
})


module.exports=router