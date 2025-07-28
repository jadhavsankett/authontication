const express = require('express')
const usermodel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const router = express.Router()


router.post('/register',async(req,res)=>{    //this code is register user 
    const {username , password} = req.body

    const user = await usermodel.create({
        username,
        password
    })

//this step the create the token process

    const token = jwt.sign({
      id:user._id,    // every user quien identify fro use id 
      
    },process.env.JWT_SECRET)   //one set the secret not the change his alway this secret 


    res.status(201).json({
        Message:'register user succfully',
        user,
        token
    })
})

router.post('/login',async(req,res)=>{      //comple the login user and corrcet and invalid paddword and username logic 
    const {username , password} = req.body


    const user = await usermodel.findOne({
        username:username
    })

    if(!user){
        return res.status(401).json({
        Message:"user not found !"
    })
    }

    const ispasswordvalid = password === user.password 

    if(!ispasswordvalid){
            return res.status(401).json({
        Message:"password is invalid"
    })
    }

    res.status(201).json({
        message:'login user successfully'
    })
})



// this token send the req.body 
router.get('/user',async(req,res)=>{
   const {token} = req.body

   if(!token){
     return res.status(401).json({
        message:"unauthorized"
     })
   }

   try{
       
       const decoded = jwt.verify(token , process.env.JWT_SECRET)

       const user = await usermodel.findOne({
        _id:decoded.id
       }).select("-password -__v")     //this step is the removeing perticular data 

       res.status(201).json({
        massage:'user data fetched successfully',
        user
       })

       res.send(decoded)

   }catch{
    return res.status(401).json({
        message:'unauthorized token cereated'
    })
   }

})



module.exports = router