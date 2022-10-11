const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const  jwt = require("jsonwebtoken")


exports.signup=async(req,res)=>{
    try{
        const hash = await bcrypt.hash(req.body.password,10) 
        const newUser = new User({...req.body,password:hash})
        newUser.save(err=>{
            if(err){
                res.status(501).json({status:501,msg:err.message})
            }else{
                res.status(200).json({status:200,msg:"user created successfull"})
            }
        })
    }catch(err){
        console.log(err.message)
    }
}

exports.signin=async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({email:email})
        if(!user){
            res.status(200).json({status:404,msg:"user not found"})
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            res.status(401).json({status:401,msg:"wrong credentials"})
        }else{
            //generate jwt accesstoken
            const accessToken = jwt.sign({id:user._id,email:user.email,user:user.isAdmin},process.env.JWT_SECRET,{expiresIn:"1h"}) 
            res.status(200).json({status:200,username:user.username,isAdmin:user.isAdmin,accessToken})
        }

    }catch(err){
        console.log(err.message)
    }
}

exports.updateUser=(req,res)=>{
    if(req.user.id === req.params.userId){
        User.UpdateOne({id:req.params.userId},
            {$set:{
                username: req.body.username,
                email: req.body.email,
                isAdmin : req.body.isAdmin
            }},
            (err)=>{
            if(err){
                res.status(501).json({status:501,msg:"sorry user deleted failed"})
            }else{
                res.status(200).json({status:200,msg:"user has been deleted"})
            }
        })
    }else{
        res.status(403).json({status:403,msg:"you are not allowed to deleted"})
    }
}

exports.deleteUser=(req,res)=>{
    if(req.user.id === req.params.userId){
        User.deleteOne({id:req.params.userId},(err)=>{
            if(err){
                res.status(501).json({status:501,msg:"sorry user deleted failed"})
            }else{
                res.status(200).json({status:200,msg:"user has been deleted"})
            }
        })
    }else{
        res.status(403).json({status:403,msg:"you are not allowed to deleted"})
    }
}
