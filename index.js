require('dotenv').config();

const express= require ("express");
const bodyParser= require ('body-parser')
const mongoose= require ("mongoose");
const routes=require('./routes/routes')
const app= express()



const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const databse=mongoose.connection
databse.on('error',(error)=>{
          console.log(error)
})
databse.once('connected',()=>{
          console.log("Databe Connected Successfully")
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api',routes)

app.use(express.json());


app.listen(3000,()=>{
          console.log(`Server started at ${3000}`)
})