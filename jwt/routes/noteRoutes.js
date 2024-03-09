import express from 'express'
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/noteController.js'
import { auth } from '../middleware/auth.js'

const noteRouter=express.Router()


noteRouter.get("/",auth,getNotes)
noteRouter.post("/add",auth,createNote)
noteRouter.put("/update/:id",auth,updateNote)
noteRouter.delete("/:id",auth,deleteNote)

noteRouter.post("signin",(req,res)=>{
res.send("note post request")
})


export default noteRouter