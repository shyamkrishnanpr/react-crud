const jwt = require('jsonwebtoken')
const User = require('../models/userSchema');




const Login = (req,res,next)=>{
    try{    
        const {email,password}=req.body    
    if(email==process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASSWORD){
        const payload = {
            email: email,
        };
        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn: 3600
        },(err,token)=>{
            if (err) console.error("There is some error in token", err);
            else{
                res.json({
                    success:true,
                    email: email,
                    token: `Bearer ${token}`,
                })
            }
        }
        )
    
    
    }else{
    
        error.password = 'Invalid Email or Password ! Please try again.';
                return res.status(400).json(errors);
    
     }
    
    
        }catch(error){
    
            console.log(error.message);
        }
}


const getUser = async(req,res,next)=>{
    try {
        const users = await User.find()
        res.json({
            status:true,
            AllUsers:users
        })
    } catch (error) {
        console.log(error)
    }
}

const blockUser = async(req,res,next)=>{
    try {
        const id = req.params.id
        await User.updateOne({_id:id},{$set:{isBlocked:true}})
        const isBlocked= await User.findOne({_id:id})
        return res.json(isBlocked.isBlocked)
        
    } catch (error) {
        console.log(error)
    }
}

const unBlockUser = async(req,res,next)=>{
    try {
        const id = req.params.id
        await User.updateOne({_id:id},{$set:{isBlocked:false}})
        const isUnBlocked= await User.findOne({_id:id})
       return res.json(isUnBlocked.isBlocked)
        
    } catch (error) {
        console.log(error)
    }
}

const editUser= async(req,res,next)=>{
    try {
        const {name,userId} = req.body

        User.findOne({_id:userId}).then((userData)=>{
            if (userData.name===name) {
                  console.log("Username already exists")
                  return res.status(400).json({name:'username already exists'})
            } else {
                User.findOneAndUpdate({_id:userId},{name:name}).then((updatedUser)=>{
                    res.json({
                        usernameedited:updatedUser
                    })
                })
                
            }
        })

        
    } catch (error) {
        console.log(error)
    }
}




module.exports={
    Login,
    getUser,
    blockUser,
    unBlockUser,
    editUser
}