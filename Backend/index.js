require("dotenv").config({ path: ".env" });
require("colors")
const app=require("./src/app")
const {ConnectDB}=require("./src/db.config")
const port=process.env.PORT || 1234

ConnectDB()

app.listen(port,()=>{
  console.log(`the app is listening at http://localhost:${port}`.bgBlue)
})