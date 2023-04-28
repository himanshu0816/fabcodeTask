const express=require('express')
const app=express()
const cors=require('cors')
const bodyParser=require('body-parser')
require('dotenv').config()
require('./config/db')
const PORT=process.env.PORT;
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use('/',require('./routes/route'))
app.set('view engine', 'ejs');
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})