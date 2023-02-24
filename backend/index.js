const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

// IF YOU WANT TO USE BODY JSON THEN MUST USE THIS MIDDLEWARE
app.use(express.json())

app.use(cors())

// AVAILABLE ROUTES

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


// LISTENING ON PORT
app.listen(port, ()=>{
    console.log(`iNotes App listening at http://localhost:${port}`)
})