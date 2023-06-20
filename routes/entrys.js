const express = require('express')
const router = express.Router()
const Entry = require('../models/Entry')


router.get('/entrys/:id', (req,res) => {
    const id = req.params.id
    console.log(id)
    

    Entry.find()
    .then(data => {
        res.render('entrys', {data : data, id : id})
    })

    

})


module.exports = router