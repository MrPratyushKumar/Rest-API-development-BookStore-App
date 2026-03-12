const mongoose = require("mongoose");

require('dotenv').config(); // ✅ Load environment variables

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String], // Array of String
  createdAt: { type: Date, default: Date.now },
});


const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
  try {
    // create a new document
    const newUser = await User.create({
      name: 'Update User',
      email: 'updateUSer1@gmail.com', 
      age: 79,
      isActive: true,
      tags: ['Software Developer', 'Frontend Engineer', 'Problem Solver', 'Backend Engineer'], 
    });

    
    //Another way to create New user

    // const newUser = new User({
    //   name: 'Utkarsh Pandey',
    //   email: 'Utkarshpandey143@gmail.com', 
    //   age: 23,
    //   isActive: true,
    //   tags: ['Software Developer', 'Frontend Engineer', 'Problem Solver', 'Backend Engineer'], 
    // })
    // await newUser.save();

    console.log('Created new User:', newUser);
     
    // // 2. Get all user data from the mongoose -> User.find()
    // const allUsers = await User.find({})
    // console.log(allUsers)


    // 3. Now i want to get those user Whose Active is false
    // const getUserOfActiveFalse = await User.find({isActive : false})
    // console.log(getUserOfActiveFalse);

    // 4. .finOne()->findOne method does find the first document that matches the criteria , let's say you have 5 person whose age is 20 , then findOne method always give the first user Which matches the criteria 

    // const getJohnDoeUser = await User.findOne({name : "John Doe"})
    // console.log(getJohnDoeUser)

    // 5. let's say you are having 10000 users you want to get specific user from the id , So How you're going to do that

    // const getLastCreatedUserByUserId = await User.findById(newUser._id) 
    // console.log(getLastCreatedUserByUserId , 'getLastCreatedUserByUserId')

    // find user by this id:'69b2230749f8bffaad5ab30b'

    // const getUserByTheGivenId = await User.findById('69b2230749f8bffaad5ab30b');
    // console.log(getUserByTheGivenId , 'getUserByTheGivenId');

    // 7. We need to get only the specific name property and email propertyBut We don't want to get the id Property-User.find().select('name email -_id')property use here and -_id means we are not including this property here

    // const selectedFields = await User.find().select('name email -_id')
    // console.log(selectedFields);


    //8. Let's say you are implementing some pagination for a particular page you want only 5 items and let's say you want to skip first items 

    // const limitedUsers = await User.find().limit(5).skip(1); // get only 5 users but have to skip 1st user
    // console.log(limitedUsers);

    //9. Do Sorted Users by  age in descending order 
    // const sortedUsers = await User.find().sort({age : -1});// here {age : -1}age means sorted by age -1means in descending order
    // console.log(sortedUsers);

    //10. Do Sorted Users by  age in ascending order 
    // const sortedUsersInAscendingOrder = await User.find().sort({age : +1});// here {age : -1}age means sorted by age +1means in ascending order
    // console.log(sortedUsersInAscendingOrder);

    // 11.How we can count documents -> let's say those many documents where the use active is false
    // const countDocuments = await User.countDocuments({isActive : false});
    // console.log(countDocuments);

    // 12.Deleted user  by id 
    // const deletedUser = await User.findByIdAndDelete(newUser._id);
    // console.log(deletedUser);

    // 13 . Update user by id 
    const updateUser = await User.findByIdAndUpdate(newUser._id , {
      $set : {age : 100} , $push : {tags : 'updated'}
    } , {new : true});// Here new will return the updated object || $push will push updated string in tags of array || $set will update the age of current User 

    console.log('updated user' , updateUser);


  } catch (error) {
    console.log("Error ->", error);
  } finally {
    await mongoose.connection.close();
  }
}





// ✅ FIXED - Call function AFTER connection is established
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database Connected Successfully");
    runQueryExamples();
  })
  .catch((e) => console.log(e));