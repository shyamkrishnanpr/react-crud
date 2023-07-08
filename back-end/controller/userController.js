const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const  validateRegisterInput = require('../validations/register.js') 


const Signup = async(req,res,next)=>{
    try {
       


        const {name,email,password}= req.body
        console.log(name,email,password);
        const userData = await User.findOne({email:email})
        if(userData){
            return res.status(400).json({email:'Enter proper email address...'})
        }else{
            const hashPassword = await bcrypt.hash(password,10)
            const newUser = new User({
                name,
                email,
                password:hashPassword
            })          
            const savedUser = await newUser.save();
            return res.json(savedUser);         
        }   
    } catch (error) {
        console.log(error.message)       
    }
}


const Login = async(req,res,next)=>{
    try {
        const {email,password} = req.body
        User.findOne({email:email}).then((userData)=>{
            if(!userData){
                return res.status(404).json({ error: { email: 'User not found...' } });
            }else if(userData.isBlocked==true){
                return res.status(404).json({error: { email: 'Your account has been blocked...'}})
            }
            bcrypt.compare(password,userData.password).then((isMatch)=>{
                if (isMatch) {
                   const payload = {
                    id:userData.id,
                    name:userData.name,
                    
                   }
                   jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn:'1d'
                   },(err,token)=>{
                    if (err) {
                        console.log("there was some error in token ")
                    } else {
                        res.json({
                            id:userData.id,
                            name:userData.name,
                            email:userData.email,
                            imagePath:userData.imagePath,
                            token:`Bearer ${token}`
                        })                    
                    }
                   })             
                } else {
                    return res.status(400).json({password:'Incorrect password.....'})
                }
            })
        })     
    } catch (error) {
        console.log(error.message)
    }
}

const uploadImage = async(req,res,next)=>{
    try {
        const id = req.body
        const image = req.file
        await User.findOneAndUpdate({_id:id},{$set:{
            imagePath:image.filename 
        }}).then((result)=>{
            res.status(200).json({result})
        }).catch((err)=>{
            res.status(400).json({error:err.message})
        })
        
    } catch (error) {
        console.log(error)
    }
}









module.exports = {
    Signup,
    Login,
    uploadImage
}