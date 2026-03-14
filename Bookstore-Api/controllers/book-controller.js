// import Book Model
const Book = require('../models/book.js')

const getAllBooks = async (req , res)=> {
   try {
    const allBooks = await Book.find({});// this will return all the Books You have in BookStore 
    if(allBooks.length > 0){
      res.status(200).json({
        success : true,
        message : 'List of books fetched SuccessFully',
        data : allBooks
      })
    } else{
      res.status(404).json({
        success : false,
        message : "No Books Found in the Books Store"
      })
    }
   } catch (error) {
    console.log(error);
    res.status(500).json({
      success : false,
      message : "Something Went Wrong! Please try again sometime"
    })
   }
}

const getSingleBookByID = async (req , res)=> {
  try {
    const getCurrentBookId = req.params.id;
    const bookDetailsById = await Book.findById(getCurrentBookId);
    if(!bookDetailsById){
      return res.status(404).json({
        // Not Found 
        success : false ,
        message : 'Book with the current Id is not Found! Please try with the different Id'
      })
    }
    // Found 
    res.status(200).json({
      success : true,
      data : bookDetailsById
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success : false,
      message : "Something Went Wrong! Please try again sometime"
    })
  }
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
     console.log(e);
     res.status(500).json({
      success : false,
      message : "Something Went Wrong! Please try again sometime"
    })
  }
  
}

const updateBook = async (req , res)=> {
  
}

const deleteBook = async (req , res)=> {
  
}

// export all controller function
// ✅ CORRECT - Should be:
module.exports = {getAllBooks, getSingleBookByID , updateBook , deleteBook , addNewBook};