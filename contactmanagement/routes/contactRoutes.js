import express from 'express'
import { createContact, deleteContact, getContact, updateContact } from '../controllers/contactController.js'

const router=express.Router()


router.get("/",getContact)
router.post("/",createContact)
router.put("/",updateContact)
router.delete("/",deleteContact)
router.delete("/",(req,res)=>{
res.status(200).json({message:"note post request"})
})

router.put("/:id",(req,res)=>{
    res.status(200).json({message:`update the id${req.params.id}`})

})
router.get("/:id",(req,res)=>{
    res.status(200).json({message:`get the id${req.params.id}`})

})
router.delete("/:id",(req,res)=>{
    res.status(200).json({message:`delete the id ${req.params.id}`})

})


export default router