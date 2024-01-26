import express from 'express'

import bodyParser from 'body-parser'

const app = express()
app.use(express.json());

const PORT=5000;
import userRoutes from './routes/users.js'
app.get('/', (req, res) => {
    console.log("hello ")
});
app.use('/',userRoutes)

app.listen(PORT, ()=>{
    console.log("listening on port",PORT)

});