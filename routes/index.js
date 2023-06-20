const express = require('express')
router = express.Router()

const Entry = require('../models/Entry')

router.get('/', (req,res) => {

    Entry.find()
    .then(data => {
        res.render('index', {data : data})
    })

})



module.exports = router

