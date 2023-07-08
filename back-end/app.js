const express = require ("express")
const dotenv = require("dotenv")
const mongoose = require ("mongoose")
const db = require('./config/config')
const app = express()
const cors = require ('cors')
const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')

dotenv.config();
db();
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

app.use('/',userRouter)
app.use('/admin',adminRouter)





const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
