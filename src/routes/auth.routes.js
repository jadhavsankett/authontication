const express = require('express')
const usermodel = require('../models/user.model')

const router = express.Router()


router.post('/register',async(req,res)=>{    //this code is register user 
    const {username , password} = req.body

    const user = await usermodel.create({
        username,
        password
    })

    res.status(201).json({
        Message:'register user succfully',
        user
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



module.exports = router