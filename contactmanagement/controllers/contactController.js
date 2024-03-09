// @desc get all contacts
// @route GET /api/contacts
// @access public
import asyncHandler from "express-async-handler"
export const getContact=asyncHandler(()=>{
    res.status(200).json({message:"get all conatcs"})
})
export const createContact=asyncHandler(async()=>{

    const {name,email,phone}=req.body
    if(!name || !email || phone){
        res.status(400).json
    }
    res.status(200).json({message:"conatcs created"})
})
export const deleteContact=asyncHandler(async()=>{
    res.status(200).json({message:"deleted conatcs"})
})
export const updateContact=asyncHandler(async()=>{
    res.status(200).json({message:"updated conatcs"})
})