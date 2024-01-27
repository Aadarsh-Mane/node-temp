import noteModel from "../models/note.js";
import user from "../models/user.js";


export const createNote=async(req,res)=>{
    const {title,description}=req.body

    const newNote=new  noteModel({
        title:title,
        description:description,
        userId:req.userId
    })


    try {
        await newNote.save();
        res.status(201).json(newNote)
    } catch (error) {
        res.status(500).json(error)
    }
    // console.log(req.userId)
    
}
export const updateNote=async(req,res)=>{
    const id=req.params.id;
    const {title,description}=req.body;
    const newNote={
        title:title,
        description:description,
        userId:req.userId
    }

    try {
        await noteModel.findByIdAndUpdate(id,newNote,{new:true})
        res.status(200).json(newNote)
    } catch (error) {
        res.status(500).json(error)
        
    }

}
export const deleteNote=(req,res)=>{

}
export const getNotes=async(req,res)=>{
    try {
        const notes=await noteModel.find({userId:req.userId})
        res.status(200).json(notes)
    } catch (error) {
        
    }

}