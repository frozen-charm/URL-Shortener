
const express = require('express')

const {generateNewShortUrl,GetAnalytics} = require("../controllers/url")

const router = express.Router()

router.post("/",generateNewShortUrl)

router.get('/analytics/:shortId', GetAnalytics)

module.exports = router