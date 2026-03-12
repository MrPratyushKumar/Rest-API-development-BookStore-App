require('dotenv').config()
const express = require('express');

const app = express()

const PORT = process.env.PORT || 3000;

const connectToDB = require('./database/db.js')

// connect to our database

connectToDB();

// middleware -> express.json()
app.use(express.json());

app.listen(PORT,()=>{
  console.log(`Server is now  running on the port ${PORT}`)
})