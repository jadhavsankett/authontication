const express = require('express');
const authroute = require('./routes/auth.routes')


const app = express()
app.use(express.json())

app.use('/auth',authroute)


module.exports = app

