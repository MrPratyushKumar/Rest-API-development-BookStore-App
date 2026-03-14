// import Book Model
const Book = require('../models/book.js')

const getAllBooks = async (req , res)=> {
   
}

const getSingleBookByID = async (req , res)=> {
  
}

const addNewBook = async (req , res)=> {
  try{
    const newBookFormData = req.body;
    const newlyCreatedBook = await Book.create(newBookFormData);
    if(newBookFormData){
      res.status(201).json({
        success : true,
        message : 'Book added successfully',
        data : newlyCreatedBook
      })
    }
  } catch(e){
     console.log(e)
  }
  
}

const updateBook = async (req , res)=> {
  
}

const deleteBook = async (req , res)=> {
  
}

// export all controller function
// ✅ CORRECT - Should be:
module.exports = {getAllBooks, getSingleBookByID , updateBook , deleteBook , addNewBook};