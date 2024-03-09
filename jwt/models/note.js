import mongoose from 'mongoose';
import CommentSchema from './comment.js';


const NoteSchema =mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type: [String], 
        default: [] 
    },
    status:{
     type:String,
     enum:['pending','submitted','inprogress'],
     default: 'pending'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    comments: [CommentSchema] // Array of comments

},{timestamps:true})


export default mongoose.model("Note",NoteSchema)