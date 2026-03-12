const mongoose = require('mongoose')

const connectDB = async ()=>{
  try {
    await mongoose.connect("mongodb+srv://pratyushpandey14300_db_user:pratyushpandey14300@cluster0.m46nn51.mongodb.net/")
    console.log('mongodb is connected successfully  !')
  } catch (error) {
    console.error('Mongodb connection failed' , error)
    process.exit(1)
  }
}

module.exports = connectDB;