//Imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoute = require('./Routes/auth')
const eventRoute = require('./Routes/eventRoute')
const dotenv = require('dotenv')

//App config
const app = express()
dotenv.config()
port = process.env.PORT || 8000

//Middleware
app.use(express.json())
app.use(cors())

//Db config
const connection_url = "mongodb+srv://adityadabhi:adityadabhi@cluster0.ltbed.mongodb.net/playerfinderdb?retryWrites=true&w=majority"
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>console.log('DB connected'))

//API routes
app.get('/',(req,res)=>{
    res.status(200).send('Hello World')
})

app.use('/api/users', authRoute)
app.use('/api/events',eventRoute)


//Listener
app.listen(port,()=> console.log(`Server is running on the port ${port}`))