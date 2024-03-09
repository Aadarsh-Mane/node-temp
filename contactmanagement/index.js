import express from 'express'

import bodyParser from 'body-parser'
import route from './routes/contactRoutes.js'
import { errorHandler } from './middleware/errorHandler.js';
const app = express()
app.use(express.json());
app.use(errorHandler)


app.use('/api/contacts',route)
const PORT=5000;
app.get('/', (req, res) => {
    console.log("hello ")
});

app.listen(PORT, ()=>{
    console.log("listening from contact",PORT)

});