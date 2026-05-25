const express=require("express")
const { UserModel } = require("./models/user.model")
const router=express.Router()
const { TaskModel } = require("./models/task.model")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")


//ping route for uptime robot to check server is up or not
router.route("/ping").get((req,res)=>{
  res.status(200).send({message:"pong ✅ Backend is alive"});
});


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

    const userExists=await UserModel.findOne({email:email})

    if(userExists){
      throw new Error("Account Already Exists")
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user=await UserModel.create({
       name,
       email,
       password: hashedPassword, // store hashed password
    })

    const token=jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"7d"}
    )

   res.status(201).send({message:"User Registration Successful",token})

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

    const userExists=await UserModel.findOne({email:email})

    if(!userExists){
      throw new Error("Email Not Found")
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) throw new Error("Wrong Password Entered");

    const token=jwt.sign(
      {id:userExists._id},
      process.env.JWT_SECRET,
      {expiresIn:"7d"}
    )

   res.status(200).send({message:"Login Successful",token})

  } catch (error) {
    res.status(400).send({error:error.message})
  }
})

//middleware
router.use((req,res,next)=>{
 try{

   const authHeader=req.headers.authorization

   if(!authHeader){
      throw new Error("Login First")
   }

   const token=authHeader.split(" ")[1]

   const decoded=jwt.verify(
      token,
      process.env.JWT_SECRET
   )

   req.user=decoded.id

   next()

 }
 catch(error){
   res.status(401).send({
      error:"Invalid Token"
   })
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
      
      const {title,description,category,status,dueDate,priority}=req.body
     
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
      if(!priority){
        throw new Error("Priority is Required")
      }

      await TaskModel.create({
        title,
        description,
        category,
        status,
        dueDate,
        priority,
        user:req.user
      })

      res.status(201).send({message:"Task Added"})

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
    const task= await TaskModel.findOne({_id:req.params.id,user:req.user})
    
    if(!task){
      throw new Error("Task Not Found")
    }

    res.status(200).send(task)
    
  } catch (error) {
    res.status(400).json({error:error.message})
  }
})
.put(async(req,res)=>{
  try {
    
    const {title,description,category,status,dueDate,priority}=req.body
     
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
      if(!priority){
        throw new Error("Priority is Required")
      }

      const task = await TaskModel.findOneAndUpdate({_id:req.params.id,user:req.user},{
        title,
        description,
        category,
        status,
        dueDate,
        priority
      })

      if(!task){
        throw new Error("Task Not Found")
      }

      return res.status(200).send({message:"Task Updated"})
    
  } catch (error) {
    res.status(400).json({error:error.message})
  }
})
.delete(async(req,res)=>{
  try {
    const task = await TaskModel.findOneAndDelete({_id:req.params.id,user:req.user})
    if(!task){
      throw new Error("Task Not Found")
    }
    res.status(200).send({message: "Task Deleted"})
    
  } catch (error) {
    res.status(400).json({error:error.message})
  }
})



module.exports=router
