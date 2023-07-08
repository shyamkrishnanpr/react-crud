const mongoose = require('mongoose')

const db = async()=>{
    try {
        mongoose.set('strictQuery',true) 
    const db = await
         mongoose.connect(process.env.MONG_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
         })
        .then(()=>{
            console.log("Database connected successfully")
         })
         

    } catch (error) {
        
    }
}

module.exports = db;

