const express = require('express')

const {getAllBooks, getSingleBookByID , updateBook , deleteBook , addNewBook} = require('../controllers/book-controller.js')
// create express router 
const router = express.Router()

// Create all the routes that are related to books only 


// get all books 
router.get('/get' , getAllBooks);

// get single book from book store by id -> dynamic route
router.get('/get/:id' , getSingleBookByID)

// Add new book to Book Store 
router.post('/add' , addNewBook) 

// Update the book from book store  based on Id 
router.put('/update/:id' , updateBook)

// delete the book from book store  based on Id 
router.delete('/delete/:id' , deleteBook)


// Export all the routers 
 module.exports = router