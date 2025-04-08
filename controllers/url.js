
 const URL = require('../models/url')
 const shortid = require("shortid")
 async function generateNewShortUrl(req,res){
    
   
    if (!req.body || !req.body.url) return res.status(400).json({ error: "url is required"}) 
    
    const shortID = shortid()
    
    await URL.create({
    shortId: shortID,
    redirectURL: req.body.url,
    visitedHistory: [], 

    });

    return res.render("home",{
      id : shortID
    })

   //  return res.json({ id : shortID})
 }

 async function GetAnalytics(req,res){
    const shortId = req.params.shortId
    const result = await URL.findOne({shortId})
    return res.json({
        tottalclicks: result.visitedHistory.length,
        analytics: result.visitedHistory
    })
 }

 module.exports = {
    generateNewShortUrl,
    GetAnalytics
 }