import express from 'express'
import { generateqrCode, removeImage, signin, signup, upload, uploadImage, userProfile } from '../controllers/userController.js'
import { auth } from '../middleware/auth.js'

const userRouter=express.Router()


userRouter.post("/signup",signup)
userRouter.post("/signin",signin)
userRouter.get("/profile",auth,userProfile)
userRouter.get("/generateqr",auth,generateqrCode)  
userRouter.post("/uploadImg", auth, upload.single('image'), uploadImage); // Use the upload middleware in the route
userRouter.delete('/removeImg',auth,removeImage)



export default userRouter