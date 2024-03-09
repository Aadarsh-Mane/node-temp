

// import userModel from "../models/user";
import userModel from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer';
import fs from 'fs'


const SECRET='NOTESAPI'

export const signup=async(req,res)=>{

const {username,email,password,usertype,college}=req.body
try {
    const existingUser=await userModel.findOne({email:email})
    if(existingUser){
        return res.status(400).json({message:"user alred"})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const result=await userModel.create({
        email:email,
        password:hashedPassword,
        username:username,
        usertype:usertype,
        college:college
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
    const token=jwt.sign({email:existingUser.email,id:existingUser._id},SECRET,{
        expiresIn:'1d'

    }
    )
    res.status(201).json({user:existingUser,token:token});
} catch (error) {
    
}


}

export const userProfile = async (req, res) => {
    const userId = req.userId; // Assuming auth middleware sets req.user to the userID

    try {
        // Fetch user from the database using the userID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the user data
        res.json({ user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const generateqrCode=async(req,res)=> {
    console.log("Generating")
    const userID = req.userId; // Assuming auth middleware sets req.user to the userID
  
    try {
      // Fetch user from the database using the userID
      const user = await userModel.findById(userID);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Construct user information
      const userInfo = {
        username: user.username,
        college: user.college,
      };
   console.log(userInfo);
   const profileLink = `http://localhost:5000/${user.username}`; // Replace with your actual profile URL
   console.log(profileLink);

      // Generate QR code
      const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(userInfo));
        
      user.qrcode = qrCodeUrl;
      await user.save();
    //   console.log("QR Code URL saved successfully:", qrCodeUrl);

      // Send the QR code as response
      res.send(`<img src="${qrCodeUrl}" alt="QR Code" />`);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
  });
  
 export const upload = multer({ storage });
  
  // Image upload route
 export  const uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      // Save the image URL to the database
      const user = await userModel.findById(req.userId); // Assuming auth middleware sets req.userId
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.profileImage = req.file.path; // Save the image path (you can change this as needed)
      await user.save();
  
      res.json({ message: 'Image uploaded successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const removeImage = async (req, res) => {
    try {
      // Find the user by ID
      const user = await userModel.findById(req.userId); // Assuming auth middleware sets req.userId
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user has a profile image
      if (!user.profileImage) {
        return res.status(400).json({ message: 'User does not have a profile image' });
      }
  
      // Remove the image file from the filesystem
      fs.unlink(user.profileImage, async (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return res.status(500).json({ message: 'Error deleting file' });
        }
  
        // Remove the image path from the user document
        user.profileImage = null;
        await user.save();
  
        res.json({ message: 'Image removed successfully' });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };