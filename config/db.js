const mongoose=require('mongoose')
require('dotenv').config()
const URL=process.env.DB_URL;
const DB_Conn=mongoose.connect(URL)
.then(()=>{
    console.log('DataBase Connected SuccessFully!!!!')
})
.catch((err)=>{
    console.log("Error",err)
})

module.exports=DB_Conn;