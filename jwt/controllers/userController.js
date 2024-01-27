

// import userModel from "../models/user";
import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const SECRET='NOTESAPI'
export const signup=async(req,res)=>{
// check existing user
// hashed password
// create user
// token generate
const {username,email,password}=req.body
try {
    // till it find from databse we have to wait
    const existingUser=await userModel.findOne({email:email})
    if(existingUser){
        return res.status(400).json({message:"user alred"})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const result=await userModel.create({
        email:email,
        password:hashedPassword,
        username:username
    })
    const token=jwt.sign({email:result.email,id:result._id},SECRET)
    res.status(201).json({user:result,token:token});
} catch (error) {
    console.log(error)
}

}
export const signin=async(req,res)=>{
const {email,password}=req.body;

try {
    const existingUser=await userModel.findOne({email:email})
    if(!existingUser){
        return res.status(404).json({message:"user not found"})
    }
    const matchPassword=await bcrypt.compare(password,existingUser.password)
    if(!matchPassword){
        return res.status(404).json({message:"invalid credetails"})
    }
    const token=jwt.sign({email:existingUser.email,id:existingUser._id},SECRET)
    res.status(201).json({user:existingUser,token:token});
} catch (error) {
    
}


}