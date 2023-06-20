require('dotenv').config()
const express = require('express')
const path = require('path');
const app = express();
const mongoose = require('mongoose')


//* body-parser
app.use(express.urlencoded({ extended: false }));

//* templete engine
app.set('view engine', 'ejs')

//* json parser
app.use(express.json())

//*public documents
app.use(express.static('public'));



//* routes import
const index = require('./routes/index')
const admin = require('./routes/admin')
const entrys = require('./routes/entrys')

app.use(index)
app.use(admin)
app.use(entrys)

//* connection database
mongoose.connect(process.env.MONGODB_URL)
.then(e => {console.log("Database Connected")})
.catch(error => { console.log(error) })




app.listen(3000)