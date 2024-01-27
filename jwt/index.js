const PORT=5000;
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import quotes from './quotes.json' assert { type: "json" }
import userRouter from './routes/userRoutes.js'
import noteRouter from './routes/noteRoutes.js'
import cheerio from 'cheerio'
import axios from 'axios'
const app = express()
app.use(express.json());
app.use('/users',userRouter)
app.use('/note',noteRouter)
app.get('/', (req, res) => {
    res.send("he rec")
    // res.send(quotes)
    // res.send("hello")
});
app.get('/random', (req, res) => {
    let index=Math.floor(Math.random()*quotes.length)
    let quote=quotes[index]
    res.send(quote)
    // res.send("hello")
});
mongoose.connect('mongodb+srv://onlyaddy68:onlyaddy123@confess.bgv01wx.mongodb.net/basicworkretryWrites=true&w=majority').then(()=>{
        app.listen(PORT, ()=>{
            console.log("listening on port",PORT)
        
        });
    })
// const newspapers = [
//     {
//         name: 'cityam',
//         address: 'https://bigfuck.tv/stars/dani-daniels/',
//         base: ''
//     },
   
// ]

// const articles = []

// newspapers.forEach(newspaper => {
//     axios.get(newspaper.address)
//         .then(response => {
//             const html = response.data;
//             const $ = cheerio.load(html);

//             $('.b-pornstar-info__char-row').each(function () {
//                 const title = $(this).find('.title').text().trim();
//                 const value = $(this).find('.value').text().trim();
                
//                 // console.log(`${title}: ${value}`);
//                 articles.push({
//                     title,
//                     value: value,
//                     source: newspaper.name
//                 })
//                 // You can push this data into an array or process it as needed
//             });
//         })
//         .catch(error => {
//             console.error(error);
//         });
// });

  

// app.get('/', (req, res) => {
//     res.json('Welcome to my Climate Change News API')
// })

// app.get('/news', (req, res) => {
//     res.json(articles)
// })

// app.get('/news/:newspaperId', (req, res) => {
//     const newspaperId = req.params.newspaperId

//     const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
//     const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base


//     axios.get(newspaperAddress)
//         .then(response => {
//             const html = response.data
//             const $ = cheerio.load(html)
//             const specificArticles = []

//             $('a:contains("climate")', html).each(function () {
//                 const title = $(this).text()
//                 const url = $(this).attr('href')
//                 specificArticles.push({
//                     title,
//                     url: newspaperBase + url,
//                     source: newspaperId
//                 })
//             })
//             res.json(specificArticles)
//         }).catch(err => console.log(err))
// })

// app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
