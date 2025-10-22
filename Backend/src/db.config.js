const { default: mongoose } = require("mongoose")

exports.ConnectDB=async()=>{
      try {
        const db=await mongoose.connect(process.env.MONGO_URI)
        console.log(`the database is connected with ${db.connection.host}`.bgRed)
      } catch (error) {
        await mongoose.disconnect()
        process.exit(1) 
      }
}