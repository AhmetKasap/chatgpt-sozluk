const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    title : {type : String, require : true},
    username : {type : String, require : true},
    content : {type : String, require : true}
})

const Entry = mongoose.model('ENTRY', entrySchema)
module.exports = Entry