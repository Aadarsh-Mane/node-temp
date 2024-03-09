import noteModel from "../models/note.js";
import user from "../models/user.js";


export const createNote=async(req,res)=>{
    console.log(req.userId)
    const {title,description,tags,status}=req.body

    const newNote=new  noteModel({
        title:title,
        description:description,
        tags:tags,
        status:status,
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
export const updateNote = async (req, res) => {
    const id = req.params.id;
    const { title, description, tags, status } = req.body;
    const userId = req.userId; // Extract the authenticated user ID
  
    try {
      const note = await noteModel.findOne({ _id: id, userId: userId });
  
      if (!note) {
        return res.status(404).json({ message: 'Note not found or unauthorized' });
      }
  
      // Update only the specified fields
      const updatedNote = await noteModel.findByIdAndUpdate(
        id,
        { title, description, tags, status },
        { new: true }
      );
  
      res.status(200).json(updatedNote);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
export const deleteNote = async (req, res) => {
    try {
      const noteId = req.params.id;
  
      // Check if the note exists
      const note = await noteModel.findById(noteId);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
  
      // Delete the note 
      await noteModel.findByIdAndDelete(noteId);
  
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
export const getNotes=async(req,res)=>{
    try {
        const notes=await noteModel.find({userId:req.userId})
        res.status(200).json(notes)
    } catch (error) {
        
    }

}