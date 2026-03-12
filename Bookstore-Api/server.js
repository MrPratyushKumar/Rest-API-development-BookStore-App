require('dotenv').config()
const express = require('express');

const app = express()

const PORT = process.env.PORT || 3000;

const connectToDB = require('./database/db.js')

const bookRoutes = require('./routes/book-routes.js')
// connect to our database

connectToDB();

// middleware -> express.json()
app.use(express.json());

// create my book routes here 
app.use('/api/books' , bookRoutes)

app.listen(PORT,()=>{
  console.log(`Server is now  running on the port ${PORT}`)
})