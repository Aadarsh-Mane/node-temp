import express from 'express'
import { addComment, basedonType, getAllPosts, getAllTags, getFilter, sortBy, updateStatus } from '../controllers/specificroute.js'
import { auth } from '../middleware/auth.js'
// import { signin, signup } from '../controllers/userController.js'

const specificRoute=express.Router()


specificRoute.get("/",getAllTags)
specificRoute.put("/updateStatus/:id",auth,updateStatus)
specificRoute.get("/filterby",getFilter)
specificRoute.get("/getALL",getAllPosts)
specificRoute.get("/college",auth,basedonType)
specificRoute.get("/sortby",sortBy)
specificRoute.post("/comment/:postId",auth,addComment)
// specificRoute.get("/qrcode",auth,generateqrCode)





export default specificRoute