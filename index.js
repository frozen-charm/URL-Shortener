
const express = require('express')
const {connectMongoDB } = require('./connect')
const urlRoute = require("./routes/url")
const URL = require('./models/url')
const path = require("path")
const staticRoute = require("./routes/staticRouter")
const app = express()

const PORT = 8001

connectMongoDB("mongodb+srv://dikshadeep:Diksha@cluster0.7x6nm.mongodb.net/URL-shortener?retryWrites=true&w=majority&appName=Cluster0").then(()=> console.log('MongoDB connected'))

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/test", async(req,res)=>{
    const allUrls = await URL.find({})
    return res.render('home',{
        urls: allUrls
    })
})

app.use("/",staticRoute)
app.use('/url', urlRoute)
app.get('/:shortId', async(req,res)=>{

    const shortId = req.params.shortId

    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push :{
                visitedHistory: {timestamp : Date.now()},
            },
        }

    )
    res.redirect(entry.redirectURL)
})
   
app.listen(PORT, ()=> console.log(`Server started at PORT ${PORT }`))
 