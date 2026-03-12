const express = require('express')

const app = express();


// middleware
app.use(express.json())

let books = [
  {
    id : "1",
    title : "Book 1"
  },
  {
    id : "2",
    title : "Book 2"
  },
  {
    id : "3",
    title : "Book 3"
  }
]

// get all routes
app.get('/' , (req , res)=>{
  res.json({
    message: "Welcome to our Bookstore api"
  })
})

//  get all books 
app.get('/get', (req , res)=>{
  res.json(books)
})


// get a single book-> dynamic route

app.get('/get/:id', (req , res)=>{
  const book = books.find(item=> item.id === req.params.id)

  if(book){
    // if book is available
    res.status(200).json(book)
  } else {
    res.status(404).json({
      message: 'Book not Found! Please try with a different Book id'
    })
  }
})

// add a new book to books -> app.post
app.post('/add' , (req , res)=>{
  const newBook = {
    id : String(books.length + 1),
    title : `Book ${books.length + 1}`
  }
  books.push(newBook)
  res.status(200).json({
    data : newBook , 
    message : 'New book is added successfully'
  })
})

// update a book by a particular ID -> app.put usually use to update something 

app.put('/update/:id' , (req , res)=> {
  const findCurrentBooK = books.find(bookItem => bookItem.id === req.params.id)

  if(findCurrentBooK){
    if(!req.body || !req.body.title){
      return res.status(400).json({ message: 'Please provide a title in the request body' })
    }
    findCurrentBooK.title = req.body.title || findCurrentBooK.title 
    res.status(200).json({
      message : `Book with ID ${req.params.id} updated successfully ` , 
      data : findCurrentBooK
    })
  } else{
    res.status(404).json({
      message : 'Book not found',
    })
  }
})

// delete  request 

app.delete('/delete/:id' , (req , res)=>{
  const findIndexOfCurrentBook = books.findIndex(item => item.id === req.params.id)
  if(findIndexOfCurrentBook !== -1){
    // means this book is present 
    const deleteBook = books.splice(findIndexOfCurrentBook , 1)
    res.status(200).json({
      message :  'Book deleted successfully',
      data : deleteBook[0]
    })
  } else {
    res.status(404).json({
      message :  ' Book not found'
    })
  }
})

const port = 3000;
app.listen(port , ()=>{
  console.log(`Server is now running on port ${port}`)
} ) 