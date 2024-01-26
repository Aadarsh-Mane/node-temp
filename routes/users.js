import express from 'express'

import bodyParser from 'body-parser'
import { v4  as uuidv4} from 'uuid';
import { getAllUser } from './controllers/users.js';
const app = express()
app.use(express.json());
const router=express.Router();

// const app = express()
let users=[
    
]
router.get('/users',getAllUser)

router.post('/users',(req,res)=>{
   const user=req.body;
   console.log('Received user data:', user); // Add this line for debugging
    
//    const userid=uuidv4();
//    const userWithId={...user,id:userid};
   users.push({...user,id:uuidv4()})
   res.send(`${user.firstName} name added`)
})


router.get('/:id',(req,res)=>{
const {id}=req.params

    // console.log(id)
    // res.send(id)
    const foundUser=users.find((user)=>user.id===id)
    res.send(foundUser)
})


router.delete('/:id',(req,res)=>{
    const {id}=req.params
   users=users.filter((user)=>user.id!==id)
   res.send(users)

})

router.patch('/:id',(req,res)=>{
    const {id}=req.params
    const {firstName,lastName}=req.body

    const user=users.find((user)=>user.id===id)

    if(firstName)user.firstName=firstName
    if(lastName)user.firstName=firstName
})
export default router;