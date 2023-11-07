// Import the Mongoose library to define a schema and create a model.
const mongoose = require("mongoose");

// Import a Mongoose plugin called 'uniqueValidator' to handle unique field
const uniqueValidator = require("mongoose-unique-validator");

/* mongoose-unique-validator is a plugin which adds pre-save validation for unique fields within a Mongoose schema.
 This makes error handling much easier, since you will get a Mongoose validation error when you attempt to violate a unique constraint, rather than an E11000 error from MongoDB
const uniqueValidator = require("mongoose-unique-validator"); 

code available at : https://www.npmjs.com/package/mongoose-unique-validator
*/

// Define a user schema with specific fields and their properties.
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  password: { type: String, required: true },
  department: { type: String, required: true },
});

// Apply the 'uniqueValidator' plugin to the user schema with a custom error message.
userSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.", // Error message for duplicate 'username' values
});

// Create a Mongoose model named "User" based on the user schema.
module.exports = mongoose.model("User", userSchema);
